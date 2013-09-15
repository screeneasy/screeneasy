'use strict';

angular.module('ScreenEasyApp')
  .controller('ScheduleCtrl', ['$scope', '$location', '$store', 'interviewResource', 'emailResource', function ($scope, $location, $store, interviewResource, emailResource) {
      $scope.scheduleInterview = function() {
          // @TODO Need to refactor this
          // send notification email
          var candidate_profile = new emailResource();
          candidate_profile.to = $scope.candidate.email;
          candidate_profile.message = 'hello';

          // send an email to both candidates
          var email_promise = candidate_profile.$save();

          email_promise.then(function(data) {
              console.log(data);
          });

          var interviewer_profile = new emailResource();
          interviewer_profile.to = $scope.candidate.email;
          interviewer_profile.message = 'hello';

          // send an email to both candidates
          var email_promise = interviewer_profile.$save();

          email_promise.then(function(data) {
              console.log(data);
          });

          // save the interview
          $store.set('candidate.info',$scope.candidate);

          // store into db
          var interviewInput = {
            interviewer   : $scope.interviewer,
            candidate     : $scope.candidate,
            interviewDate : $scope.interviewDate + ' ' + $scope.interviewTime
          };

          var setup_interview_promise = interviewResource.save(interviewInput).$promise;

          setup_interview_promise.then(function(data) {
            console.log(data);
          });

          // Generate an unique hash

      };

    }]);
