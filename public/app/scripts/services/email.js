'use strict';

angular.module('ScreenEasyApp')
  .factory('emailResource', ['$resource', function($resource) {
    return $resource(
         ":protocol\/\/:host::port/email",
         { protocol: document.location.protocol,
           host: document.location.host,
           port: '3000'},
         { "update": {method:"PUT"} }
    );
  }]);
