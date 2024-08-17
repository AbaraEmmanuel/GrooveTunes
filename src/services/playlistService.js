import { getFirestore, doc, setDoc, getDoc, collection, getDocs, deleteDoc } from 'firebase/firestore';
import { auth } from '../firebase';

const db = getFirestore();

export const addSongToPlaylist = async (song) => {
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated');

  const userId = user.uid;
  const playlistId = 'defaultPlaylist'; // Replace with actual playlist ID if needed

  try {
    const songRef = doc(db, 'users', userId, 'playlists', playlistId, 'songs', song.id);
    const songData = {
      id: song.id,
      name: song.name,
      artists: song.artists.map(artist => artist.name),
      albumArt: song.album.images[0]?.url || '',  // Adding album art URL if available
      preview_url: song.preview_url,  // Add preview_url for playback
    };
    await setDoc(songRef, songData);
    console.log('Song added to playlist:', songData);
  } catch (error) {
    console.error('Error adding song to playlist:', error);
    throw error;
  }
};

export const fetchUserPlaylist = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated');

  const userId = user.uid;
  const playlistId = 'defaultPlaylist'; // Replace with actual playlist ID if needed

  try {
    const playlistRef = collection(db, 'users', userId, 'playlists', playlistId, 'songs');
    const snapshot = await getDocs(playlistRef);
    const songs = snapshot.docs.map(doc => doc.data());
    console.log('Fetched songs from playlist:', songs);
    return songs;
  } catch (error) {
    console.error('Error fetching user playlist:', error);
    throw error;
  }
};

export const removeSongFromPlaylist = async (songId) => {
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated');

  const userId = user.uid;
  const playlistId = 'defaultPlaylist'; // Replace with actual playlist ID if needed

  try {
    const songRef = doc(db, 'users', userId, 'playlists', playlistId, 'songs', songId);
    await deleteDoc(songRef);
    console.log('Song removed from playlist:', songId);
  } catch (error) {
    console.error('Error removing song from playlist:', error);
    throw error;
  }
};
