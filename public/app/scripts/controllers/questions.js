'use strict';

angular.module('ScreenEasyApp')
  .controller('QuestionsCtrl', function ($scope, interviewQuestion) {
     var interview_promise = interviewQuestion.getAll();

     $scope.questions = [];
     interview_promise.then(function(questions) {
        $scope.questions = questions;
     });

     $scope.addQuestion = function() {
        // instantiate interview question with user inputs
        var question = new interviewQuestion();
        question.title  = $scope.question.title,
        question.source = $scope.question.source,
        question.body   = $scope.question.body;

        question.create();
     };

     $scope.deleteQuestion = function() {
        var question = new interviewQuestion();
        var delete_status = question.delete($scope.question.id);
        $scope.is_deleted = delete_status;
        return delete_status;
     };
  });
