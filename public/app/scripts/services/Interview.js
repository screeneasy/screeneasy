'use strict';

angular.module('ScreenEasyApp')
  .factory('interviewResource', ['$resource', 'API_ENDPOINT', function($resource, API_ENDPOINT) {
    return $resource(
         API_ENDPOINT + "/interview",
         {},
         { "query": {method: "GET"}
         }
    );
  }]);
