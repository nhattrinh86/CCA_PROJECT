angular.module('myApp').factory('SensorDBService',['$resource', '$location', function($resource, $location) {
   var ApiURL = $location.protocol()+"://"+($location.host()=='localhost'?'localhost:8080':$location.host())+"/CAA/sensorDB/v1.0";
    return $resource(ApiURL,{},{
    getAllItems:{
        url: ApiURL+'/get/allItems',
        method: 'GET',
        isArray: true
    },
    getItemsByDates:{
        url: ApiURL+'/get/items/:startDate/:endDate/:limit/:offset',
        method: 'GET',
        isArray: true,
        params: {startDate:'@startDate', endDate:'@endDate', limit:'@limit',offset:'@offset'}
    },
     countItemsByDates:{
        url: ApiURL+'/get/count/:startDate/:endDate',
        method: 'GET',
        isArray: false,
        params: {startDate:'@startDate', endDate:'@endDate'}
    },
    createItem:{
        url: ApiURL+'/create/item',
        method: 'POST'
    },
    updateItem:{
        url: ApiURL+'/update/item',
        method: 'PUT'
    },
});
}]);