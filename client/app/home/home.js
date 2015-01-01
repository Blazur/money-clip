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
      template: 'Home'
    });
}])
.controller('HomeController', ['$scope', function($scope) {

}]);
