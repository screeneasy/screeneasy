'use strict';

angular.module('publicApp', ['fireace', 'ngResource','ui.bootstrap'])
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
      .when('/schedule', {
         templateUrl: 'views/schedule.html',
         controller: 'ScheduleCtrl'
      })
      .when('/interview', {
        templateUrl: 'views/interview.html',
        controller: 'InterviewCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
