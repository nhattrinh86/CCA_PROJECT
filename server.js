var express = require('express');
var app     = express();
var main = require('./server/main');
var server = require('http').createServer(app);  
var io = require('socket.io')(server);
app.use(express.static(__dirname + '/client'));
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    res.sendfile('./client/src/views/index.html');
});
app.get('/dashboard', function(req, res) {
    res.sendfile('./client/src/views/index.html');
});

app.get('/CAA/sensorDB/v1.0/get/allItems',function(req, res){
	main.getAllItems(function(err, result){
		if(err){
			res.send(err);
			return;
		}
		res.send(result);
	});
});

app.get('/CAA/sensorDB/v1.0/get/items/:startDate/:endDate/:limit/:offset',function(req, res){
	console.log(req.params.startDate);
	main.findDataWithDate(req.params.startDate, req.params.endDate, req.params.limit, req.params.offset, function(err, result){
		if(err){
			res.send(err);
			return;
		}
		//io.emit('sensor.getItems',result);
		res.send(result);
	});
});

app.get('/CAA/sensorDB/v1.0/get/count/:startDate/:endDate',function(req, res){
	console.log(JSON.stringify(req.params));
	main.countDataWithDate(req.params.startDate, req.params.endDate, function(err, result){
		if(err){
			res.send(err);
			return;
		}
		console.log(JSON.stringify(result));
		res.send(result);
	});
});

app.post('/CAA/sensorDB/v1.0/create/item',function(req, res){
	console.log("req.body: "  + JSON.stringify(req.body));
	main.createSensorData(req.body, function(err, result){
		if(err){
			res.send(err);
			return;
		}
		io.emit('sensorDataCreated');
		res.send(result);
	});
});

app.put('/CAA/sensorDB/v1.0/update/item',function(req, res){
	main.updateItem(req.body, function(err, result){
		if(err){
			res.send(err);
			return;
		}
		res.send(result);
	});
});

server.listen(8080);
console.log('Magic happens on 8080');