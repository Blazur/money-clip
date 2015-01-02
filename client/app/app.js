/**
* app Module
*
* Main app
*/
angular.module('app', [
  'ui.router',
  'lumx',
  'ngMaterial',
  'app.common',
  'app.home',
  'duScroll'
])
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('app', {
      url: '',
      abstract: true,
      templateUrl: 'app/app.tpl.html',
      controller: 'AppController as App'
    });

  $locationProvider.html5Mode(true);
}])
.controller('AppController', ['$scope', 'SEO', function($scope, SEO){
  // $scope.name = 'Blazur Labs';

  _.extend(this, SEO);
}])
.run([function(){

}]);
