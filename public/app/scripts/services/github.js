'use strict';

angular.module('publicApp')
  .factory('github', ['$resource', function ($resource) {
     var github = $resource(
        'https://api.github.com/:query/:user/:repo/:spec',
        {
          'query': 'users',
          'user': 'erkobridee',
          'repo': 'repos',
          'spec': '',
          'callback': 'JSON_CALLBACK',
          'per_page': 100
        }, {
          'get': {
              'method': 'JSONP'
          }
        }
      );

    return github;
  }]);
