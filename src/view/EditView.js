var qLog = qLog || {};
qLog.EditView = Backbone.View.extend({

	el:  '.editor',
	
	events: {
		'click #addLog': 'submit'
	},

	initialize: function (options) {
		this.options = options || {};
		this.task = this.$('#task');
		this.log = this.$('#log');
		this.date = this.$('#date');
		this.$('.datePicker').datepicker({
			autoclose: true,
			todayHighlight: true,
			endDate: "today",
			format: qLog.settings.dateFormat
		});
	},

	submit: function() {
		var tk = this.task.val();
		var tm = this.log.val();
		var date = Date.today();
		var d = this.date.val();
		if (d){
			date = Date.parse(d, qLog.settings.dateFormat);
		}
		
		qLog.Tasks.create({'task': tk, 'log': tm, date: date});
	},
	
});

