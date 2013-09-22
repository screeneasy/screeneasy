'use strict';

angular.module('ScreenEasyApp')
  .factory('githubResource', ['$resource', function ($resource) {
    return $resource(
         "http://screeneasy-api.herokuapp.com/v1/developer/:name/:type",
         { name: "@name",
           type: "@type"},
         { "update": {method:"PUT"} }
    );
  }]);
