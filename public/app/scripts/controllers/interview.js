'use strict';

angular.module('publicApp')
  .controller('InterviewCtrl', ['socket', function ($scope, socket) {
    console.log(socket);
    $scope.modes = ['Scheme', 'XML', 'Javascript', 'Python'];
    $scope.mode = $scope.modes[0];

    // The ui-ace option
    $scope.aceOption = {
      mode: $scope.mode.toLowerCase(),
      onLoad: function (_ace) {
        $scope.modeChanged = function () {
          _ace.getSession().setMode("ace/mode/" + $scope.mode.toLowerCase());
        };

      }
    };

    $scope.on('socket:error', function(eve, data) {
        socket.emit('text-changed', {id: "hello" , value:'world'});
    });
  }]);
