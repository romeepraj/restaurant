var app = angular.module("restaurant",['ngRoute', 'uiGmapgoogle-maps'])

.config(['$routeProvider', function($routeProvider){
  $routeProvider.
    when('/main',{
      templateUrl: 'main.html',
      controller:'MainCtrl'
    }).
    when('/about',{
      templateUrl: 'about.html',
      controller:'MainCtrl'
    }).
    when('/menu',{
      templateUrl: 'menu.html',
      controller:'MenuCtrl'
    }).
   when('/gallery',{
      templateUrl: 'gallery.html',
      controller:'GalleryCtrl'
    }).
    when('/contact',{
      templateUrl: 'contact.html',
      controller:'ContactCtrl'
    }).
    otherwise({redirectTo:'/main'})
}])

.controller('MainCtrl', ['$scope', '$http','$location', function($scope, $http, $location){
   console.log($location);
  $scope.getClass = function (path) {
  return ($location.path().substr(0, path.length) === path) ? 'active' : '';
   }
}])

.controller('MenuCtrl', ['$scope', '$http', function($scope, $http){
  $http.get('menu.json').then(function(response){
    $scope.menus = response.data;
    //console.log($scope);
  });
}])
.controller('GalleryCtrl', ['$scope', '$http', function($scope, $http){
  $http.get('gallery.json').then(function(response){
    $scope.gallerys = response.data;
    console.log($scope);
  });
}])


.controller('ContactCtrl', ['$scope','$http', function($scope, $http){
   $scope.map = {
      center:  {
                  latitude: 39.470361,
                  longitude: -76.620593
               },
               zoom: 13
   };
   $scope.marker = {
                     id: 0,
                     coords: {
                          latitude: 39.470361,
                         longitude: -76.620593
                     },
                     options: {
                         draggable: true
                     },
                     events: {
                                 dragend: function(marker, eventName, args) {
                                 var lat = marker.getPosition().lat();
                                 var lon = marker.getPosition().lng();
                                 //console.log(lat);
                                 //console.log(lon);

                                 $scope.marker.options = {
                                    draggable: true,
                                    labelContent: "",
                                    labelAnchor: "100 0",
                                    labelClass: "marker-labels"
                                 };
                         }
                     }
        };
}]);

