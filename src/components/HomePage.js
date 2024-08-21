import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, Box, AppBar, Toolbar, Button, Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import { Link } from 'react-router-dom';
import CustomAudioPlayer from './CustomAudioPlayer';
import { fetchPopularTracks } from '../services/spotifyApi';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [currentSongInfo, setCurrentSongInfo] = useState(null);
  const [playingSongId, setPlayingSongId] = useState(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const { logout } = useAuth();

  // Snackbar state for user feedback
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // success, error, etc.

  useEffect(() => {
    const fetchHomepageTracks = async () => {
      try {
        const fetchedSongs = await fetchPopularTracks();
        if (Array.isArray(fetchedSongs)) {
          setSongs(fetchedSongs);
        } else {
          console.error('Fetched songs data is not an array');
        }
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };
    fetchHomepageTracks();
  }, []);

  const playSong = (songUrl, songInfo, index) => {
    setCurrentSong(songUrl);
    setCurrentSongInfo(songInfo);
    setPlayingSongId(songInfo.id);
    setCurrentSongIndex(index);
  };

  const handleCardClick = (song, index) => {
    playSong(song.preview_url, { name: song.name, albumArt: song.albumArt }, index);
  };

  const handleNextSong = () => {
    if (currentSongIndex !== null && currentSongIndex < songs.length - 1) {
      const nextSong = songs[currentSongIndex + 1];
      playSong(nextSong.preview_url, { name: nextSong.name, albumArt: nextSong.albumArt }, currentSongIndex + 1);
    }
  };

  const handlePreviousSong = () => {
    if (currentSongIndex !== null && currentSongIndex > 0) {
      const prevSong = songs[currentSongIndex - 1];
      playSong(prevSong.preview_url, { name: prevSong.name, albumArt: prevSong.albumArt }, currentSongIndex - 1);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#1DB954' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            GrooveTunes
          </Typography>
          <Box>
            <Button color="inherit" component={Link} to="/playlist">Playlist</Button>
            <Button color="inherit" component={Link} to="/search">Search</Button>
            <Button color="inherit" onClick={() => logout()} sx={{ marginLeft: 5 }}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#1DB954' }}>
          Discover Popular Songs
        </Typography>
        <Typography variant="h6" align="center" sx={{ mb: 4 }}>
          Explore the latest popular tracks and click on a song to play it.
        </Typography>
        <Grid container spacing={4}>
          {songs.length > 0 ? (
            songs.map((song, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={song.id}>
                <Card 
                  sx={{ 
                    borderRadius: '16px', 
                    overflow: 'hidden', 
                    position: 'relative', 
                    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)', 
                    transition: 'transform 0.3s, box-shadow 0.3s', 
                    '&:hover': { 
                      transform: 'scale(1.03)', 
                      boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)', 
                      cursor: 'pointer'
                    } 
                  }}
                  onClick={() => handleCardClick(song, index)}
                >
                  <CardContent 
                    sx={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center', 
                      textAlign: 'center', 
                      zIndex: 2 
                    }}
                  >
                    <img 
                      src={song.albumArt || 'default-image-url'} 
                      alt={song.name} 
                      style={{ 
                        width: '100%', 
                        height: 'auto', 
                        borderRadius: '12px',
                        marginBottom: '15px',
                        objectFit: 'cover',
                        maxHeight: '200px',
                      }} 
                    />
                    <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#333' }}>
                      {song.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {Array.isArray(song.artists) ? song.artists.map((artist) => artist.name).join(', ') : song.artists}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="h6" align="center">No songs available</Typography>
          )}
        </Grid>
        {currentSong && (
          <Box sx={{ position: 'fixed', bottom: 20, left: 0, right: 0, zIndex: 1300 }}>
            <CustomAudioPlayer
              currentSong={currentSong}
              songInfo={currentSongInfo}
              onNext={handleNextSong}
              onPrevious={handlePreviousSong}
            />
          </Box>
        )}
      </Container>

      {/* Snackbar for user feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default HomePage;
