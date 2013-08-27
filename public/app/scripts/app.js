'use strict';

angular.module('publicApp', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/questions', {
        templateUrl: 'views/list_questions.html',
        controller: 'QuestionsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
