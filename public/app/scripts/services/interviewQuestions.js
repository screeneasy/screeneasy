'use strict';

angular.module('ScreenEasyApp')
  .factory('interviewQuestionResource', ['$resource', function ($resource) {
    return $resource(
         ":protocol\/\/:host::port/v1/interview/question/:id",
         { protocol: document.location.protocol,
           host: document.location.host,
           port: '3000',
           id: "@Id" },
         { "update": {method:"PUT"} }
    );
  }]);
