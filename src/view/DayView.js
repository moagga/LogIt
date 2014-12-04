var qLog = qLog || {};
qLog.DayView = Backbone.View.extend({

	tagName:  'div',
	className: 'column panel panel-info',
	_tpl: _.template($('#day-template').html()),
	
	initialize: function (options) {
	},

	render: function() {
//		var h = this._evaluate(this.model);
		var h = this._tpl(this.model);
		this.$el.html(h);
		return this;
    },
	
	showTasks: function(tasks){
		_.each(tasks, this._renderTask, this);
	},
	
	markToday: function(){
		$(this.el).addClass('panel-warning');
	},
	
	_renderTask: function(task){
		var view = new qLog.TaskView({model: task});
		this.$('.list-group').append(view.render().el);
	},

	_evaluate: function(model){
		var html = "<h4>" + model.dateString + "</h4>";
		html += "<ul class='list-group'></ul>";
		
		return html;
	}

});