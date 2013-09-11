'use strict';

angular.module('ScreenEasyApp')
  .controller('InterviewsCtrl', function ($scope, interview) {
     interview.find().success(function(data) {
         $scope.interviews = data;  
     });
  });
