'use strict';

angular.module('ScreenEasyApp')
  .controller('InterviewCtrl', ['$scope', '$routeParams', 'interviewQuestionResource', 'github', '$location', '$store', function ($scope, $routeParams, interviewQuestionResource, github, $location, $store) {
         var user = $store.get('candidate.github_handle');
         $scope.showRedirect = false;

         // Candidate info is not set. Redirect to schedule page
         if(!user) {
            setTimeout(function() {
                $scope.showRedirect = true;
                $location.path("schedule");
            }, 1000);
         }

         console.log(user);

         $scope.hash = $location.hash;

         var promise = interviewQuestionResource.query();

         promise.$promise.then(function(res) {
             $scope.techQuestions = res;
         });
         $scope.hash = $routeParams.hash;


         github.get({
           user: user,
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
