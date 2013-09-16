'use strict';

angular.module('ScreenEasyApp')
  .controller('InterviewsCtrl', ['$scope', 'interviewResource', function ($scope, interviewResource) {
     var query_promise = interviewResource.query();

     query_promise.$promise.then(function(data) {
         $scope.interviews = data;
     });
  }]);
