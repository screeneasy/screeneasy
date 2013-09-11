'use strict';

angular.module('ScreenEasyApp')
  .factory('interviewQuestion', function ($http) {
    // Build an interview questions class
    var endpoint = 'http://127.0.0.1:3000/v1/interview/questions';

    var interview_questions = function(data) {
        angular.extend(this, data);
    };

    // GET: Get a specific interview question
    interview_questions.get = function(id) {
        return $http.get(endpoint + '/' + id).then(function(response) {
            return new interview_questions(response.data);
        });
    };

    // GET: Get all interview question
    interview_questions.getAll = function() {
        return $http.get(endpoint).then(function(response) {
            return new interview_questions(response.data);
        });
    };

    // POST: Create a new interview question
    interview_questions.prototype.create = function() {
        // instantiate question
        var interview_question = this;
        return $http.post(endpoint, interview_question).then(function(response) {
            // Feed the instance with basic properties
            interview_question.id = response.data.id;
            interview_question.title = response.data.title;
            interview_question.body = response.data.body;
            interview_question.source = response.data.source;
            interview_question.created = response.data.created;

            return interview_question;
        });
    };

    // DELETE: Delete an interview question
    interview_questions.prototype.delete = function(id) {
        return $http.delete(endpoint + "/" + id);
    };

    return interview_questions;
  });
