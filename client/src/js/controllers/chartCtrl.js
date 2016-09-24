angular.module('myApp').controller('chartCtrl',['$scope', '$rootScope', '$route','$location', '$timeout', 'SensorDataService', 'SensorDBService', 'socketio',function($scope, $rootScope, $route, $location, $timeout, SensorDataService, SensorDBService, socketio){
		$scope.series = ['Inner Sensor', 'Outer Sensor'];
		var domain = $location.protocol()+"://"+$location.host()+"/CAA/sensorDB/v1.0";
		console.log(domain);
		var today = new Date();
		$scope.startDate = new Date();
		$scope.startDate.setDate(today.getDate() - 1);
		$scope.startDate.setHours(0,0,0,0);
		$scope.toDate = new Date();
		$scope.toDate.setHours(23,59,59,59);
		var tempData;
		var offset = 1;
		var limit = 100;
		var count =  0;
		//var $chart = [];
		$scope.options = {
	    scales: {	
	      yAxes: [
	        {
	          display: true,
	          ticks:{
	         	maxTicksLimit: 4,
	         	min:0,
	          },
	           gridLines: {
                display: true,
            },
	        }
	      ],
	      xAxes: [
	      {
	      	display:true,
            gridLines: {
                display: true,
            },
            ticks:{
	         	maxTicksLimit: 12,
	         	fontSize:10
	          }
          }
          ]
	    },
	    elements: {
	        point: {
	            radius:0.2,
	            borderWidth: 1,
	        },
	    },
	    legend: {
            display: true,
           }
  		};
	/*	SensorDataService.setStartDate($scope.startDate,function(result){
			count = result;
		});
		SensorDataService.setToDate($scope.toDate,function(result){
			if(result>0){
				count = result;
				SensorDataService.getSensorData(offset, limit, function(r){
					tempData = r;
					console.log("1");
					$scope.getDataForChart(tempData);
					$rootScope.$broadcast("dateChange");
				});
			}else{
				console.log("1");
				$scope.getDataForChart(tempData);
				$rootScope.$broadcast("dateChange");
			}
		});*/

		$scope.getDataForChart = function(tempData){
		//	$chart.forEach(function(c){
		//	  	c.destroy();
		//	 });
			$scope.data = [];
			var innerSensors = [];
			var outerSensors = [];
			var currentDateLabel = "";
			$scope.labels = []; 
			for(var i = 0; i< tempData.length; i++){
				innerSensors.push(tempData[i]["innerSensor"]);
				outerSensors.push(tempData[i]["outerSensor"]);
				/*
				if(currentDateLabel==="" || tempData[i]["date"].indexOf(currentDateLabel)<0){
					currentDateLabel = tempData[i]["date"].substring(0,tempData[i]["date"].indexOf("T"))
					$scope.labels.push(currentDateLabel);
				}
				else
					//$scope.labels.push("");
					$scope.labels.push(tempData[i]["date"].substring(tempData[i]["date"].indexOf("T")+1));
					*/
				var currentDateLabel = [];
				var d = new Date(tempData[i]["date"]);
				currentDateLabel.push(d.toLocaleDateString());
				currentDateLabel.push(d.toLocaleTimeString());
				$scope.labels.push(currentDateLabel);

			};
			$scope.data.push(innerSensors);
			$scope.data.push(outerSensors);
		}

		$scope.$watch('startDate',function(){
			 offset = 1;
			 count =  0;
			tempData = [{"innerSensor":0,"outerSensor":0,"date":$scope.startDate}];
			if($scope.startDate!=null){
				$scope.startDate.setHours(0,0,0,0);
				console.log($scope.startDate);
				SensorDataService.setStartDate($scope.startDate, function(result){
					if(result>0){
						count = result;
						SensorDataService.getSensorData(offset, limit, function(r){
							//console.log(r);
							tempData = r;
							$scope.getDataForChart(tempData);
							$rootScope.$broadcast("dateChange",{'count':count});
						});
					}else{
						count = result;
						$scope.getDataForChart(tempData);
						$rootScope.$broadcast("dateChange",{'count':count});
						}
				});
			}else{
				$scope.getDataForChart(tempData);
				$rootScope.$broadcast("dateChange",{'count':count});
			}
		});

		$scope.$watch('toDate',function(){
			console.log($scope.toDate);
			offset = 1;
			 count =  0;
			tempData = [{"innerSensor":0,"outerSensor":0,"date":$scope.toDate}];
			if($scope.toDate!=null){
				$scope.toDate.setHours(23,59,59,59);
				console.log($scope.toDate);
				SensorDataService.setToDate($scope.toDate,function(result){
					if(result>0){
						count = result;
						SensorDataService.getSensorData(offset, limit, function(r){
							tempData = r;
							//console.log(r);
							$scope.getDataForChart(tempData);
							$rootScope.$broadcast("dateChange",{'count':count});
						});
					}else{
						count = result;
						$scope.getDataForChart(tempData);
						$rootScope.$broadcast("dateChange", {'count':count});
						}
				});
			}else{
				$scope.getDataForChart(tempData);
				$rootScope.$broadcast("dateChange",{'count':count});
			}
		});

		socketio.on('sensorDataCreated',function(item){
			console.log("Am i here activating socketio?");
			console.log("offset: "  + offset);
			var resultDate = new Date(item.date);
			resultDate.setHours(23,59,59,59);
			console.log(resultDate);
			if(offset===1 && resultDate.getTime()===$scope.toDate.getTime()){
				SensorDataService.setToDate($scope.toDate,function(result){
					if(result>0){
						count = result;
						SensorDataService.getSensorData(offset, limit, function(r){
							tempData = r;
							$scope.getDataForChart(tempData);
							$rootScope.$broadcast("dataChange",{'count':count});
						});
					}else{
						count = result;
						$scope.getDataForChart(tempData);
						$rootScope.$broadcast("dateChange", {'count':count});
						}
				});	
			}
		});

		$scope.$on("pagination", function(ev, value){
			if((value.limit * value.offset > offset*limit)||(offset>1 && value.limit * value.offset <= limit*(offset-1))){
				offset=value.limit * value.offset%limit>0?Math.floor(value.limit * value.offset/limit)+1:Math.floor(value.limit * value.offset/limit);
				if(offset<=0)
					offset = 1;
				console.log("new offset: "   + offset);
				SensorDataService.getSensorData(offset, limit, function(r){
					tempData = r;
					$scope.getDataForChart(tempData);
				});
			}
		});

	//	$scope.$on("create", function (event, chart) {
	// 		$chart.push(chart);
	//	});
	}]);