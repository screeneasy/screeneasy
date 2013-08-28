'use strict';

angular.module('publicApp')
  .controller('QuestionsCtrl', function ($scope, $http) {
     $scope.questions = [];
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
            console.log(data);
            $scope.data = data;
        }).error(function(data, status, headers, config) {
            $scope.status = status;
        });
     }

  });
