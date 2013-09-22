'use strict';

angular.module('ScreenEasyApp')
  .factory('emailResource', ['$resource', function($resource) {
    return $resource(
         "http://screeneasy-api.herokuapp.com/email",
         {},
         { "update": {method:"PUT"} }
    );
  }]);
