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
    body: JSON.stringify(body),
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
    `v1/search?q=${encodeURIComponent(songQuery)}&type=track&limit=10`,
    'GET'
  );
}

export { fetchWebApi, searchArtists, searchSongs };
