qLog.DayView = Backbone.View.extend({

	tagName:  'div',
	className: 'col-lg-2 placeholder',
	_tpl: _.template($('#day-template').html()),
	
	initialize: function (options) {
	},

	render: function() {
		var h = this._tpl(this.model);
		this.$el.html(h);
		return this;
    },
	
	showTasks: function(tasks){
		_.each(tasks, this._renderTask, this);
	},
	
	_renderTask: function(task){
		var view = new qLog.TaskView({model: task});
		this.$el.append(view.render().el);
	}

});