'use strict';

angular.module('ScreenEasyApp')
  .factory('emailResource', ['$resource', function($resource) {
    return $resource(
         "http://127.0.0.1::port/email",
         {port: '3000'},
         { "update": {method:"PUT"} }
    );
  }]);
