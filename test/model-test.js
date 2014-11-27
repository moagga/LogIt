QUnit.test( "deepEqual test", function( assert ) {
var obj = new qLog.Task();
assert.deepEqual( obj, { foo: "bar" }, "Two objects can be the same in value" );
});