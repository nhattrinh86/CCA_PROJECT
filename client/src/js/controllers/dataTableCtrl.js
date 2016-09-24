angular.module('myApp').controller('dataTableCtrl',['$scope','$rootScope', '$route','$location', 'SensorDataService', function($scope, $rootScope, $route, $location, SensorDataService){
		$scope.tempData = [];
		$scope.limit = 10;
		$scope.offset = 1;

		$scope.$on('dateChange',function(evt, value){
			console.log(value);
			console.log("dateChange");
			$scope.offset = 1;
			$scope.totalItem = value.count;	
			console.log($scope.totalItem);
			if($scope.totalItem>0)
				$scope.getItems();
			else
				$scope.tempData = [];
		});

		$scope.$on('dataChange',function(evt, value){
			$scope.totalItem = value.count;	
			if($scope.totalItem>0)
				$scope.getItems();
			else
				$scope.tempData = [];
		});

		$scope.getItems = function(){
			//getSensorData: function(offset, limit, callback)
			SensorDataService.getSensorData($scope.offset, $scope.limit, function(items){
				$scope.tempData = items;
				$rootScope.$broadcast("pagination", {limit:$scope.limit, offset:$scope.offset});
			});	
		}
	}]);