'use strict';

angular.module('ScreenEasyApp')
  .controller('ScheduleCtrl', ['$scope', '$http', '$q', '$location', '$store', 'interviewResource', 'email', function ($scope, $http, $q, $location, $store, interviewResource, email) {
      $scope.scheduleInterview = function() {
          // generate hash for the interview
          var hash = '1234';
          var interviewInput = {
            interviewer: $scope.interviewer,
            candidate: $scope.candidate,
            interviewDate:  $scope.interviewDate + ' ' + $scope.interviewTime
          };

          $q.all([
            interviewResource.save(interviewInput),
            email.send({to:interviewInput.candidate.email, message: 'hello'}),
            email.send({to:interviewInput.interviewer.email,message: 'hi'})
          ])
          .then(function(responses) {
            var errors = responses.filter(function(v,k) { return v.data.status == "error"; });
            var errors = errors.map(function(v,k) { return v.data.message; });
            if (!errors.length) {
               $location.path('/interviews')
            }
            else {
               $scope.errors = errors;
            }
          }, function error(errors) {
            $scope.errors = errors;
          });

          // save the interview
          $store.set('candidate.github_handle',$scope.candidate.github_handle);

          // send an email to both candidates
      };

    }]);
