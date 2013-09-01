'use strict';

angular.module('publicApp')
  .controller('QuestionsCtrl', function ($scope, interviewQuestion) {
     var interview_question = new interviewQuestion();
     var interview_promise = interviewQuestion.get(1);

     interview_promise.then(function(questions) {
        $scope.questions = questions;
     });

     // @TODO replace with interviewQuestion::create()
     $scope.addQuestion = function(){
        console.log('hello');
        var question = {
           title: $scope.question.title,
           source: $scope.question.source,
           body: $scope.question.body,
        };

        $scope.question.defaultLanguage = "";
        $scope.question.body = "";

        $scope.questions.push(question);

        $http.post("http://127.0.0.1:3000/v1/interview/questions", question)
        .success(function(data, status, headers, config) {
            $scope.data = data;
        }).error(function(data, status, headers, config) {
            $scope.status = status;
        });
     }
  });
