'use strict';

angular.module('ScreenEasyApp')
  .factory('interviewQuestionResource', ['$resource', function ($resource) {
    return $resource(
         "http://127.0.0.1::port/v1/interview/question/:id",
         {port: '3000', id: "@Id" },
         { "update": {method:"PUT"} }
    );
  }]);
