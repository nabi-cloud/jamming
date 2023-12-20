import React from 'react';

import './Track.css';

function Track({ track, onAdd, isRemoval }) {

    // Change sign whether track is added or not
    const renderAction = () => {
        return isRemoval ? <button className="Track-action" onClick={ addTrack }>-</button>
        : <button className="Track-action" onClick={ addTrack }>+</button>
    };

    // Method to add track in the playlist
    const addTrack = () => {
        onAdd(track);
    };

    return (
        <div className="Track">
            <div className="Track-information">
                <h3>{track.name}</h3>
                <p>{track.album.name} | {track.artists[0].name}</p>
            </div>
            { renderAction() }
        </div>
    );
};

export default Track;
