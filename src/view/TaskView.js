qLog.TaskView = Backbone.View.extend({

	tagName:  'li',
	className: 'list-group-item',
	_tpl: _.template($('#item-template').html()),
	
	events: {
		'click .remove': 'remove'
	},

	initialize: function (options) {
	},

	render: function() {
      this.$el.html(this._tpl(this.model.attributes));
      return this;
    },
	
	remove: function(){
		this.model.destroy();
	}
	
});