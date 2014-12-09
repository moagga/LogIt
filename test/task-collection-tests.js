QUnit.module('Task Collection test cases');
QUnit.test( "Test adding hours of a day", function(assert) {
	var t1 = new qLog.Task({log: '20m'}); 		
	var t2 = new qLog.Task({log: '.5d'}); 		
	var t3 = new qLog.Task({log: '1.25h'});		
	
	var col = new qLog.TaskCollection();
	var res = col.sum([t1, t2, t3]);
	assert.equal("string", typeof res);
	assert.equal("5.58", res);

});
QUnit.test( "Test filtering based on day", function(assert) {
	var yrday = new qLog.Task({date: Date.today().addDays(-1)});
	var today1 = new qLog.Task({date: Date.today()});
	var today2 = new qLog.Task({date: Date.today()});
	var tmrww = new qLog.Task({date: Date.today().addDays(1)});
	
	var col = new qLog.TaskCollection();
	col.add([yrday, today1, today2, tmrww]);
	
	var todayResults = col.day();
	assert.equal(2, todayResults.length);
	assert.equal(today1, todayResults[0]);
	assert.equal(today2, todayResults[1]);

	var yesResults = col.day(Date.today().addDays(-1));
	assert.equal(1, yesResults.length);
	assert.equal(yrday, yesResults[0]);

	var tomResults = col.day(Date.today().addDays(1));
	assert.equal(1, tomResults.length);
	assert.equal(tmrww, tomResults[0]);

});
QUnit.test( "Test match for type ahead", function(assert) {
	var t1 = new qLog.Task({date: Date.today(), task: 'Task one'});
	var t2 = new qLog.Task({date: Date.today(), task: 'Task two'});
	var t3 = new qLog.Task({date: Date.today(), task: 'Task Three'});
	
	var col = new qLog.TaskCollection();
	col.add([t1, t2, t3]);
	
	var ignoreCaseMatches = col.match('task');
	assert.equal(3, ignoreCaseMatches.length);
	assert.equal(t1, ignoreCaseMatches[0]);
	assert.equal(t2, ignoreCaseMatches[1]);
	assert.equal(t3, ignoreCaseMatches[2]);

	var zeroMatch = col.match('one');
	assert.equal(0, zeroMatch.length);

	var exactMatch = col.match('task three');
	assert.equal(1, exactMatch.length);
	assert.equal(t3, exactMatch[0]);
	
});
