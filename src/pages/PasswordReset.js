import React, { useState } from 'react';
import { Container, TextField, Button, Box, Typography, Paper, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent!');
      setTimeout(() => navigate('/login'), 3000); // Redirect after 3 seconds
    } catch (err) {
      setError('Failed to send password reset email. Please try again.');
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 8, mb: 4 }}>
      <Paper elevation={3} sx={{ padding: 4, borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ color: '#1DB954' }}>
          Reset Password
        </Typography>
        {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <form onSubmit={handlePasswordReset}>
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
          </Box>
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, borderRadius: '8px' }}>
            Reset Password
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default PasswordReset;
