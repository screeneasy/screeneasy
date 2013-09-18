'use strict';

angular.module('ScreenEasyApp')
  .factory('interviewResource', ['$resource', function($resource) {
    return $resource(
         ":protocol\/\/:host/interview/:hash",
         { protocol: document.location.protocol,
           host: document.location.host
         },
         { "query": {method: "GET"}, hash: '@hash',
           "post": {method:"POST"}
         }
    );
  }]);
