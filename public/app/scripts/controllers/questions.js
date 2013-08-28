'use strict';

angular.module('publicApp')
  .controller('QuestionsCtrl', function ($scope, $http) {
     $http.get("http://127.0.0.1:3000/v1/interview/questions").success(function(data) {
        console.log(data);
        $scope.questions = data;
     }).error(function(data) {
        $scope.questions = []
     });

     $scope.addQuestion = function(){
        var question = {
           source: $scope.question.source,
           body: $scope.question.body,
           defaultLanguage: $scope.question.defaultLanguage
        };
        console.log($scope.question);

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
