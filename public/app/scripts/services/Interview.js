'use strict';

angular.module('ScreenEasyApp')
  .factory('interviewResource', ['$resource', function($resource) {
    return $resource(
         ":protocol\/\/:host::port/interview",
         { protocol: document.location.protocol,
           host: document.location.host,
           port: '3000' },
         { "update": {method:"PUT"} }
    );
  }]);
