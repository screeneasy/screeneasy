'use strict';

angular.module('ScreenEasyApp')
  .filter('interviewQuestions', function () {
    return function(arr, searchString) {

         if(!searchString) {
              return arr;
         }

         var result = [];

         searchString = searchString.toLowerCase();

         angular.forEach(arr, function(item) {
              if(item.hasOwnProperty('title') && item.title) {
                if(item.title.toLowerCase().indexOf(searchString) !== -1) {
                    result.push(item);
                }
              }

              if(item.hasOwnProperty('created') && item.created) {
                if(item.created.toLowerCase().indexOf(searchString) !== -1) {
                    result.push(item);
                }
              }

              if(item.hasOwnProperty('body') && item.body) {
                if(item.body.toLowerCase().indexOf(searchString) !== -1) {
                    result.push(item);
                }
              }

              if(item.hasOwnProperty('source') && item.source) {
                if(item.source.toLowerCase().indexOf(searchString) !== -1) {
                    result.push(item);
                }
              }
         });

         return result;
    };
  });
