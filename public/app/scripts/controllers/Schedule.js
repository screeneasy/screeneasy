'use strict';

angular.module('publicApp')
  .controller('ScheduleCtrl', function ($scope) {
     $scope.scheduleInterview = function() {
        // generate hash for the interview        
        var hash = "1234"
        var interview = {
           interviewer: $scope.interviewer,
           candidate: $scope.candidate,
           time: $scope.interviewTime,
           date: $scope.interviewDate
        };

        // save the interview 

        // send an email to both candidates

     }
  });
