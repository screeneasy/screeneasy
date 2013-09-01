'use strict';

angular.module('publicApp')
  .controller('InterviewCtrl', function ($scope) {
       var editors = {};
       var locks = {};

       $scope.aceOption = {
           onLoad: function (_ace) {
               $scope.modeChanged = function () {
                   _ace.getSession().setMode("ace/mode/javascript");
               };
           }
       }

       $scope.aceLoaded = function(_editor){
           console.log(_editor);
           // Editor part
           var _session = _editor.getSession();
           var _renderer = _editor.renderer;

           console.log(_renderer);

           // Options
           _session.setUndoManager(new ace.UndoManager());

           // Events
           _session.on("change", function(d,e,f) {
               $scope.socket.emit('text-changed', {id: k, value:session.getValue()});
           });
       };

       $scope.$on('socket:update-text', function (ev, data) {
           var editor = editors[d.id];
           editor.locked = true;
           editor.session.setValue(d.value);
           editor.locked = false;
       });
  });
