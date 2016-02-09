'use strict';

juke.factory('PlayerFactory', function() {
    // non-UI logic in here
    var tools = {};
    tools.currentSong = null;
    tools.progress = 0;
    tools.songlist;
    tools.cIndex = -1;

    var audio = document.createElement('audio');
    audio.addEventListener('timeupdate', function() {
        tools.progress = audio.currentTime / audio.duration;
    });

    tools.start = function(song, list) {
        tools.pause()
        if(list) tools.songlist = list;
        if (song === tools.currentSong) {
            return audio.play();
        }
        audio.src = song.audioUrl;
        audio.load();
        audio.play();
        tools.currentSong = song;
    }


    function mod(num, m) {
        return ((num % m) + m) % m;
    };


    function skip(interval) {
        if (!tools.currentSong) return;
        console.log(tools.songlist)
        tools.cIndex = tools.songlist.indexOf(tools.currentSong);
        tools.cIndex = mod((tools.cIndex + (interval || 1)), tools.songlist.length);
        tools.currentSong = tools.songlist[tools.cIndex];
        if (tools.isPlaying()) tools.start(tools.currentSong)
    };

    tools.next = function() {
        skip(1);
    };

    tools.previous = function() {
        skip(-1);
    };


    tools.pause = function() {
        audio.pause();
    }

    tools.resume = function() {
        audio.play();
    }

    tools.isPlaying = function() {
        return !audio.paused;
    }

    tools.getCurrentSong = function() {
        return tools.currentSong;
    }


    tools.getProgress = function() {
        return tools.progress;
    }

    return tools;
    x
});
