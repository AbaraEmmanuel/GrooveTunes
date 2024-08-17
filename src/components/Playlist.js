import React, { useEffect, useState } from 'react';
import { Container, Typography, AppBar, Toolbar, Button, Box, Grid, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import CustomAudioPlayer from './CustomAudioPlayer';
import { fetchUserPlaylist, removeSongFromPlaylist } from '../services/playlistService';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook

const Playlist = () => {
  const [songs, setSongs] = useState([]);
  const [playingSongId, setPlayingSongId] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [currentSongInfo, setCurrentSongInfo] = useState(null);
  const { logout } = useAuth(); // Use the logout function from context

  useEffect(() => {
    const loadPlaylist = async () => {
      try {
        const playlistSongs = await fetchUserPlaylist();
        setSongs(playlistSongs);
      } catch (error) {
        console.error('Error loading playlist:', error);
      }
    };
    loadPlaylist();
  }, []);

  const handlePlaySong = (song) => {
    const previewUrl = song.preview_url || '';
    const albumArt = song.albumArt || 'default-image-url';
    setCurrentSong(previewUrl);
    setCurrentSongInfo({ 
      name: song.name || 'Unknown Song', 
      albumArt: albumArt 
    });
    setPlayingSongId(song.id);
  };

  const handleRemoveFromPlaylist = async (songId) => {
    try {
      await removeSongFromPlaylist(songId);
      setSongs(prevSongs => prevSongs.filter(song => song.id !== songId));
      if (songId === playingSongId) {
        setPlayingSongId(null);
        setCurrentSong(null);
        setCurrentSongInfo(null);
      }
    } catch (error) {
      console.error('Error removing song from playlist:', error);
    }
  };

  const handleSongEnd = () => {
    setPlayingSongId(null);
    setCurrentSong(null);
    setCurrentSongInfo(null);
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#1DB954' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Online Music Player
          </Typography>
          <Box>
            <Button color="inherit" component={Link} to="/playlist">Playlist</Button>
            <Button color="inherit" component={Link} to="/search">Search</Button>
            <Button color="inherit" onClick={() => logout()} sx={{ marginLeft: 2 }}> {/* Logout button */}
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#1DB954' }}>
          Your Playlist
        </Typography>
        <Grid container spacing={4}>
          {songs.map(song => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={song.id}>
              <Card sx={{ borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div" noWrap sx={{ fontWeight: 'bold', color: '#333' }}>
                    {song.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 2, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                    {song.artists && song.artists.length > 0
                      ? song.artists.map(artist => artist.name).join(', ')
                      : 'Unknown Artist'}
                  </Typography>
                  <Box mt={2} display="flex" alignItems="center">
                    <img src={song.albumArt || 'default-image-url'} alt={song.name} style={{ width: '60px', height: '60px', borderRadius: '8px', marginRight: '15px', objectFit: 'cover' }} />
                    <Box>
                      <Button variant="contained" color="primary" onClick={() => handlePlaySong(song)} sx={{ mr: 1 }}>
                        Play
                      </Button>
                      <Button variant="contained" color="secondary" onClick={() => handleRemoveFromPlaylist(song.id)}>
                        Remove
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        {currentSong && (
          <Box sx={{ position: 'fixed', bottom: 20, left: 0, right: 0, zIndex: 1300 }}>
            <CustomAudioPlayer currentSong={currentSong} songInfo={currentSongInfo} onSongEnd={handleSongEnd} />
          </Box>
        )}
      </Container>
    </>
  );
};

export default Playlist;
