'use strict';

angular.module('publicApp')
  .service('email', function email($http) {
     return {
        send: function(params) {
           return $http.post('/email/send', params)
        }
     }
  });
