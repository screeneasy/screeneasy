'use strict';

angular.module('publicApp')
  .filter('interviewQuestions', function () {
    return function(arr, searchString) {

         if(!searchString) {
              return arr;
         }

         var result = [];

         searchString = searchString.toLowerCase();

         angular.forEach(arr, function(item) {
              if(item.title.toLowerCase().indexOf(searchString) !== -1 ||
                 item.body.toLowerCase().indexOf(searchString) !== -1 ||
                 item.source.toLowerCase().indexOf(searchString) !== -1 ||
                 item.created.toLowerCase().indexOf(searchString) !== -1 ) {
                   result.push(item);
              }
         });

         return result;
    };
  });
