import React, { useState } from 'react';

import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Loader from '../Loader/Loader';
import MessageBox from '../MessageBox/MessageBox';

import { Spotify } from '../../utils/Spotify';

function App() {
    const [playlistTracks, setPlaylistTracks] = useState([]);
    const [playlistName, setPlaylistName] = useState('My Playlist');
    const [searchResults, setSearchResults] = useState([]);
    const [playingAudio, setPlayingAudio] = useState(null);
    const [isPlaying, setIsPlaying] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    // Method to add tracks into Playlist
    const addTrack = (trackToAdd) => {
        let isTrackAdded = playlistTracks.some((track) => track.id === trackToAdd.id);

        // Check whether track is already added to Playlist
        if (!isTrackAdded) {
            // If the track is not already in the playlistTracks, add it
            setPlaylistTracks((prevTracks) => [...prevTracks, trackToAdd]);
        }
    };

    // Method to remove tracks from Playlist
    const removeTrack = (trackToRemove) => {
        const updatedPlaylist = playlistTracks.filter((track) => track.id !== trackToRemove.id);
        setPlaylistTracks(updatedPlaylist);
    };

    // Method to rename playlist
    const updatePlaylistName = (name) => {
        setPlaylistName(name);
    };

    // Method to save playlist to user's account
    const savePlaylist = () => {
        // Generate an array of uri values from the playlistTracks property
        const trackUris = playlistTracks.map(track => track.uri);

        // Set loading to true while saving the playlist
        setIsLoading(true);

        // Request to Spotify API
        try {
            Spotify.savePlaylist(playlistName, trackUris)
            .then(() => {
                setPlaylistName('My Playlist');
                setPlaylistTracks([]);
                showMessage('success', 'Playlist successfully saved!');
            })
            .finally(() => {
                // Set loading to false after the playlist is saved
                setIsLoading(false);
            });

        } catch (error) {
            showMessage('error', 'Please make sure to fill in the playlist name and tracks you would like to add');
            setIsLoading(false);
        }
    };

    // Method to search a track
    const search = (term) => {
        try {
            Spotify.search(term)
            .then(results => {
                setSearchResults(results);
            })
        } catch (error) {
            console.log(error);
        }
    };

    // Method to play track preview
    const playPreview = (id) => {
        function resetAudioState() {
            setPlayingAudio(null);
            setIsPlaying('');
        }

        if (playingAudio) {
            playingAudio.pause();  // Pause the currently playing audio
            setPlayingAudio(null);
            setIsPlaying('');
        }

        try {
            Spotify.getTrackPreview(id)
            .then(previewUrl => {
                if (previewUrl) {
                    const audio = new Audio(previewUrl);

                    audio.addEventListener('ended', resetAudioState);

                    setPlayingAudio(audio);
                    setIsPlaying(id);
                    audio.play();
                } else {
                    console.log('No preview available for this track');
                }
            })
        } catch (error) {
            console.log(error);
        }
    };

    const showMessage = (type, text) => {
        setMessage({ type, text });

        setTimeout(() => {
            closeMessage();
        }, 5000);
    };

    const closeMessage = () => {
        setMessage({ type: '', text: '' });
    };

    return (
        <div>
            {isLoading && <Loader />}
            {message.text && (
                <MessageBox type={message.type} message={message.text} />
            )}

            <h1>Ja<span className="highlight">mm</span>ing</h1>
            <div className="App">
                <SearchBar
                    onSearch={ search }
                />
                <div className="App-playlist">
                    <SearchResults
                        {...{
                            tracks: searchResults,
                            onAdd: addTrack,
                            onPlayPreview: playPreview,
                            isPlaying,
                            playlistTracks,
                        }}
                    />
                    <Playlist
                        {...{
                            tracks: playlistTracks,
                            onRemove: removeTrack,
                            onNameChange: updatePlaylistName,
                            playlistName,
                            onSave: savePlaylist,
                            onPlayPreview: playPreview,
                            isPlaying,
                        }}
                    />
                </div>
            </div>

            <footer className='footer'>
                <span>2023 | <i className="fa-brands fa-github"></i> nabi-cloud</span>
            </footer>
        </div>
    );
};

export default App;
