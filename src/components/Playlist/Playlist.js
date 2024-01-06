import React from 'react';

import './Playlist.css';
import Tracklist from '../Tracklist/Tracklist';
import spotifyIcon from './spotify-icon.png';

function Playlist({ tracks, onRemove, onNameChange, playlistName, onSave, onPlayPreview, isPlaying }) {

    // Event handler on updating playlist name
    const handleChangeName = (event) => {
        onNameChange(event.target.value);
    };

    return (
        <div className="Playlist">
            <div className='input-container'>
                <input
                    {...{
                        placeholder: "My Playlist",
                        onChange: handleChangeName,
                        value: playlistName,
                        id: 'playlistName'
                    }}
                />
                <label htmlFor='playlistName'><i className="fa-solid fa-pen fa-lg"></i></label>
            </div>
            <Tracklist
                {...{
                    tracks,
                    isRemoval: true,
                    onRemove,
                    onPlayPreview,
                    isPlaying
                }}
            />
            <button className="Playlist-save" onClick={ onSave }>SAVE PLAYLIST</button>
            <a className='spotifyLink' href='https://open.spotify.com/' target='_blank' rel='noreferrer'><img className='icon' src={ spotifyIcon } alt='Spotify'  />OPEN SPOTIFY</a>
        </div>
    );
};

export default Playlist;
