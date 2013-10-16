'use strict';

angular.module('ScreenEasyApp')
  .factory('githubResource', ['$resource', 'API_ENDPOINT', function ($resource, API_ENDPOINT) {
    return $resource(
         API_ENDPOINT + "/v1/developer/:name/:type",
         { name: "@name",
           type: "@type"},
         { "update": {method:"PUT"} }
    );
  }]);
