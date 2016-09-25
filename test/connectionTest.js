var async = require('async');
var mongoDB = require('../server/mongoConnection');
var assert = require('assert');
var collection = require('../server/config').testCollectionName;
var obj = {
	    "date" : new Date("06/09/16"),
	    "internal" : 32.12,
	    "external" : 23.23,
	    "input" : 32.12,
	    "output" : 23.23,
}
var high =40;
var low = 35;
describe('MONGO DATABASE Test', function(){
	/*
	it('Should generate 2000 items', function(done){
		var count = 0;
		for(var i = 0; i <1000; i++){
			setTimeout(function() {
				console.log("Count: " + count);
				var obj = {
				"date" : new Date(),
				"internal": Math.random() * 10 + low,
				"external": Math.random() * 10 + high,
				"input": Math.random() * 10 + low,
				"output": Math.random() * 10 + high,
				}
				mongoDB.insertObj(collection, obj, function(err, result){
					assert.equal(err, null);
					assert.notEqual(result, null);
					console.log("COunt: " + count);
					count++;
					if(count ==1000)
						done();
				});
			}, 1000);	
		}
	});
	*/
	
	it('Should connect to the local server', function(done){
		mongoDB.dbConnection(function(err, db){
			assert.equal(err, null);
			assert.notEqual(db,null);
			done();
		});
	});

	it('Should count the item', function(done){
		mongoDB.countObjects(collection, {},function(err, result){
			console.log("delete item Error: "  + JSON.stringify(err));
			console.log("delete item Result: "  + JSON.stringify(result));			
			assert.equal(err, null);
			assert.notEqual(result,null);
			done();
		});
	});

	it('Should create an obj', function(done){
		mongoDB.insertObj(collection, obj, function(err, result){
			assert.equal(err, null);
			assert.notEqual(result,null);
			done();
		});
	});

	it('Should list all items with limit', function(done){
		mongoDB.findAllWithLimit(collection, 2, 20, function(err, result){
			console.log("list all items with limit Error: "  + JSON.stringify(err));
			console.log("list all items with limit Result: "  + JSON.stringify(result));	
			console.log("length: " + result.length);		
			assert.equal(err, null);
			assert.notEqual(result,null);
			assert.notEqual(result.length, 0);
			done();
		});
	});

	it('Should list all items with limit by desc', function(done){
		mongoDB.findObjsWithLimitDesc(collection, {}, 2, 20, 'date', function(err, result){
			console.log("list all items limit by desc Error: "  + JSON.stringify(err));
			console.log("list all items limit by desc Result: "  + JSON.stringify(result));	
			console.log("length: " + result.length);		
			assert.equal(err, null);
			assert.notEqual(result,null);
			assert.notEqual(result.length, 0);
			done();
		});
	});

	it('Should list an item', function(done){
		mongoDB.findObjs(collection, {'date':new Date('06/09/16')},function(err, result){
			console.log("list item Error: "  + JSON.stringify(err));
			console.log("list item Result: "  + JSON.stringify(result));			
			assert.equal(err, null);
			assert.notEqual(result,null);
			assert.notEqual(result.length, 0);
			done();
		});
	});

	it('Should update the item', function(done){
		mongoDB.updateObj(collection, {'date':new Date('06/09/16')},{'date':new Date('06/07/16')}, function(err, result){
			console.log("update item Error: "  + JSON.stringify(err));
			console.log("update item Result: "  + JSON.stringify(result));			
			assert.equal(err, null);
			assert.notEqual(result,null);
			done();
		});
	});

	it('Should not list any item', function(done){
		mongoDB.findObjs(collection, {'date':new Date('06/09/16')},function(err, result){
			console.log("list item Error: "  + JSON.stringify(err));
			console.log("list item Result: "  + JSON.stringify(result));			
			assert.equal(err, null);
			assert.notEqual(result,null);
			assert.equal(result.length, 0);
			done();
		});
	});

	it('Should list an item', function(done){
		mongoDB.findObjs(collection, {'date':new Date('06/07/16')},function(err, result){
			console.log("list item Error: "  + JSON.stringify(err));
			console.log("list item Result: "  + JSON.stringify(result));			
			assert.equal(err, null);
			assert.notEqual(result,null);
			assert.notEqual(result.length, 0);
			done();
		});
	});

	it('Should delete the item', function(done){
		mongoDB.deleteObj(collection, {'date':new Date('06/07/16')},function(err, result){
			console.log("delete item Error: "  + JSON.stringify(err));
			console.log("delete item Result: "  + JSON.stringify(result));			
			assert.equal(err, null);
			assert.notEqual(result,null);
			done();
		});
	});

});