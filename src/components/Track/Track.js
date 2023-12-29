import React from 'react';

import './Track.css';

function Track({ track, onAdd, isRemoval, onRemove }) {

    // Change sign whether track is added or not
    const renderAction = () => {
        if (isRemoval) {
            return <button className="Track-action" onClick={ removeTrack }>-</button>;
        } else {
            return <button className="Track-action" onClick={ addTrack }>+</button>;
        }
    };

    // Method to add track in the playlist
    const addTrack = () => {
        onAdd(track);
    };

    // Method to remove track in the playlist
    const removeTrack = () => {
        onRemove(track);
    };

    return (
        <div className="Track">
            <div className="Track-information">
                <h3>{track.name}</h3>
                <p>{track.artist} | {track.album}</p>
            </div>
            { renderAction() }
        </div>
    );
};

export default Track;
