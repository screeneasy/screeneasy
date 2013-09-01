'use strict';

angular.module('publicApp')
  .factory('interviewQuestion', function ($http, $q) {
    // Build an interview questions class
    var endpoint = "http://127.0.0.1:3000/v1/interview/questions";

    var interview_questions = function(data) {
        angular.extend(this, data);
    }

    interview_questions.get = function(id) {
        return $http.get(endpoint).then(function(response) {
            return new interview_questions(response.data);
        });
    }

    // @TODO implement create()

    return interview_questions;
  });
