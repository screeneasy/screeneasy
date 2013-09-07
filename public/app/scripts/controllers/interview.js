'use strict';

angular.module('publicApp')
  .controller('InterviewCtrl', ['$scope', '$routeParams', 'interviewQuestion', 'github', '$location',
     function ($scope, $routeParams, interviewQuestion, github, $location) {
         $scope.questions = [{id: 1, question:"how old are you?"}]

         $scope.techQuestions = [{id: 2,question: "Write a function to square a number"},{id: 3, question: "write a function to be magic!"}];
         $scope.hash = $routeParams.hash

         var userParam = 'crabasa';

         github.get({
           user: userParam,
           repo: ''
         }, function(res) {
           $scope.summary = res.data;
         });

         $scope.candidateSummary = {
            organizations: [{name:'CascadiaJS'},{name:'Twilio'}],
            proficientLanguage: 'JavaScript',
            notableProjects: [{name:'JQuery', description: 'Front-end JavaScript framework'},
                              {name: 'CoffeeScript', description: 'Dialect of JavaScript'}],
         };

         $scope.endInterview = function() {
            $location.path('/postmortem/' + $scope.hash);
         };
  }]);
