QUnit.module('Model instance creation');
QUnit.test( "instance creation without attrs", function(assert) {
	var obj = new qLog.Task();
	assert.ok(obj);
});
QUnit.test( "instance creation - log present - invalid value (2hh)", function(assert) {
	var obj = new qLog.Task({log: '2hh'});
	assert.ok(obj);
	assert.equal(null, obj.get('log'));
	assert.ok(obj.get('value'));
	assert.equal('h', obj.get('unit'));
});
QUnit.test( "instance creation - log present - invalid value(2)", function(assert) {
	var obj = new qLog.Task({log: '2'});
	assert.ok(obj);
	assert.equal(null, obj.get('log'));
	assert.equal(2, obj.get('value'));
	assert.equal('h', obj.get('unit'));
});
QUnit.test( "instance creation - log present - invalid value(2h2h)", function(assert) {
	var obj = new qLog.Task({log: '2'});
	assert.ok(obj);
	assert.equal(null, obj.get('log'));
	assert.ok(obj.get('value'));
	assert.equal('h', obj.get('unit'));
});

QUnit.module('Model validation');
QUnit.test( "Model validation - All values are null", function(assert) {
	var obj = new qLog.Task();
	var msg = obj.isValidModel();
	assert.ok(msg.constructor == Array.prototype.constructor);
	assert.equal(3, msg.length);
});
QUnit.test( "Model validation - Invalid value", function(assert) {
	var obj = new qLog.Task({task: '', date: Date.now(), value: '2hh'});
	var msg = obj.isValidModel();
	assert.ok(msg.constructor == Array.prototype.constructor);
	assert.equal(1, msg.length);
});
QUnit.test( "Model validation - Negative value", function(assert) {
	var obj = new qLog.Task({task: '', date: Date.now(), value: '-2h'});
	var msg = obj.isValidModel();
	assert.ok(msg.constructor == Array.prototype.constructor);
	assert.equal(1, msg.length);
});
QUnit.test( "Model validation - All values are valid", function(assert) {
	var obj = new qLog.Task({task: '', date: Date.now(), log: '2h'});
	var msg = obj.isValidModel();
	assert.equal(msg, null);
});

QUnit.module('Model toHour');
QUnit.test( "Model toHour", function(assert) {
	//days
	var obj = new qLog.Task({log: '1.25d'});
	var hr = obj.toHour(true);
	assert.equal(10.00, hr);
	//hours
	var obj = new qLog.Task({log: '1.25h'});
	var hr = obj.toHour(true);
	assert.equal(1.25, hr);
	//mins
	var obj = new qLog.Task({log: '20m'});
	var hr = obj.toHour(true);
	assert.equal(0.333, hr);
});
