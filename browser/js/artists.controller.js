'use strict';

juke.controller('ArtistsCtrl', function($scope, $http, $rootScope, $log, PlayerFactory) {

    $rootScope.$on('viewSwap', function(event, data) {
        if (data.name == 'allArtists') {
            $scope.showMe = true;
            $http.get('/api/artists/')
                .then(res => res.data)
                .then(function(artists) {
                    $scope.artists = artists
                })
                .catch($log.error);
        }
    })

    $scope.viewOneArtist = function (artistId) {
        $rootScope.$broadcast('viewSwap', { name: 'oneArtist', id: artistId });
        $scope.showMe = false;
    }

});

juke.controller('ArtistCtrl', function($scope, $http, $rootScope, $log, PlayerFactory) {

    $rootScope.$on('viewSwap', function(event, data) {
        if (data.name == 'oneArtist') {
            $scope.showMe = true;
            $http.get('/api/artists/' + data.id)
                .then(res => res.data)
                .then(function(artist) {
                    $scope.artist = artist;
                    $http.get('/api/artists/' + artist._id + '/albums')
                    .then(res => res.data)
                    .then(function(albums){
                        $scope.artist.albums = albums
                    })
                    $http.get('/api/artists/' + artist._id + '/songs')
                    .then(res => res.data)
                    .then(function(songs){
                        $scope.artist.songs = songs
                    })
                })
                .catch($log.error);
        }
    })




});
