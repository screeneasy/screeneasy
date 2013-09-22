'use strict';

angular.module('ScreenEasyApp')
  .factory('interviewResource', ['$resource', function($resource) {
    return $resource(
         "http://screeneasy-api.herokuapp.com/interview/:hash",
         {},
         { "query": {method: "GET"}, hash: '@hash',
           "post": {method:"POST"}
         }
    );
  }]);
