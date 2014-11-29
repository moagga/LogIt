var qLog = qLog || {};
qLog.Task = Backbone.Model.extend({

	idAttribute : 'timestamp',
	
	methodMap : {
		'create': 'put',
		'update': 'post',
		'delete': 'remove',
		'read':   'get'
	},
	
	initialize: function(attrs){
		var log, u, l;
		if (attrs){
			log = attrs.log;
		}
		if (log){
			l = log.slice(0, -1);
			u = log.slice(-1);
			if (!u.match('h|d|m')){
				u = 'h';
				l = log;
			}
			l = new Number(l);
			this.set('value', l);
			this.set('unit', u);
			this.unset('log');
		}
	},
	
	validate: function(attrs, options){
		var v = attrs.value, u = attrs.unit, t = attrs.task, d = attrs.date;
		var msg = [];
		if (t === 'undefined'){
			msg.push("Task description is mandatory");
		}
		if (d === 'undefined'){
			msg.push("Date is mandatory");
		}
		if (v === 'undefined' || u === 'undefined'){
			msg.push("Time is mandatory");
		}
		if (!isFinite(v)){
			msg.push('Invalid time spend value provided. Use the syntax like 1.5d, 1.5h, 30m');
		}
		if (v <=0 ){
			msg.push('Time spend must be a positive number');
		}
		return msg;
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
		
		//Possibility of mocking datastore to test sync function.
		var ds = options.ds || qLog.ds;
		ds.sync(m, obj, function(result){
		}, this);
	},
	
	toHour: function(){
		var h, log = this.get('value'), unit = this.get('unit');
		switch (unit){
			case 'd':
				h = log * 8;
				break;
			case 'h':
				h = log;
				break;
			case 'm':
				h = log / 60;
				break;
		}
		return h.toPrecision(3);
	},
	
	getLogString: function(){
		var str, log = this.get('log'), unit = this.get('unit');
		switch (unit){
			case 'd':
				str = 'days';
				break;
			case 'h':
				str = 'hours';
				break;
			case 'm':
				str = 'mins';
				break;
		}
		return log + " " + str;
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
	},
	
	sum: function(items){
		var sum = 0;
		_.each(items, function(item){
			sum += item.toHour();
		});
		return sum;
	}
	
});