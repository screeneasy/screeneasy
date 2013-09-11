'use strict';

angular.module('publicApp')
  .controller('InterviewsCtrl', function ($scope, interview) {
     interview.find().success(function(data) {
         $scope.interviews = data;  
     });
  });
