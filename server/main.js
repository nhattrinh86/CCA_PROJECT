var connection =  require('./mongoConnection');
var collectionName =  require('./config').collectionName;
var getAllItems = function(callback){
	connection.findAll(collectionName, function(err, result){
		callback(err, result);
	});
}

var getItems = function(query,callback){
	connection.findObjs(collectionName, query, function(err, result){
		callback(err, result);
	});
}

var createItem = function(obj,callback){
	connection.insertObj(collectionName, obj, function(err, result){
		callback(err, result);
	});
}

var updateItem =  function(query, obj, callback){
	connection.updateObj(collectionName, query, obj, function(err, result){
		callback(err, result);
	});
}

var countItems =  function(query, obj, callback){
	connection.countObjects(collectionName, query, obj, function(err, result){
		if(err)
			callback(err, null);
		else
			callback(null, {count: result});
	});
}

/********************************************/
var findDataWithDate = function(startDate, endDate, limit, offset, callback){
 	var query = {date: { $gte: new Date(startDate), $lte: new Date(endDate) } } ;
 	console.log(limit);
 	connection.findObjsWithLimitDesc(collectionName, query, parseInt(offset), parseInt(limit), 'date', function(err, result){
 		if(err)
			callback(err, null);
		else
 			callback(null, result);
 	});
}
var countDataWithDate = function(startDate, endDate, callback){
	console.log(startDate);
	console.log(endDate);
	var sDate = new Date(startDate).toISOString();
	var eDate = new Date(endDate).toISOString();
	console.log("sDate: "  + sDate);
	console.log("eDate: "  + eDate);
 	var query = {date: { $gte: new Date(sDate), $lte: new Date(eDate) } } ;
 	connection.countObjects(collectionName, query, function(err, result){
		if(err)
			callback(err, null);
		else
			callback(null, {count: result});
	});
}

var createSensorData = function(obj,callback){
	obj.date = new Date();
	connection.insertObj(collectionName, obj, function(err, result){
		callback(err, result);
	});
}
/********************************************/
exports.getAllItems = getAllItems;
exports.getItems = getItems;
exports.createItem = createItem;
exports.updateItem = updateItem;
exports.countItems = countItems;
exports.findDataWithDate = findDataWithDate;
exports.createSensorData = createSensorData;
exports.countDataWithDate = countDataWithDate;