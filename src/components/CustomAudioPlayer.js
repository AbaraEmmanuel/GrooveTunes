import React, { useEffect, useRef, useState } from 'react';
import { IconButton } from '@mui/material';
import { PlayArrow, Pause, SkipNext, SkipPrevious, FastForward, FastRewind } from '@mui/icons-material';
import './CustomAudioPlayer.css'; // Import the CSS file for styling

const CustomAudioPlayer = ({ currentSong, songInfo, onEnded }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      const audioElement = audioRef.current;

      // Pause the current audio
      audioElement.pause();

      // Load the new source
      audioElement.src = currentSong;
      audioElement.load();

      // Play the new audio when it's ready
      const playAudio = () => {
        audioElement.play().catch(error => {
          console.error('Failed to play the audio:', error);
        });
        setIsPlaying(true);
      };

      audioElement.addEventListener('canplay', playAudio, { once: true });

      // Handle audio end event
      audioElement.addEventListener('ended', () => {
        setIsPlaying(false);
        if (onEnded) onEnded();
      });

      return () => {
        audioElement.removeEventListener('canplay', playAudio);
        audioElement.removeEventListener('ended', () => {
          setIsPlaying(false);
          if (onEnded) onEnded();
        });
      };
    }
  }, [currentSong]);

  const togglePlayPause = () => {
    const audioElement = audioRef.current;
    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play().catch(error => {
        console.error('Failed to play the audio:', error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleSkipNext = () => {
    // Implement skip next functionality
  };

  const handleSkipPrevious = () => {
    // Implement skip previous functionality
  };

  const handleFastForward = () => {
    audioRef.current.currentTime += 10;
  };

  const handleRewind = () => {
    audioRef.current.currentTime -= 10;
  };

  console.log('Current Song Info:', songInfo); // Debugging line to check songInfo

  return (
    <div className="custom-audio-player">
      <img src={songInfo?.albumArt || 'default-image-url'} alt="Album Art" className="album-art" />
      <div className="controls">
        <IconButton onClick={handleSkipPrevious}>
          <SkipPrevious />
        </IconButton>
        <IconButton onClick={handleRewind}>
          <FastRewind />
        </IconButton>
        <IconButton onClick={togglePlayPause}>
          {isPlaying ? <Pause /> : <PlayArrow />}
        </IconButton>
        <IconButton onClick={handleFastForward}>
          <FastForward />
        </IconButton>
        <IconButton onClick={handleSkipNext}>
          <SkipNext />
        </IconButton>
      </div>
      <audio ref={audioRef} controls style={{ display: 'none' }}>
        <source src={currentSong} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default CustomAudioPlayer;
