'use strict';

angular.module('ScreenEasyApp')
  .service('interviewResource', function interview($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return {
       save: function(interview) {
           return $http.post('/interview',interview);
       },
       get: function(params) {
           return $http.get('/interview');
       }
    };
  });
