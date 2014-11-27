qLog.Task = Backbone.Model.extend({

	idAttribute : 'timestamp',
	
	methodMap : {
		'create': 'put',
		'update': 'post',
		'delete': 'remove',
		'read':   'get'
	},
	
	initialize: function(){
	},
	
	validate: function(attrs, options){
		var tm = attrs.time;
	},

	sync: function(method, model, options){
		var m = this.methodMap[method];
		if (m == 'put'){
			model.set('timestamp', Date.now());
		}
		var obj = model.toJSON();
		if (m == 'remove'){
			obj = obj.timestamp;
		}
		qLog.ds.sync(m, obj, function(result){
		}, this);
	}

});

qLog.TaskCollection = Backbone.Collection.extend({
	
	model: qLog.Task,
	
	reset: function(items){
		Backbone.Collection.prototype.reset.apply(this, arguments);
	},
	
	day: function(d){
		var refDate = d;
		var result = this.filter(function(item){
			var date = item.get('date');
			return refDate.compareTo(date) == 0;
		});
		return result;
	
	}
});