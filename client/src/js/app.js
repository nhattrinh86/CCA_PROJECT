angular.module('myApp',[
	'ngRoute',
	'ngMaterial', 
	'md.data.table', 
	'ui.grid',
	'jkuri.gallery', 
	'chart.js',
	'config',
	'ngResource'
	])
	.config(function($routeProvider,$locationProvider){
		$routeProvider
			.when('/dashboard',{
				controller:'dashboardCtrl',
				templateUrl:'src/views/dashboard.html'
			})
			.otherwise({ redirectTo: '/dashboard' });
		$locationProvider.html5Mode(true);
	})
	.factory('socketio',['$rootScope', function ($rootScope) {
	  var socket = io.connect();
	  return {
	    on: function (eventName, callback) {
	      socket.on(eventName, function () {  
	        var args = arguments;
	        $rootScope.$apply(function () {
	          callback.apply(socket, args);
	        });
	      });
	    },
	    emit: function (eventName, data, callback) {
	      socket.emit(eventName, data, function () {
	        var args = arguments;
	        $rootScope.$apply(function () {
	          if (callback) {
	            callback.apply(socket, args);
	          }
	        });
	      })
	    }
	  };
	}])
	.controller('mainCtrl',['$scope','$location',function($scope,$location){
		$scope.relocate = function(){
			$location.path('/dashboard');
		};
	}])
	