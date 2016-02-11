'use strict';

var juke = angular.module('juke', ['ui.router'])


.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider
        .when('/', '/albums')
        .when('/artist/:id', '/artist/:id/albums');

    $locationProvider.html5Mode(true);

    $stateProvider
        .state('albumList', {
            url: '/albums',
            templateUrl: 'albums.html',
            resolve: {
                albums: function(AlbumFactory) {
                    return AlbumFactory.fetchAll();
                }
            },
            controller: 'AlbumsCtrl'
        })
        .state('artistList', {
            url: '/artists',
            templateUrl: 'artists.html',
            resolve: {
                artists: function(ArtistFactory) {
                    return ArtistFactory.fetchAll();
                }
            },
            controller: 'ArtistsCtrl'
        })
        .state('album', {
            url: '/album/:id',
            templateUrl: 'album.html',
            resolve: {
                album: function(AlbumFactory, $stateParams) {
                    return AlbumFactory.fetchById($stateParams.id);
                }
            },
            controller: 'AlbumCtrl'
        })
        .state('artist', {
            url: '/artist/:id',
            templateUrl: 'artist.html',
            resolve: {
                artist: function(ArtistFactory, $stateParams) {
                    return ArtistFactory.fetchById($stateParams.id);
                }
            },
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
