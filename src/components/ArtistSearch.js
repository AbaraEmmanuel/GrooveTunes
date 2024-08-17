import React, { useState } from 'react';
import { TextField, Button, Container, Grid, Card, CardContent, Typography, CardActionArea, AppBar, Toolbar, IconButton, Box } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import CustomAudioPlayer from './CustomAudioPlayer'; // Ensure this matches the exact filename
import { searchSongs } from '../services/spotifyApi';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { addSongToPlaylist } from '../services/playlistService'; // Import the correct function
import { useAuth } from '../context/AuthContext'; // Import useAuth for logout

const ArtistSearch = () => {
  const [songQuery, setSongQuery] = useState('');
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState('');
  const [currentSongInfo, setCurrentSongInfo] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate
  const { logout } = useAuth(); // Use the logout function from context

  const handleSongSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await searchSongs(songQuery);
      setSongs(response.tracks.items);
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  };

  const playSong = (songUrl, songInfo) => {
    setCurrentSong(songUrl);
    setCurrentSongInfo(songInfo);
  };

  const handleAddToPlaylist = async (song) => {
    try {
      await addSongToPlaylist(song); // Use the correct function name
      alert('Song added to playlist!');
    } catch (error) {
      console.error('Error adding song to playlist:', error);
    }
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#1DB954' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate('/playlist')}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Song Search
          </Typography>
          <Box>
            <Button color="inherit" onClick={() => logout()} sx={{ marginLeft: 2 }}> {/* Logout button */}
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <form onSubmit={handleSongSubmit}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={8}>
                  <TextField
                    label="Search for a song"
                    variant="outlined"
                    fullWidth
                    value={songQuery}
                    onChange={(e) => setSongQuery(e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#1DB954',
                        },
                        '&:hover fieldset': {
                          borderColor: '#1DB954',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: '#1DB954',
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Button type="submit" variant="contained" color="primary" sx={{ height: '100%' }}>
                    Search Songs
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>

          <Grid item xs={12} sx={{ mt: 4 }}>
            <Grid container spacing={4}>
              {songs.map((song) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={song.id}>
                  <Card sx={{ borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
                    <CardActionArea onClick={() => playSong(song.preview_url, { name: song.name, albumArt: song.album.images[0].url })}>
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="div" noWrap sx={{ fontWeight: 'bold', color: '#333' }}>
                          {song.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                          {song.artists.map((artist) => artist.name).join(', ')}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ width: '100%', borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent the card click event
                        handleAddToPlaylist(song);
                      }}
                    >
                      Add to Playlist
                    </Button>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        {currentSong && (
          <Box sx={{ position: 'fixed', bottom: 20, left: 0, right: 0, zIndex: 1300 }}>
            <CustomAudioPlayer currentSong={currentSong} songInfo={currentSongInfo} />
          </Box>
        )}
      </Container>
    </>
  );
};

export default ArtistSearch;
