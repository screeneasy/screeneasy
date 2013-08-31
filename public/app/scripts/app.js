'use strict';

angular.module('publicApp', ['btford.socket-io'])
  .config(function ($routeProvider, socketProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/candidate/setup', {
        templateUrl: 'views/list_questions.html',
        controller: 'QuestionsCtrl'
      })
      .when('/interview', {
        templateUrl: 'views/interview.html',
        controller: 'InterviewCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    var interviewSocket = io.connect('127.0.0.1:3000/interview');
    socketProvider.ioSocket(interviewSocket);
  });
