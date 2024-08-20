import React, { useEffect, useRef, useState } from 'react';
import { IconButton, Slider } from '@mui/material';
import { PlayArrow, Pause, SkipNext, SkipPrevious, FastForward, FastRewind, VolumeUp } from '@mui/icons-material';
import Draggable from 'react-draggable'; // Import Draggable
import './CustomAudioPlayer.css';

const CustomAudioPlayer = ({ currentSong, songInfo, onEnded }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      const audioElement = audioRef.current;

      audioElement.pause();
      audioElement.src = currentSong;
      audioElement.load();

      const playAudio = () => {
        audioElement.play().catch(error => {
          console.error('Failed to play the audio:', error);
        });
        setIsPlaying(true);
      };

      audioElement.addEventListener('canplay', playAudio, { once: true });

      audioElement.addEventListener('ended', () => {
        setIsPlaying(false);
        if (onEnded) onEnded();
      });

      audioElement.addEventListener('timeupdate', () => {
        setProgress((audioElement.currentTime / audioElement.duration) * 100);
      });

      return () => {
        audioElement.removeEventListener('canplay', playAudio);
        audioElement.removeEventListener('ended', () => {
          setIsPlaying(false);
          if (onEnded) onEnded();
        });
        audioElement.removeEventListener('timeupdate', () => {
          setProgress((audioElement.currentTime / audioElement.duration) * 100);
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

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
    audioRef.current.volume = newValue / 100;
  };

  const handleProgressChange = (event, newValue) => {
    audioRef.current.currentTime = (newValue / 100) * audioRef.current.duration;
    setProgress(newValue);
  };

  const handleSkipNext = () => {};
  const handleSkipPrevious = () => {};
  const handleFastForward = () => { audioRef.current.currentTime += 10; };
  const handleRewind = () => { audioRef.current.currentTime -= 10; };

  return (
    <Draggable>
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
        <div className="volume-progress-container">
          <div className="volume-control">
            <VolumeUp />
            <Slider value={volume} onChange={handleVolumeChange} aria-labelledby="volume-slider" className="volume-slider" />
          </div>
          <div className="progress-bar">
            <Slider value={progress} onChange={handleProgressChange} aria-labelledby="progress-slider" />
          </div>
        </div>
        <audio ref={audioRef} controls style={{ display: 'none' }}>
          <source src={currentSong} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </Draggable>
  );
};

export default CustomAudioPlayer;
