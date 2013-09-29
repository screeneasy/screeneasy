'use strict';

angular.module('ScreenEasyApp')
  .factory('interviewResource', ['$resource', function($resource) {
    return $resource(
         "http://screeneasy-api.herokuapp.com/interview",
         {},
         { "query": {method: "GET"}
         }
    );
  }]);
