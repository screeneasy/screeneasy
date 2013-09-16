'use strict';

angular.module('ScreenEasyApp')
  .controller('QuestionsCtrl', ['$scope', 'interviewQuestionResource', function ($scope, interviewQuestionResource) {
     var promise = interviewQuestionResource.query();

     promise.$promise.then(function(res) {
         $scope.questions = res;
     });

     $scope.addQuestion = function() {
        var interviewQuestion = new interviewQuestionResource();
        interviewQuestion.title = $scope.question.title;
        interviewQuestion.body = $scope.question.body;
        interviewQuestion.tags = $scope.question.tags;

        var save_promise = interviewQuestion.$save();
        save_promise.then(function(status) {
            $scope.questions.push(interviewQuestion);

            // Reset fields
            $scope.title = '';
            $scope.body = '';
            $scope.tags = '';
        });
     };

     $scope.is_deleted = false;

     $scope.deleteQuestion = function(question) {
        // @TODO invalidate cache stored in localStorage
        var delete_promise = interviewQuestionResource.delete({id:question.id});
        delete_promise.$promise.then(function(resp) {
            angular.forEach($scope.questions, function(item, idx) {
                if(JSON.stringify(item) === JSON.stringify(question)) {
                    $scope.questions.splice(idx, 1);
                    return;
                }
            });
        });
     };
  }]);
