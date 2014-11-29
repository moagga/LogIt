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
