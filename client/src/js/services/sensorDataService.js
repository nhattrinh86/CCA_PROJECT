angular.module('myApp').factory('SensorDataService',['$http', 'SensorDBService', function($http, SensorDBService) {
    var tempData =[];
    var fromDate =  null;
    var toDate = null;
    var count =  0;
    
    return {
   		setStartDate: function(from,callback){
   			fromDate  = from;
   			if(toDate===null){
   				callback(count);
   				return;
   			}
   			var f = fromDate.getTime();
    		var t = toDate.getTime();
    		tempData = [];
    		if(f>t){
    			callback(count);
   				return;
    		}
    		SensorDBService.countItemsByDates({'startDate':fromDate ,'endDate':toDate}, function(result){
    			console.log(result);
    			count = result.count;
    			callback(count);
    		});
    	},
      
    	setToDate: function(to, callback){
    		toDate = to;
    		if(fromDate===null){
   				callback(count);
   				return;
   			}
    		var f = fromDate.getTime();
    		var t = toDate.getTime();
    		tempData = [];
    		if(f>t){
   				callback(count);
   				return;
   			}
    		SensorDBService.countItemsByDates({'startDate':fromDate ,'endDate':toDate }, function(result){
    			console.log(result);
    			count = result.count;
    			callback(count);
    		});
    	},

    	getCount: function(){
    		return count;
    	},

    	getSensorData: function(offset, limit, callback){
        fromDate.setHours(0,0,0,0);
        toDate.setHours(23,59,59,59);
    		if (fromDate && toDate && fromDate.getTime()<=toDate.getTime()) {
    			SensorDBService.getItemsByDates({'startDate':fromDate ,'endDate':toDate ,'limit':limit, 'offset':offset}, function(result){
    				tempData = result;
    				callback(tempData);
    			});
    		}else
 				callback(tempData);   		
    	}
    }
}]);