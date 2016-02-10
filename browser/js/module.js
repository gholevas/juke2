'use strict';

var juke = angular.module('juke', ['ui.router'])


.config(function ($stateProvider) {
    $stateProvider
    .state('albumList', {
        url: '/albums',
        templateUrl: 'albums.html',
        controller: 'AlbumsCtrl'
    })
    .state('artistList', {
        url: '/artists',
        templateUrl: 'artists.html',
        controller: 'ArtistsCtrl'
    })
    .state('album', {
        url: '/album/:id',
        templateUrl: 'album.html',
        controller: 'AlbumCtrl'
    })
    .state('artist', {
        url: '/artist/:id',
        templateUrl: 'artist.html',
        controller: 'ArtistCtrl'
    })
    .state('artist.albums', {
        url: '/albums',
        templateUrl: 'artist.albums.html',
        controller: 'ArtistCtrl'
    })
    .state('artist.songs', {
        url: '/songs',
        templateUrl: 'artist.songs.html',
        controller: 'ArtistCtrl'
    });

});

