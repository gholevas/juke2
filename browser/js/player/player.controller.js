'use strict';

juke.controller('PlayerCtrl', function($scope, $rootScope, PlayerFactory) {

    $scope.currentSong = PlayerFactory.getCurrentSong;
    $scope.playing = PlayerFactory.isPlaying;
    $scope.progress = PlayerFactory.getProgress;
    $scope.next = PlayerFactory.next;
    $scope.prev = PlayerFactory.previous;

    $scope.toggle = function() {
        if (PlayerFactory.isPlaying()) {
            PlayerFactory.pause();
        } else {
            PlayerFactory.resume();
        }
    };
});
