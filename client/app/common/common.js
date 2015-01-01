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

}]);
