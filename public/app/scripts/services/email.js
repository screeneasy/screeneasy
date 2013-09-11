'use strict';

angular.module('ScreenEasyApp')
  .service('email', function email($http) {
     return {
        send: function(params) {
           return $http.post('/email/send', params)
        }
     }
  });
