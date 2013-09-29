'use strict';

angular.module('ScreenEasyApp')
  .controller('InterviewsCtrl', ['$scope', 'interviewResource', function ($scope, interviewResource) {
     var query_promise = interviewResource.query({}).$promise;

     query_promise.then(function(data) {
         $scope.interviews = data.data;
     });

  }]);
