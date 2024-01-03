import React from 'react';

import './SearchResults.css';
import Tracklist from '../Tracklist/Tracklist';

function SearchResults({ tracks, onAdd, onPlayPreview, isPlaying }) {
    return (
        <div className="SearchResults">
            <h2>Results</h2>
            <Tracklist
                tracks={ tracks }
                onAdd={ onAdd }
                isRemoval={ false }
                onPlayPreview = { onPlayPreview }
                isPlaying={ isPlaying }
            />
        </div>
    );
};

export default SearchResults;
