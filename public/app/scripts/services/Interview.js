'use strict';

angular.module('publicApp')
  .service('interview', function interview($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return {
       create: function(interview) {
           return $http.post('/interview/create',interview);
       },
       find: function(params) {
           return $http.get('/interview/find');
       }
    };
  });
