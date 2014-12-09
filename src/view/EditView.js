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
		this._reset();
	},

	submit: function() {
		var tk = this.task.val() !== "" ? this.task.val() : null;
		var tm = this.log.val() !== "" ? this.log.val() : null;
		var date = Date.today();
		var d = this.date.val() !== "" ? this.date.val() : null;
		if (d){
			date = Date.parse(d, qLog.settings.dateFormat);
		}
		
		this.$('.form-group').removeClass('has-error');
		this.$('p.text-danger').html('');
		var m = new qLog.Task({'task': tk, 'log': tm, date: date});
		var r = m.isValidModel();
		if (r){
			var h = "";
			for (var s in r){
				var q = 'p.text-danger.' + s;
				this.$(q).html(r[s]);
				this.$(q).parent().addClass('has-error');
			}
		} else {
			qLog.Tasks.create(m);
			this._reset();
		}
		return false;
	},
	
	_reset: function(){
		this.task.val('');
		this.log.val('');
		this.date.val('');
		this.task.focus();
	}
	
});

