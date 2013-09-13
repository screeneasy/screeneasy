'use strict';

angular.module('ScreenEasyApp')
  .controller('InterviewsCtrl', ['$scope', 'interviewResource', function ($scope, interviewResource) {
     interviewResource.get().success(function(data) {
         $scope.interviews = data;
     });
  }]);
