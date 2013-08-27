'use strict';

angular.module('publicApp')
  .factory('InterviewQuestions', function($q, $timeout) {
    var getMessages = function() {
      var deferred = $q.defer();

      $timeout(function() {
        deferred.resolve(['Hello', 'world']);
      }, 2000);

      return deferred.promise;
    };
    return {
       get: function() {
       }
    }
  });


angular.module('publicApp')
  .controller('QuestionsCtrl', function ($scope, ) {


  });
