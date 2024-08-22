import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import PasswordReset from './pages/PasswordReset';
import Playlist from './components/Playlist';
import ArtistSearch from './components/ArtistSearch';
import HomePage from './components/HomePage';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reset-password" element={<PasswordReset />} />
          <Route
            path="/playlist"
            element={<PrivateRoute element={<Playlist />} />}
          />
          <Route
            path="/search"
            element={<PrivateRoute element={<ArtistSearch />} />}
          />
          <Route
            path="/homepage"
            element={<PrivateRoute element={<HomePage />} />} 
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
