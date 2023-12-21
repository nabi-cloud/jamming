import React from 'react';

import './Playlist.css';
import Tracklist from '../Tracklist/Tracklist';

function Playlist({ tracks, onRemove, onNameChange, playlistName }) {

    // Event handler on updating playlist name
    const handleChangeName = (event) => {
        onNameChange(event.target.value);
    };

    return (
        <div className="Playlist">
            <input
                placeholder="My Playlist"
                onChange={ handleChangeName }
                value={ playlistName }
            />
            <Tracklist
                tracks={ tracks }
                isRemoval={ true }
                onRemove={ onRemove }
            />
            <button className="Playlist-save">SAVE TO SPOTIFY</button>
        </div>
    );
};

export default Playlist;
