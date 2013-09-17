'use strict';

angular.module('ScreenEasyApp')
  .factory('emailResource', ['$resource', function($resource) {
    var host_origin = document.location.protocol + '//' + document.location.host;

    return $resource(
         ":protocol\/\/:host::port/email",
         { protocol: document.location.protocol,
           host: document.location.host,
           port: '3000'},
         { "update": {method:"PUT"} }
    );
  }]);
