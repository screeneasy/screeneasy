'use strict';

angular.module('ScreenEasyApp')
  .controller('InterviewCtrl', ['$scope', '$routeParams', 'interviewQuestionResource', 'github', '$location', '$store', function ($scope, $routeParams, interviewQuestionResource, github, $location, $store) {
         $scope.hash = $location.hash;

         $scope.techQuestions = interviewQuestionResource.query();
         $scope.hash = $routeParams.hash;

         var userParam = $store.get('candidate.name');

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
