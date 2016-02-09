'use strict';

juke.controller('PlayerCtrl', function($scope, $rootScope, PlayerFactory) {

    // initialize audio player (note this kind of DOM stuff is odd for Angular)


    // state
    $scope.currentSong = PlayerFactory.currentSong;
    $scope.playing = false;

    // main toggle
    $scope.toggle = function(song) {

      //  PlayerFactory.pause();
      $scope.playing = true;
        play(song);
      
    };

    // functionality


    function play(song) {
        $scope.playing = true;
        $scope.currentSong = song;
        PlayerFactory.start(song);
    }

    // outgoing events (to Album… or potentially other characters)
    $scope.next = function() {
        PlayerFactory.next();
    };

    $scope.prev = function() {
        PlayerFactory.previous();
    };

});
