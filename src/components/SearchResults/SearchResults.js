import React from 'react';

import './SearchResults.css';
import Tracklist from '../Tracklist/Tracklist';

function SearchResults({ tracks, onAdd }) {
    return (
        <div className="SearchResults">
            <h2>Results</h2>
            <Tracklist
                tracks={ tracks }
                onAdd={ onAdd }
                isRemoval={ false }
            />
        </div>
    );
};

export default SearchResults;
