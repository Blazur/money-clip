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
      animation: {
        enter: 'slide-in-right-fade',
        leave: 'slide-out-right-fade',
        speed: 500,
        ease: 'expo'
      },
      templateUrl: 'app/home/web.tpl.html'
    })
    .state('app.home.mobile', {
      url: '/mobile',
      templateUrl: 'app/home/web.tpl.html',
      animation: {
        enter: 'slide-in-right-fade',
        leave: 'slide-out-right-fade',
        speed: 500,
        ease: 'expo'
      }
    })
    .state('app.home.design', {
      url: '/design',
      template: 'design',
      animation: {
        enter: 'slide-in-right-fade',
        leave: 'slide-out-right-fade',
        speed: 500,
        ease: 'expo'
      }
    })
    .state('app.home.training', {
      url: '/training',
      template: 'Training',
      animation: {
        enter: 'slide-in-right-fade',
        leave: 'slide-out-right-fade',
        speed: 500,
        ease: 'expo'
      }
    });
}])
.controller('HomeController', ['$scope', 'Scroller', '$interval', '$timeout',function($scope, Scroller, $interval, $timeout) {
  _.extend(this, Scroller);
  this.tagline = "Blazur Labs";

}])
.directive('revealStart', ["$state", function($state){
  return function revealStartLink(scope, ele, attr){
    var state = attr.revealStart;
    var currentState = $state.current.name;

    if (state === currentState) {
      ele.addClass('active');
    }

    ele.on('click', function(){
      scope.$apply(function(){
        scope.$broadcast('trigger', {
          onComplete: function(){
            $state.go(state);
            ele.addClass('active');
          }
        });
      });
    });

    scope.$on('$stateChangeSuccess', function(e, toState){
      if (state !== toState.name) {
        ele.removeClass('active');
      }
    });

    scope.$on('$destroy', function(){
      ele.off('click');
    });
  };
}])
.directive('reveal', ['$urlRouter', function($urlRouter){

  var getImmediateChild = function(el){
    return $(el.children()[0]);
  };

  return function revealLink(scope, ele, attr){
    var position = ele.position();
    var width = ele[0].clientWidth;
    var height = ele[0].clientHeight;
    var offset = ele.offset();
    var x = offset.left + ele.width() / 2;
    var y = offset.top  + ele.height() / 2;


    var animate = function(a, b){

      var onComplete = function(){
        console.log('complete')
        $('reveal').remove();
        b.onComplete();
      };

      $('reveal').remove();

      var revealEle = $('<div class="reveal"></div>');

      revealEle.css({
        position: 'absolute',
        height: '0px',
        width:  '0px',
        top: position.top + 'px',
        left: position.left + 'px',
        backgroundColor: '#FF1744',
        pointerEvents: 'none',
        borderRadius: '30%',
        opacity: '0.6'
      });

      console.log(position)

      var toCss = {
        height: height + 'px',
        width: width + 'px',
        borderRadius: '0%'
      };

      ele.append(revealEle);

      $('.reveal').velocity(toCss, { duration: 500, complete: onComplete, easing: 'easeInOutExpo' });

      getImmediateChild(ele).velocity({
        opacity: 0
      }, { duration: 500, queue: false });

    };
    scope.$on('trigger', animate);
    scope.$on('$stateChangeSuccess', function(){
      var kids = getImmediateChild(ele);

      // kids.velocity({
      //   opacity: 0
      // }, { duration: 2000 });

    });
  };

}]);
