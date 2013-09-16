'use strict';

angular.module('ScreenEasyApp')
  .factory('interviewResource', ['$resource', function($resource) {
    return $resource(
         "http://127.0.0.1::port/interview",
         {port: '3000'},
         { "update": {method:"PUT"} }
    );
  }]);
