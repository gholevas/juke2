'use strict';

juke.controller('AlbumsCtrl', function($scope, $http, $rootScope, $log, PlayerFactory) {

  $http.get('/api/albums/')
  .then(res => res.data)
  .then(albums => {
    $scope.albums = albums;
      var arr = [];
      albums.forEach(function (album) {
        album.imageUrl = '/api/albums/' + album._id + '.image';
        $http.get('/api/albums/'+album._id+'/songs/')
        .then(function(songs){
          console.log(songs.data);
          album.songs = songs.data;
        })
      });
  })
  .catch($log.error); 

  $rootScope.$on('viewSwap',function(event,data){
    if(data.name == 'allAlbums'){
      $scope.showMe = true;
    }
  })

  $scope.viewOneAlbum = function (albumId) {
      $rootScope.$broadcast('viewSwap', { name: 'oneAlbum', id: albumId });
      $scope.showMe = false;
  };

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
