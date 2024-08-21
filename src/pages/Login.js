import React, { useState } from 'react';
import { Container, TextField, Button, Box, Typography, Paper, Grid, Alert } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom'; // Import Link from react-router-dom
import { loginUser } from '../firebaseAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await loginUser(email, password);
      navigate('/homepage'); // Redirect to playlist page on successful login
    } catch (error) {
      setError('Failed to log in. Please check your credentials.');
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 8, mb: 4 }}>
      <Paper elevation={3} sx={{ padding: 4, borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ color: '#1DB954' }}>
          Log In
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <form onSubmit={handleLogin}>
          <Box mb={3}>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, borderRadius: '8px' }}>
            Log In
          </Button>
          <Grid container justifyContent="space-between" sx={{ mt: 2 }}>
            <Grid item>
              <Typography variant="body2">
                <Link to="/reset-password" style={{ textDecoration: 'none', color: '#1DB954' }}>
                  Forgot Password?
                </Link>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">
                Don't have an account?{' '}
                <Link to="/signup" style={{ textDecoration: 'none', color: '#1DB954' }}>
                  Sign Up
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
