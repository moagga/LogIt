var qLog = qLog || {};
qLog.SummaryView = Backbone.View.extend({

	el:  '.weekView',
	startDate: null,
	
	events: {
		'click button.prev': 'prevWeek',
		'click button.next': 'nextWeek',
	},
	
	initialize: function (options) {
		this.listenTo(qLog.Tasks, 'reset', this.renderAll);
		this.startDate = Date.today().moveToDayOfWeek(1, -1);
		this.title = this.$('.controls h3');
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
		var obj = {dateString: date.toString('dd/MM/yyyy')};
		var view = new qLog.DayView({model: obj});
		$('#results').append( view.render().el );
		if (tasks.length != 0){
			view.showTasks(tasks);
		}
	}
	
});