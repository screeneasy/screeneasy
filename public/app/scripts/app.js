'use strict';

angular.module('publicApp', ['btford.socket-io', 'ui.ace'])
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

    var interviewSocket = io.connect(window.location.origin + ':3000/interview');
    socketProvider.ioSocket(interviewSocket);
  });
