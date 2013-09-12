'use strict';

angular.module('ScreenEasyApp')
  .controller('QuestionsCtrl', ['$scope', 'interviewQuestionResource', function ($scope, interviewQuestionResource) {
     $scope.questions = interviewQuestionResource.query();

     $scope.addQuestion = function() {
        var interviewQuestion = new interviewQuestionResource();
        interviewQuestion.title = $scope.question.title;
        interviewQuestion.body = $scope.question.body;
        interviewQuestion.tags = $scope.question.tags;
        var resp = interviewQuestion.$save();
     };

     $scope.is_deleted = false;

     $scope.deleteQuestion = function(question) {
        interviewQuestionResource.delete({id:$scope.question.id}, function(resp) {
            $scope.is_deleted = resp;
        });
     };
  }]);
