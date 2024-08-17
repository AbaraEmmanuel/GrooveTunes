import React from 'react';
import { Container, Box, Typography, Button, Grid, Paper, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import { MusicNote, Star, PlaylistAdd, PlayCircleOutline } from '@mui/icons-material';

const Home = () => {
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        sx={{ textAlign: 'center' }}
      >
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#1DB954' }}>
          Welcome to GrooveTunes
        </Typography>
        <Typography variant="h5" component="p" gutterBottom sx={{ color: '#333', mb: 4 }}>
          Discover, listen, and enjoy your favorite music with our cutting-edge music player.
        </Typography>
        <Box mb={4}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={Link}
            to="/signup"
            sx={{ marginRight: 2, borderRadius: '8px' }}
          >
            Sign Up
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            component={Link}
            to="/login"
            sx={{ borderRadius: '8px' }}
          >
            Log In
          </Button>
        </Box>
        <Box sx={{ mt: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#1DB954' }}>
            Why GrooveTunes?
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <Paper elevation={3} sx={{ padding: 3, borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <MusicNote sx={{ fontSize: 60, color: '#1DB954' }} />
                <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>
                  Extensive Music Library
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  Explore millions of songs from various genres and artists. Your next favorite track is just a click away!
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper elevation={3} sx={{ padding: 3, borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <PlaylistAdd sx={{ fontSize: 60, color: '#1DB954' }} />
                <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>
                  Create Playlists
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  Build and manage your playlists effortlessly. Create the perfect mix for every mood and occasion.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper elevation={3} sx={{ padding: 3, borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <PlayCircleOutline sx={{ fontSize: 60, color: '#1DB954' }} />
                <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>
                  Seamless Playback
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  Enjoy smooth and uninterrupted playback with our high-quality audio streaming technology.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
