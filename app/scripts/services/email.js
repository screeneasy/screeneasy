'use strict';

angular.module('ScreenEasyApp')
  .factory('emailResource', ['$resource', 'API_ENDPOINT', function($resource, API_ENDPOINT) {
    return $resource(
         API_ENDPOINT + "/email",
         {},
         { "update": {method:"PUT"} }
    );
  }]);
