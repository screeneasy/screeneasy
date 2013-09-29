'use strict';

angular.module('ScreenEasyApp')
  .factory('interviewResource', ['$resource', function($resource) {
    return $resource(
         "http://localhost:3000/interview",
         {},
         { "query": {method: "GET"}
         }
    );
  }]);
