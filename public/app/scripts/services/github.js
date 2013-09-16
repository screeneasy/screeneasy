'use strict';

angular.module('ScreenEasyApp')
  .factory('githubResource', ['$resource', function ($resource) {
    return $resource(
         "http://127.0.0.1::port/v1/developer/:name/:type",
         {port: '3000', name: "@name", type: "@type"},
         { "update": {method:"PUT"} }
    );
  }]);
