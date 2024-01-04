import React from 'react';

import './Playlist.css';
import Tracklist from '../Tracklist/Tracklist';

function Playlist({ tracks, onRemove, onNameChange, playlistName, onSave, onPlayPreview, isPlaying }) {

    // Event handler on updating playlist name
    const handleChangeName = (event) => {
        onNameChange(event.target.value);
    };

    return (
        <div className="Playlist">
            <div className='input-container'>
                <input
                    placeholder="My Playlist"
                    onChange={ handleChangeName }
                    value={ playlistName }
                />
                <label><i class="fa-solid fa-pen fa-lg"></i></label>
            </div>
            <Tracklist
                tracks={ tracks }
                isRemoval={ true }
                onRemove={ onRemove }
                onPlayPreview = { onPlayPreview }
                isPlaying={ isPlaying }
            />
            <button className="Playlist-save" onClick={ onSave }>SAVE TO SPOTIFY</button>
        </div>
    );
};

export default Playlist;
