import React from 'react';

import './Playlist.css';
import Tracklist from '../Tracklist/Tracklist';

function Playlist({ tracks }) {
    return (
        <div className="Playlist">
            <input placeholder="My Playlist" />
            <Tracklist tracks={ tracks } />
            <button className="Playlist-save">SAVE TO SPOTIFY</button>
        </div>
    );
};

export default Playlist;
