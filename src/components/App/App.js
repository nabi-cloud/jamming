import React, { useState } from 'react';

import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

import { Spotify } from '../../utils/Spotify';

function App() {
    const [playlistTracks, setPlaylistTracks] = useState([]);
    const [playlistName, setPlaylistName] = useState('My Playlist');
    const [searchResults, setSearchResults] = useState([]);

    // Method to add tracks into Playlist
    const addTrack = (trackToAdd) => {
        let isTrackAdded = playlistTracks.some((track) => track.id === trackToAdd.id);

        // Check whether track is already added to Playlist
        if (!isTrackAdded) {
            // If the track is not already in the playlistTracks, add it
            setPlaylistTracks((prevTracks) => [...prevTracks, trackToAdd]);
        } else {
            alert(`${trackToAdd.name} is already in your playlist`);
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

        // Request to Spotify API
        try {
            Spotify.savePlaylist(playlistName, trackUris)
            .then(() => {
                setPlaylistName('My Playlist');
                setPlaylistTracks([]);
            })

        } catch (error) {
            console.log(error);
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

    return (
        <div>
            <h1>Ja<span className="highlight">mm</span>ing</h1>
            <div className="App">
                <SearchBar
                    onSearch={ search }
                />
                <div className="App-playlist">
                    <SearchResults
                        tracks={ searchResults }
                        onAdd={ addTrack }
                    />
                    <Playlist
                        tracks={ playlistTracks }
                        onRemove={ removeTrack }
                        onNameChange={ updatePlaylistName }
                        playlistName={ playlistName }
                        onSave={ savePlaylist }
                    />
                </div>
            </div>
        </div>
    );
};

export default App;
