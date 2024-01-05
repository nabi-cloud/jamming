import React from 'react';

import './Track.css';
import audioIcon from './sound-bars.gif';
import spotifyIcon from './spotify-icon.png';

function Track({ track, onAdd, isRemoval, onRemove, onPlayPreview, isPlaying }) {
    const playAction = () => {
        return isPlaying === track.id ? <img className='sound-bar' src={ audioIcon } alt='Playing' /> :
        <i className="fa-solid fa-play" onClick={ playPreview }></i>;
    };

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

    // Method to play audio preview of the track
    const playPreview = () => {
        onPlayPreview(track.id);
    };

    return (
        <div className="Track">
            <div className='playAction'>
                { playAction() }
            </div>
            <div>
                <a href={ track.albumUrl } target='_blank' rel='noreferrer' >
                    <img className='Track-image'
                        alt={ track.name }
                        src={ track.image }
                    />
                </a>
            </div>
            <div className="Track-information">
                <h3 style={{ color: isPlaying === track.id ? '#60E1E0' : '' }}>{track.name}</h3>
                <div className='subcontainer'>
                    <a href={ track.trackUrl } target='_blank' rel='noreferrer' ><img className='spotifyIcon' src={ spotifyIcon } alt='Spotify' /></a>
                    <p>
                        <a href={ track.albumUrl } target='_blank' rel='noreferrer' >{track.artist}</a> | <a href={ track.artistUrl } target='_blank' rel='noreferrer'>{track.album}</a>
                    </p>
                </div>
            </div>
            { renderAction() }
        </div>
    );
};

export default Track;
