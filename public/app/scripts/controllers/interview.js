'use strict';

angular.module('publicApp')
  .controller('InterviewCtrl', function ($scope, $routeParams) {
     $scope.questions = [{id: 1, question:"how old are you?"}]
     $scope.techQuestions = [{id: 2,question: "Write a function to square a number"},{id: 3, question: "write a function to be magic!"}];
     $scope.hash = $routeParams.hash
     $scope.candidateSummary = {
        name: 'Carter Rabasa',
        organizations: [{name:'CascadiaJS'},{name:'Twilio'}],
        proficientLanguage: 'JavaScript',
        notableProjects: [{name:'JQuery', description: 'Front-end JavaScript framework'},
                          {name: 'CoffeeScript', description: 'Dialect of JavaScript'}],
        imageUrl: 'https://1.gravatar.com/avatar/6417ca1c133ad9c74479a0f9a3f0dc95?d=https%3A%2F%2Fidenticons.github.com%2F261209d3a391e1b25377435d6cb41382.png&s=200'
     };
  });
