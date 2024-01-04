import React from 'react';

import './Track.css';
import audioIcon from './sound-bars.gif';

function Track({ track, onAdd, isRemoval, onRemove, onPlayPreview, isPlaying }) {
    // Change sign whether track is added or not
    const renderAction = () => {
        if (isRemoval) {
            return (
                isPlaying === track.id ? <img className='sound-bar' src={ audioIcon } alt='Playing' /> :
                <button className="Track-action" onClick={ removeTrack }>-</button>
            );
        } else {
            return (
                isPlaying === track.id ? <img className='sound-bar' src={ audioIcon } alt='Playing' /> :
                <button className="Track-action" onClick={ addTrack }>+</button>
            );
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

    // Method to play audio preview of the track
    const playPreview = () => {
        onPlayPreview(track.id);
    };

    return (
        <div className="Track">
            <div>
                <img className='Track-image'
                    alt={ track.name }
                    src={ track.image }
                    onClick={ playPreview }
                />
            </div>
            <div className="Track-information">
                <h3 style={{ color: isPlaying === track.id ? '#60E1E0' : '' }}>{track.name}</h3>
                <p>{track.artist} | {track.album}</p>
            </div>
            { renderAction() }
        </div>
    );
};

export default Track;
