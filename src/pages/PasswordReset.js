// src/pages/PasswordReset.js

import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent!");
      setTimeout(() => navigate("/login"), 3000); // Redirect after 3 seconds
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <Typography variant="h4">Reset Password</Typography>
      {message && <Typography color="success">{message}</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handlePasswordReset}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />
        <Button variant="contained" color="primary" type="submit">
          Reset Password
        </Button>
      </form>
    </div>
  );
};

export default PasswordReset;
