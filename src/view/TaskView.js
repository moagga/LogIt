var qLog = qLog || {};
qLog.TaskView = Backbone.View.extend({

	tagName:  'a',
	className: 'list-group-item',
	_tpl: _.template($('#item-template').html()),
	
	events: {
		'click .remove': 'remove',
		'mouseover ': 'onmouseover',
		'mouseout ': 'onmouseout',
	},

	initialize: function (options) {
	},

	render: function() {
		var obj = {
			task: this.model.get('task'),
			time: this.model.getLogString()
		};
		this.$el.html(this._tpl(obj));
//      this.$el.html(this._evaluate(this.model.attributes));
		return this;
    },
	
	onmouseover: function(){
		this.$el.addClass('active');
	},
	
	onmouseout: function(){
		this.$el.removeClass('active');
	},

	remove: function(){
		this.model.destroy();
	},
	
	_evaluate: function(model){
		var html = "<h5>" + model.log;
		html += "<button type='button' class='btn btn-default btn-xs pull-right remove'>";
		html += "<span class='glyphicon glyphicon glyphicon-trash'></span>";
		html += "</button>";
//		html += "<span class='badge'>" + model.log + "</span>";
		html += "</h5>";
		html += model.task;
		
		return html;
	}
	
});