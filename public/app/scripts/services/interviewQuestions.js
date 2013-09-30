'use strict';

angular.module('ScreenEasyApp')
  .factory('interviewQuestionResource', ['$resource', 'API_ENDPOINT', function ($resource, API_ENDPOINT) {
    return $resource(
         API_ENDPOINT + "/v1/interview/question/:id",
         { id: "@Id" },
         { "update": {method:"PUT"} }
    );
  }]);
