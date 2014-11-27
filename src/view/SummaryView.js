qLog.SummaryView = Backbone.View.extend({

	el:  '#results',
	startDate: null,
	
	initialize: function (options) {
		this.listenTo(qLog.Tasks, 'reset', this.renderAll);
		this.daySummary = this.$('.summary');
		this.startDate = Date.today().moveToDayOfWeek(1, -1);
	},

	renderAll: function(models){
		$('#results').html('');
		this.daySummary.html('');
		var d = this.startDate.clone();
		for (var i = 0; i < 7; i++){
			var tasks = models.day(d);
			this._renderDay(d, tasks);
			d.addDays(1);
		}
	},
	
	nextWeek: function(){
	
	},
	
	prevWeek: function(){
	
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