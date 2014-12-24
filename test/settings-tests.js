QUnit.module('Settings Tests');
QUnit.test("Settings object as constant", function(assert) {
	localStorage.clear();
	LogIt.Settings.prop = 'value';
	assert.equal(null, LogIt.Settings.prop);

});
QUnit.test("Getting default value of null setting", function(assert) {
	localStorage.clear();
	var value = LogIt.Settings.get();
	assert.equal(null, value);
});
QUnit.test("Getting default value of defined setting", function(assert) {
	localStorage.clear();
	var value = LogIt.Settings.get(LogIt.Settings.date_format);
	assert.equal(value, 'dd/MM/yyyy');
});
QUnit.test("Getting default value of undefined setting", function(assert) {
	localStorage.clear();
	var value = LogIt.Settings.get('random');
	assert.equal(null, value);
});
QUnit.test("Getting value of defined setting as default string type", function(assert) {
	localStorage.clear();
	LogIt.Settings.set(LogIt.Settings.day_hour, 10);
	var value = LogIt.Settings.get(LogIt.Settings.day_hour);
	assert.equal("10", value);
});
QUnit.test("Getting value of defined setting as passed type", function(assert) {
	localStorage.clear();
	LogIt.Settings.set(LogIt.Settings.day_hour, 10);
	var value = LogIt.Settings.get(LogIt.Settings.day_hour, 'int');
	assert.equal(10, value);
});
