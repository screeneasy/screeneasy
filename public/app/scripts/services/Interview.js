'use strict';

angular.module('ScreenEasyApp')
  .factory('interviewResource', ['$resource', function($resource) {
    return $resource(
         ":protocol\/\/:host::port/interview/:hash",
         { protocol: document.location.protocol,
           host: document.location.host,
           port: '3000',
         },
         { "query": {method: "GET"}, hash: '@hash',
           "post": {method:"POST"}
         }
    );
  }]);
