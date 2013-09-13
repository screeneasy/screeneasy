'use strict';

angular.module('ScreenEasyApp')
  .controller('InterviewsCtrl', function ($scope, interviewResource) {
     interview.get().success(function(data) {
         $scope.interviews = data;  
     });
  });
