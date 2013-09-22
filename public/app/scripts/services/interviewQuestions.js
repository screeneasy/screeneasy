'use strict';

angular.module('ScreenEasyApp')
  .factory('interviewQuestionResource', ['$resource', function ($resource) {
    return $resource(
         "http://screeneasy-api.herokuapp.com/v1/interview/question/:id",
         { id: "@Id" },
         { "update": {method:"PUT"} }
    );
  }]);
