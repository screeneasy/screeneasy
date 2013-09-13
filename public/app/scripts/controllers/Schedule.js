'use strict';

angular.module('ScreenEasyApp')
  .controller('ScheduleCtrl', ['$scope', '$http', '$store', function ($scope, $http, $store) {
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
     };

     $scope.inviteCandidate = function() {
        $store.set('candidate.github_handle',$scope.candidate.github_handle);
     };
  }]);
