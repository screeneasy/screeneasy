'use strict';

angular.module('ScreenEasyApp')
  .controller('ScheduleCtrl', ['$scope', '$location', 'storage', 'interviewResource', 'emailResource', function ($scope, $location, storage, interviewResource, emailResource) {
      var date = new Date()
      date.setMinutes(0);
      $scope.interviewTime = date;

      $scope.scheduleInterview = function() {
          // @TODO Need to refactor this
          // send notification email
          var candidate_profile = new emailResource();
          candidate_profile.to = $scope.candidate.email;
          candidate_profile.message = 'hello';

          var interviewer_profile = new emailResource();
          interviewer_profile.to = $scope.candidate.email;
          interviewer_profile.message = 'hello';

          // send an email to both candidates
          var email_promise = candidate_profile.$save();

          email_promise.then(function(data) {
              console.log(data);
          });

          // send an email to both candidates
          var email_promise = interviewer_profile.$save();

          email_promise.then(function(data) {
              console.log(data);
          });

          // save the interview
          storage.set('candidate.info',$scope.candidate);

          // store into db
          var interviewInput = {
            interviewer   : $scope.interviewer,
            candidate     : $scope.candidate,
            // @FIXME interviewTime returns a DateTime string instead of mm::ss
            //interviewDate : $scope.interviewDate + ' ' + $scope.interviewTime,
            interviewDate : $scope.interviewDate,
            hash: md5(JSON.stringify([$scope.interviewer,$scope.candidate,$scope.interviewDate]))
          };

          var setup_interview_promise = interviewResource.save(interviewInput).$promise;

          setup_interview_promise.then(function(data) {
            console.log(data);
          });

          // Generate an unique hash

      };

    }]);
