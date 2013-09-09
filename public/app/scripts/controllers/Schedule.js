'use strict';

angular.module('ScreenEasy')
  .controller('ScheduleCtrl', function ($scope, $http) {
     $scope.scheduleInterview = function() {
        // generate hash for the interview
        var hash = "1234"
        var interview = {
           interviewer: $scope.interviewer,
           candidate: $scope.candidate,
           time: $scope.interviewTime,
           date: Date.now()
        };

        $http.post('/interview/create', interview);

        // save the interview

        // send an email to both candidates

     }
  });
