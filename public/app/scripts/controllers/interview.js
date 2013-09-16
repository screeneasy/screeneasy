'use strict';

angular.module('ScreenEasyApp')
  .controller('InterviewCtrl', ['$scope', '$routeParams', 'interviewQuestionResource', 'githubResource', '$location', 'storage', function ($scope, $routeParams, interviewQuestionResource, githubResource, $location, storage) {
         var user = storage.get('candidate.info');

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
         if (storage.get('developer.profile')) {
            $scope.developer.profile = storage.get('developer.profile');
            console.log($scope.developer.profile);
         } else {
            var profile_promise = githubResource.get({name:user.github_handle}).$promise;

            profile_promise.then(function(resp) {
               $scope.developer.profile = resp.basic;
               storage.set('developer.profile', $scope.developer.profile);
            });
         }

         if (storage.get('interview.questions')) {
            $scope.techQuestions = storage.get('interview.questions');
         } else {
            var promise = interviewQuestionResource.query();

            promise.$promise.then(function(res) {
                $scope.techQuestions = res;
                storage.set('interview.questions', $scope.techQuestions);
            });
         }

         $scope.developer.profile.own_repos = {
            "repo": {
                "name" : "php"
            }
         };


         $scope.developer.profile.contributed_repos = ["PHP", "Python"];

         $scope.developer.profile.gists = ["gists", "Python"];

         console.log($scope.developer);

         $scope.hash = $routeParams.hash;

         $scope.endInterview = function() {
            $location.path('/postmortem/' + $scope.hash);
         };
  }]);
