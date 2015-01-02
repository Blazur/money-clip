/**
* app.common Module
*
* Description
*/
angular.module('app.common', [])
.factory('SEO', [function(){
  var _metaDesc = '';
  var _metas = {};

  var changeMetaDesc = function(desc){
    _metaDesc = desc;
    return desc;
  };

  var getMetaDesc = function(){
    return _metaDesc;
  };

  var changeMetaVal = function(k, v) {
    _metas[k] = v;
    return v;
  };

  var resetMetas = function(){
    _.forEach(_metas, function(val, k){
      _metas[k] = '';
    });
  };

  return {
    changeMetaDesc: changeMetaDesc,
    getMetaDesc: getMetaDesc,
    changeMetaVal: changeMetaVal,
    resetMetas: resetMetas
  };

}])
.factory('Scroller', ['$document', function($document){
  var scroller = {};

  var _scrollItems = [];
  var currentScrollItemIndex = 0;

  var scrollTo = function(ele){
    $document.scrollToElementAnimated(ele);
  };

  scroller.registerScrollItems = function(el){
    _scrollItems.push(el);
    // $log.log(_scrollItems.length);
  };

  scroller.scrollToNext = function(back){
    var nextElement = _scrollItems[currentScrollItemIndex];

    if (nextElement) {
      scrollTo(nextElement);
    } else {
      // currentScrollItemIndex = 0;
      // nextElement = _scrollItems[currentScrollItemIndex];
      // console.log(nextElement);
      back = true;
    }

    if (back){
      return currentScrollItemIndex--;
    }

    currentScrollItemIndex++;
  };

  return scroller;
}])
.directive('scrollItem', ['Scroller', function(Scroller){
  return {
    restrict: 'A',
    scope: true,
    // require: '^scroller',
    link: function(scope, ele, attr){
      // console.log(ctrl.name);
      Scroller.registerScrollItems(ele);
    }
  };
}])
.directive('scroller', ['Scroller', function(Scroller){
  return function(scope, ele, attr){
    // scope.nextScroll = function(){
    //   Scroller.scrollToNext();
    // };

    ele.on('click', function(){
      Scroller.scrollToNext();
    });
  };
}])
.directive('watchScroll', ['$window', 'Scroller', function($window, Scroller){
  var lastScrollTop = 0;
  return function(scope, ele, attr){
    var win = angular.element($window);

    var scrollUp = function(){
      console.log('up');
      Scroller.scrollToNext();
    };

    var scrollDown = function(){
      console.log('down');
      Scroller.scrollToNext(true);
    };

    // var lazyScrollUp = _.throttle(scrollUp, 3000);
    // var lazyScrollDown = _.throttle(scrollDown, 3000);

    var chooseDirection = _.throttle(function(win){
      var st = win.scrollTop();
      if (st > lastScrollTop){
        // lazyScrollDown();
        scrollUp();
      } else {
        // lazyScrollUp();
        scrollDown();
      }
      lastScrollTop = st;
    }, 1200);

    win.on('scroll', function(){
      chooseDirection(win);
    });
  };
}]);
