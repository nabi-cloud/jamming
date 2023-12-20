import React, { useState } from 'react';

import { tracks } from './responseSample';
import { playlist } from './playlistSample';

import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

function App() {
    const [playlistTracks, setPlaylistTracks] = useState([]);

    // Method to add tracks into Playlist
    const addTrack = (trackToAdd) => {
        let isTrackAdded = playlistTracks.some((track) => track.id === trackToAdd.id);

        // Check whether track is already added to Playlist
        if (!isTrackAdded) {
            // If the track is not already in the playlistTracks, add it
            setPlaylistTracks((prevTracks) => [...prevTracks, trackToAdd]);
            alert(`Added track with id ${trackToAdd.id} to playlistTracks`);
        } else {
            alert(`Track with id ${trackToAdd.id} is already in playlistTracks`);
        }
    };

    return (
        <div>
            <h1>Ja<span className="highlight">mm</span>ing</h1>
            <div className="App">
                <SearchBar />
                <div className="App-playlist">
                    <SearchResults
                        tracks={tracks.items}
                        onAdd={ addTrack }
                    />
                    <Playlist
                        tracks={playlist.tracks}
                    />
                </div>
            </div>
        </div>
    );
};

export default App;
