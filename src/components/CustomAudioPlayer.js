import React, { useEffect, useRef, useState } from 'react';
import { IconButton, Slider } from '@mui/material';
import { PlayArrow, Pause, SkipNext, SkipPrevious, VolumeUp, FastForward, FastRewind } from '@mui/icons-material';
import './CustomAudioPlayer.css';

const CustomAudioPlayer = ({ currentSong, songInfo, onSongEnd, onNext, onPrevious }) => {
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
        if (onSongEnd) onSongEnd();
      });

      audioElement.addEventListener('timeupdate', () => {
        setProgress((audioElement.currentTime / audioElement.duration) * 100);
      });

      return () => {
        audioElement.removeEventListener('canplay', playAudio);
        audioElement.removeEventListener('ended', () => {
          setIsPlaying(false);
          if (onSongEnd) onSongEnd();
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

  const handleFastForward = () => {
    audioRef.current.currentTime += 10;
  };

  const handleRewind = () => {
    audioRef.current.currentTime -= 10;
  };

  return (
    <div className="custom-audio-player">
      <div className='top-section'>
      <img src={songInfo?.albumArt || 'default-image-url'} alt="Album Art" className="album-art" />
      <div className="controls">
        <IconButton onClick={onPrevious} style={{ color: 'white' }}>
          <SkipPrevious />
        </IconButton>
        <IconButton onClick={handleRewind} style={{ color: 'white' }}>
          <FastRewind />
        </IconButton>
        <IconButton onClick={togglePlayPause} style={{ color: 'white' }}>
          {isPlaying ? <Pause /> : <PlayArrow />}
        </IconButton>
        <IconButton onClick={handleFastForward} style={{ color: 'white' }}>
          <FastForward />
        </IconButton>
        <IconButton onClick={onNext} style={{ color: 'white' }}>
          <SkipNext />
        </IconButton>
      </div>
      </div>
      <Slider
        value={progress}
        onChange={handleProgressChange}
        aria-labelledby="progress-slider"
        sx={{ width: 'calc(100% - 200px)', marginTop: '10px' }}
      />
      <div className="volume-control">
        <VolumeUp style={{ color: 'white' }} />
        <Slider
          value={volume}
          onChange={handleVolumeChange}
          aria-labelledby="volume-slider"
          sx={{ width: '100px', marginLeft: '10px' }}
        />
      </div>
      <audio ref={audioRef} />
    </div>
  );
};

export default CustomAudioPlayer;
