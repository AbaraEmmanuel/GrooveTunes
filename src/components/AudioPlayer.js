// src/components/AudioPlayer.js
import React, { useEffect, useRef } from 'react';

const AudioPlayer = ({ currentSong }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (currentSong) {
      audioRef.current.src = currentSong;
      audioRef.current.play();
    }
  }, [currentSong]);

  return (
    <div>
      <audio ref={audioRef} controls>
        <source src={currentSong} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioPlayer;
