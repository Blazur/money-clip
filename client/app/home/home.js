/**
* app.main Modul
*
* Description
*/
angular.module('app.home', [])
.config(['$stateProvider',function($stateProvider) {
  $stateProvider
    .state('app.home', {
      url: '/',
      templateUrl: 'app/home/home.tpl.html'
    });
}])
.controller('HomeController', ['$scope', function($scope) {

}]);
