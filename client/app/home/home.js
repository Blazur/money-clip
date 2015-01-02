/**
* app.main Modul
*
* Description
*/
angular.module('app.home', [])
.config(['$stateProvider',function($stateProvider) {
  $stateProvider
    .state('app.home', {
      url: '',
      abstract: true,
      templateUrl: 'app/home/home.tpl.html',
      controller: 'HomeController as Home'
    })
    .state('app.home.web', {
      url: '/',
      templateUrl: 'app/home/web.tpl.html'
    })
    .state('app.home.mobile', {
      url: '/mobile',
      template: 'Mobile'
    })
    .state('app.home.design', {
      url: '/design',
      template: 'design'
    })
    .state('app.home.training', {
      url: '/training',
      template: 'Training'
    });
}])
.controller('HomeController', ['$scope', 'Scroller', '$interval', '$timeout',function($scope, Scroller, $interval, $timeout) {
  _.extend(this, Scroller);

  this.tagline = "Blazur Labs";
}]);
