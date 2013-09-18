'use strict';

angular.module('ScreenEasyApp')
  .factory('emailResource', ['$resource', function($resource) {
    return $resource(
         ":protocol\/\/:host/email",
         { protocol: document.location.protocol,
           host: document.location.host},
         { "update": {method:"PUT"} }
    );
  }]);
