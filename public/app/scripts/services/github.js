'use strict';

angular.module('ScreenEasyApp')
  .factory('githubResource', ['$resource', function ($resource) {
    return $resource(
         ":protocol\/\/:host::port/v1/developer/:name/:type",
         { protocol: document.location.protocol,
           host: document.location.host,
           port: '3000',
           name: "@name",
           type: "@type"},
         { "update": {method:"PUT"} }
    );
  }]);
