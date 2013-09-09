'use strict';

angular.module('ScreenEasyApp', ['fireace', 'ngResource','ui.bootstrap','simplewebrtc'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/candidate/setup', {
        templateUrl: 'views/questions.html',
        controller: 'QuestionsCtrl'
      })
      .when('/schedule', {
         templateUrl: 'views/schedule.html',
         controller: 'ScheduleCtrl'
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
