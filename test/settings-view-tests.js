module('Model instance creation',	{

	setup: function() {
		LogIt.Settings = {
			weekView : function(){},
			dayHour : function(){}
		};
		var weekView = sinon.stub(LogIt.Settings, "weekView");
		weekView.onCall().returns("5");
		var dayHour = sinon.stub(LogIt.Settings, "dayHour");
		dayHour.onCall().returns(10);
		
		var h = $('#settingHtml').html();
		$('#settings').html(h);
		this.settingsView = new LogIt.SettingsView();
    },

    teardown: function() {
		this.settingsView.remove();
		$('#settings').html('');
		LogIt.Settings = null;
		delete LogIt.Settings;
    }
});
test( "Initialization", function(assert) {
	var value = $('input[name=dayHours]').val();
	assert.equal(10, value);
});
