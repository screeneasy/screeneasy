'use strict';

angular.module('ScreenEasyApp')
  .filter('Candidate', function () {
    return function(candidates, searchString) {
          if(!searchString) {
            return candidates;
          }

          var result = [];

          searchString = searchString.toLowerCase();

          angular.forEach(candidates, function(c) {
            //if(c.interviwer.email.toLowerCase().indexOf(searchString) !== -1 ||
               //c.interviwer.name.toLowerCase().indexOf(searchString) !== -1 ||
               //c.interviwer.phone.toLowerCase().indexOf(searchString) !== -1 ||
               //c.candidate.name.toLowerCase().indexOf(searchString) !== -1 ||
               //c.candidate.phone.toLowerCase().indexOf(searchString) !== -1
                //)  {
                //result.push(item);
            //}
          });

          return result;
    };
  });
