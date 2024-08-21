import axios from 'axios';

const clientId = 'dfecf71217a549eea9c3e130bd92ca75';
const clientSecret = '4e65dfd3a8d74d97a4d48ce82b43f703';
let token = null;

async function getAccessToken() {
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      Authorization: 'Basic ' + btoa(clientId + ':' + clientSecret),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: 'grant_type=client_credentials'
  };

  try {
    const response = await axios.post(authOptions.url, authOptions.data, { headers: authOptions.headers });
    token = response.data.access_token;
    return token;
  } catch (error) {
    console.error('Failed to get access token', error);
  }
}

async function fetchWebApi(endpoint, method, body) {
  if (!token) {
    await getAccessToken();
  }

  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body: body ? JSON.stringify(body) : null,
  });
  
  return await res.json();
}

async function searchArtists(artistQuery) {
  return fetchWebApi(
    `v1/search?q=${encodeURIComponent(artistQuery)}&type=artist&limit=10`,
    'GET'
  );
}

async function searchSongs(songQuery) {
  return fetchWebApi(
    `v1/search?q=${encodeURIComponent(songQuery)}&type=track&limit=50`,
    'GET'
  );
}

// Fetch popular tracks for the homepage
async function fetchPopularTracks() {
  try {
    const playlistId = '15GDExq4ZYGZSq6ujLllc1'; // Playlist ID for top tracks in Nigeria
    const response = await fetchWebApi(`v1/playlists/${playlistId}/tracks?limit=100`, 'GET');
    
    if (!response || !response.items) {
      throw new Error('Invalid response structure');
    }
    
    // Extract tracks from the response
    const tracks = response.items.map(item => item.track);

    return tracks.map(track => {
      const album = track.album || {}; // Default to empty object if album is undefined
      const images = album.images || []; // Default to empty array if images is undefined
      
      return {
        id: track.id,
        name: track.name,
        preview_url: track.preview_url,
        albumArt: images[0]?.url || 'https://example.com/default-image.jpg', // Provide a default image URL
        artists: track.artists.map(artist => artist.name).join(', '),
      };
    });
  } catch (error) {
    console.error('Error in fetchPopularTracks:', error);
    return [];
  }
}


// Function to get random songs from popular tracks
const getRandomSongs = async () => {
  try {
    const response = await fetchPopularTracks();
    
    // Extract tracks from the response
    const tracks = response.albums.items.flatMap(album => album.tracks.items);

    // Shuffle and select a subset if needed
    const shuffledTracks = tracks.sort(() => 0.5 - Math.random()); // Shuffle array
    return shuffledTracks.slice(0, 20); // Return a subset of random tracks
  } catch (error) {
    console.error('Failed to fetch random songs', error);
    return []; // Return an empty array on error
  }
};

export { fetchWebApi, searchArtists, searchSongs, fetchPopularTracks, getRandomSongs };
