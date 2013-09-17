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
         $scope.developer.profile = {};

         $scope.developer.profile = storage.get('developer.profile');
         var profile_promise = githubResource.get({name:user.github_handle, type:'basic'}).$promise;

         profile_promise.then(function(resp) {
                 console.log(resp);
            $scope.developer.profile.basic = resp.basic;
         });

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
            $scope.developer.profile.gists = data.gists;
         });

         // Pull user repos
         var repos_promise = githubResource.get({name:user.github_handle, type:'repos'}).$promise;

         repos_promise.then(function(data) {
            $scope.developer.profile.own_repos = data.own_repos;
            $scope.developer.profile.contributed_repos = data.contributed_repos;
         });

         $scope.endInterview = function() {
            $location.path('/postmortem/' + $scope.hash);
         };
  }]);
