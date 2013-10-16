'use strict';

angular.module('ScreenEasyApp')
  .directive('interviewQuestion', function () {
    return {
      templateUrl: 'views/partial/question.html',
      transclude : false,
      restrict: 'EA',
      controller: 'QuestionsCtrl',
      scope: {
        question: "="
      }
    };
  });
