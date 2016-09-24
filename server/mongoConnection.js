var mongoose = require("mongodb").MongoClient;
var config = require('./config');
var async = require("async");

var dbConnection = function(callback){
	console.log("config.mongodbHost: "  + config.mongoProductionHost);
	mongoose.connect(config.mongoProductionHost, function(err,db){
		if(err){
			callback(err,null);
			return;
		}
		callback(null,db);
	});
}

var insertObj = function(collectionName, obj, callback){
	var db;
	console.log("Object: "  + JSON.stringify(obj));
	async.series({
		connection: function(next){
			dbConnection(function(err, result){
				if(err){
					console.log("Connection error");
					callback(err, null);
					return;
				}
				db = result;
				next();
			});
		},
		insert: function(next){
			console.log("Insert");
			db.collection(collectionName).insert(obj, function(err,result){
				db.close();
				if(err){
					callback(err, null);
					return;
				}
				callback(null, result);
			});
		}
	});
};

var findAll = function(collectionName, callback){
	var db;
	async.series({
		connection: function(next){
			dbConnection(function(err, result){
				if(err){
					console.log("Connection error");
					callback(err, null);
					return;
				}
				db = result;
				next();
			});
		},
		findAll: function(next){
			db.collection(collectionName).find({}).toArray(function(err,result){
				db.close();
				callback (err, result);
			});
		}
	});
};

var findAllWithLimit = function(collectionName, offset, limit, callback){
	var db;
	async.series({
		connection: function(next){
			dbConnection(function(err, result){
				if(err){
					console.log("Connection error");
					callback(err, null);
					return;
				}
				db = result;
				next();
			});
		},
		findAllWithLimit: function(next){
			db.collection(collectionName).find({}).skip(offset > 0 ? ((offset-1)*limit) : 0).limit(limit).toArray(function(err,result){
				db.close();
				callback (err, result);
			});
		}
	});
};

var findObjs = function(connectionName, query, callback){
	var db;
	async.series({
		connection: function(next){
			dbConnection(function(err, result){
				if(err){
					console.log("Connection error");
					callback(err, null);
					return;
				}
				db = result;
				next();
			});
		},
		findObjs: function(next){
			db.collection(connectionName).find(query).toArray(function(err,result){
				db.close();
				callback (err, result);
			});
		}
	});
}

var findObjsWithLimit = function(connectionName, query, offset, limit, callback){
	var db;
	async.series({
		connection: function(next){
			dbConnection(function(err, result){
				if(err){
					console.log("Connection error");
					callback(err, null);
					return;
				}
				db = result;
				next();
			});
		},
		findObjsWithLimit: function(next){
			var options = {
				skip: (offset > 0 ? ((offset-1)*limit) : 0),
				limit: limit
			};
			db.collection(connectionName).find(query, options).toArray(function(err,result){
				db.close();
				callback (err, result);
			});
		}
	});
}

var findObjsWithLimitDesc = function(connectionName, query, offset, limit, descKey, callback){
	var db;
	async.series({
		connection: function(next){
			dbConnection(function(err, result){
				if(err){
					console.log("Connection error");
					callback(err, null);
					return;
				}
				db = result;
				next();
			});
		},
		findObjsWithLimitDesc: function(next){
			var options = {
				sort: [[descKey,'desc']],
				skip: (offset > 0 ? ((offset-1)*limit) : 0),
				limit: limit
			};
			db.collection(connectionName).find(query,options).toArray(function(err,result){
				db.close();
				callback (err, result);
			});
		}
	});
}

var updateObj = function(connectionName, query, obj, callback){
	var db;
	async.series({
		connection: function(next){
			dbConnection(function(err, result){
				if(err){
					console.log("Connection error");
					callback(err, null);
					return;
				}
				db = result;
				next();
			});
		},
		update: function(next){
			db.collection(connectionName).update(query, obj, function(err,result){
				if(err){
					callback(err, null);
					return;
				}
				callback(null, result);
			});
		}
	});
}

var deleteObj = function(connectionName, query, callback){
	var db;
	async.series({
		connection: function(next){
			dbConnection(function(err, result){
				if(err){
					console.log("Connection error");
					callback(err, null);
					return;
				}
				db = result;
				next();
			});
		},
		delete: function(next){
			db.collection(connectionName).remove(query, function(err,result){
				if(err){
					callback(err, null);
					return;
				}
				callback(null, result);
			});
		}
	});
}


var countObjects = function(collectionName, query, callback){
	var db;
	async.series({
		connection: function(next){
			dbConnection(function(err, result){
				if(err){
					console.log("Connection error");
					callback(err, null);
					return;
				}
				db = result;
				next();
			});
		},
		countObjs: function(next){
			db.collection(collectionName).count(query,function(err, result){
				db.close();
				callback (err, result);
			});
		}
	});
};

exports.dbConnection =dbConnection;
exports.insertObj =insertObj;
exports.findAll =findAll;
exports.findAllWithLimit = findAllWithLimit;
exports.findObjsWithLimit =findObjsWithLimit;
exports.findObjs =findObjs;
exports.countObjects = countObjects;
exports.updateObj =updateObj;
exports.deleteObj =deleteObj;
exports.findObjsWithLimitDesc = findObjsWithLimitDesc;