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
         } else {
            var profile_promise = githubResource.get({name:user.github_handle, type:'basic'}).$promise;

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

         // Pull user gists
         var gist_promise = githubResource.get({name:user.github_handle, type:'gists'}).$promise;

         gist_promise.then(function(data) {
            $scope.developer.profile.gists = data;
         });

         // Pull user repos
         var repos_promise = githubResource.get({name:user.github_handle, type:'repos'}).$promise;

         repos_promise.then(function(data) {
            $scope.developer.profile.own_repos = data;
         });

         $scope.endInterview = function() {
            $location.path('/postmortem/' + $scope.hash);
         };
  }]);
