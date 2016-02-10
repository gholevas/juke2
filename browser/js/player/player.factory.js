'use strict';

juke.factory('PlayerFactory', function($rootScope) {
    var currentSong = null;
    var progress = 0;
    var songlist;
    var cIndex = -1;
    var audio = document.createElement('audio');

    audio.addEventListener('timeupdate', function() {
        progress = 100 * audio.currentTime / audio.duration;
        $rootScope.$digest();
    });

    var tools = {
        start : function(song,list){
            tools.pause()
            if(list) songlist = list;
            audio.src = song.audioUrl;
            audio.load();
            audio.play();
            currentSong = song;
        },
        next : function(){skip(1);},
        previous : function() {skip(-1);},
        pause : function() {audio.pause();},
        resume : function() {audio.play();},
        isPlaying : function() {return !audio.paused;},
        getCurrentSong : function() {return currentSong;},
        getProgress : function() {return progress;}
    };

    function mod(num, m) {
        return ((num % m) + m) % m;
    };

    function skip(interval) {
        cIndex = songlist.indexOf(currentSong);
        cIndex = mod((cIndex + (interval || 1)), songlist.length);
        currentSong = songlist[cIndex];
        if (tools.isPlaying()) tools.start(currentSong)
    };


    return tools;
    
});
