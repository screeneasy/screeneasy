'use strict';

angular.module('publicApp', ['fireace', 'ngResource', 'timer'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/candidate/setup', {
        templateUrl: 'views/list_questions.html',
        controller: 'QuestionsCtrl'
      })
      .when('/postmortem/:hash', {
         templateUrl: 'views/postmortem.html', 
         controller: 'PostmortemCtrl'
      })
      .when('/interview/:hash', {
        templateUrl: 'views/interview.html',
        controller: 'InterviewCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
