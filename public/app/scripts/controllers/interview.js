'use strict';

angular.module('ScreenEasyApp')
  .controller('InterviewCtrl', ['$scope', '$routeParams', 'interviewQuestionResource', 'githubResource', '$location', '$store', function ($scope, $routeParams, interviewQuestionResource, githubResource, $location, $store) {
         var user = $store.get('candidate.info');

         $scope.showRedirect = false;

         // Candidate info is not set. Redirect to schedule page
         if(!user) {
            setTimeout(function() {
                $scope.showRedirect = true;
                $location.path("schedule");
            }, 1000);
         }

         $scope.hash = $location.hash;

         $scope.developer = {};

         // Do we have a cache hit?
         if ($store.get('developer.profile')) {
            $scope.developer.profile = $store.get('developer.profile');
            console.log($scope.developer.profile);
         } else {
            var profile_promise = githubResource.get({name:user.github_handle}).$promise;

            profile_promise.then(function(resp) {
               $scope.developer.profile = resp.basic;
               $store.set('developer.profile', $scope.developer.profile);
            });
         }

         if ($store.get('interview.questions')) {
            $scope.techQuestions = $store.get('interview.questions');
         } else {
            var promise = interviewQuestionResource.query();

            promise.$promise.then(function(res) {
                $scope.techQuestions = res;
                $store.set('interview.questions', $scope.techQuestions);
            });
         }

         console.log($scope.developer);

         $scope.hash = $routeParams.hash;

         $scope.endInterview = function() {
            $location.path('/postmortem/' + $scope.hash);
         };
  }]);
