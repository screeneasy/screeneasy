'use strict';

angular.module('ScreenEasyApp')
  .controller('ScheduleCtrl', function ($scope, $http, $q, $location, interview, email) {
     $scope.scheduleInterview = function() {
        // generate hash for the interview
        var hash = "1234"
        var interviewInput = {
           interviewer: $scope.interviewer,
           candidate: $scope.candidate,
           interviewDate:  $scope.interviewDate + ' ' + $scope.interviewTime
        };

        $q.all([
           interview.create(interviewInput),
           email.send({to:interviewInput.candidate.email, message: 'hello'}),
           email.send({to:interviewInput.interviewer.email,message: 'hi'})
        ])
        .then(function(responses) {
           var errors = responses.filter(function(v,k) { return v.status == "error"; });
           if (!errors.length) {
              $location.path('/interviews')
           }
           else {
              $scope.errors = errors;
           }
        }, function error(errors) {
           $scope.errors = errors;
        });
     }
  });
