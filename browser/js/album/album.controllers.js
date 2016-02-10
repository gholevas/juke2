'use strict';

juke.controller('AlbumCtrl', function($scope, $http, $rootScope, $log, PlayerFactory) {

  $http.get('/api/albums/')
  .then(res => $http.get('/api/albums/' + res.data[1]._id)) // temp: use first
  .then(res => res.data)
  .then(album => {
    album.imageUrl = '/api/albums/' + album._id + '.image';
    album.songs.forEach(function (song, i) {
      song.audioUrl = '/api/songs/' + song._id + '.audio';
      song.albumIndex = i;
    });
    $scope.album = album;
  })
  .catch($log.error); 


$scope.currentSong = PlayerFactory.getCurrentSong;
$scope.isPlaying = PlayerFactory.isPlaying;

$scope.toggle = function (song) {
    if (PlayerFactory.isPlaying() && song === PlayerFactory.getCurrentSong()) {
      PlayerFactory.pause();
    } else {
      PlayerFactory.start(song, $scope.album.songs);
    }
  };


});
