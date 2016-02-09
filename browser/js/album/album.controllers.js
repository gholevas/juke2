'use strict';

juke.controller('AlbumCtrl', function($scope, $http, $rootScope, $log, PlayerFactory) {

  // load our initial data
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
  .catch($log.error); // $log service can be turned on and off; also, pre-bound

  $scope.toggle = function (song,songs) {
    console.log(songs)
    if ($scope.playing && song === $scope.currentSong) {
      pause();
    } else play(song,songs);
  };

  // incoming events (from Player, toggle, or skip)
  // $scope.$on('pause', pause);
  // $scope.$on('play', play);
  // $scope.$on('next', next);
  // $scope.$on('prev', prev);

  // functionality
  function pause () {
    PlayerFactory.pause()
    $scope.playing = false;
  }
  function play (song,songs) {
    PlayerFactory.start(song, songs);
    $scope.playing = true;
    $scope.currentSong = song;
  };

  // a "true" modulo that wraps negative to the top of the range
  // function mod (num, m) { return ((num % m) + m) % m; };

  // // jump `interval` spots in album (negative to go back, default +1)
  // function skip (interval) {
  //   if (!$scope.currentSong) return;
  //   var index = $scope.currentSong.albumIndex;
  //   index = mod( (index + (interval || 1)), $scope.album.songs.length );
  //   $scope.currentSong = $scope.album.songs[index];
  //   // if ($scope.playing) $rootScope.$broadcast('play', $scope.currentSong);
  // };
  // $scope.
  // function next () { PlayerFactory.next() };
  // function prev () { skip(-1); };

});
