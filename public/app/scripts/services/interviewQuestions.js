'use strict';

angular.module('ScreenEasyApp')
  .factory('interviewQuestionResource', ['$resource', function ($resource) {
    return $resource(
         ":protocol\/\/:host/v1/interview/question/:id",
         { protocol: document.location.protocol,
           host: document.location.host,
           id: "@Id" },
         { "update": {method:"PUT"} }
    );
  }]);
