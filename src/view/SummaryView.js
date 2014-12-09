var qLog = qLog || {};
qLog.SummaryView = Backbone.View.extend({

	el:  'body',
	startDate: null,
	
	events: {
		'click button.prev': 'prevWeek',
		'click button.next': 'nextWeek',
	},
	
	initialize: function (options) {
		var today = Date.today();
		if ('Mon' == today.toString('ddd')){
			this.startDate = today;
		} else {
			this.startDate = Date.today().moveToDayOfWeek(1, -1);
		}
		this.listenTo(qLog.Tasks, 'reset', this.renderAll);
		this.title = this.$('.controls .weekHeading');
	},

	renderAll: function(models){
		$('#results').html('');
		var h = '';
		var d = this.startDate.clone();
		h += d.toString('MMM dd, yyyy');
		for (var i = 0; i < 7; i++){
			var tasks = models.day(d);
			this._renderDay(d, tasks);
			d.addDays(1);
		}
		h += " - ";
		h +=  d.addDays(-1).toString('MMM dd, yyyy');
		this.title.html(h);
	},
	
	nextWeek: function(){
		this.startDate.addDays(7);
		this.renderAll(qLog.Tasks);
	},
	
	prevWeek: function(){
		this.startDate.addDays(-7);
		this.renderAll(qLog.Tasks);
	},
	
	_renderDay: function(date, tasks){
		var sum, obj, view;
		sum = qLog.Tasks.sum(tasks);
		sum += ' hours';
		obj = {dateString: date.toString('ddd dd/MM/yyyy'), totalHrs: sum};
		view = new qLog.DayView({model: obj});
		$('#results').append(view.render().el);
		if (Date.today().equals(date)){
			view.markToday();
		}
		if (tasks.length !== 0){
			view.showTasks(tasks);
		}
	}
	
});