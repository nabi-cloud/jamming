import React from 'react';

import './SearchResults.css';
import Tracklist from '../Tracklist/Tracklist';

function SearchResults({ tracks, onAdd, onPlayPreview, isPlaying, playlistTracks }) {
    const fileredResults = tracks.filter(track => !playlistTracks.some(playlistTrack => playlistTrack.id === track.id));

    return (
        <div className="SearchResults">
            <h2>Results</h2>
            <Tracklist
                tracks={ fileredResults }
                onAdd={ onAdd }
                isRemoval={ false }
                onPlayPreview = { onPlayPreview }
                isPlaying={ isPlaying }
            />
        </div>
    );
};

export default SearchResults;
