import React from 'react';

import './Tracklist.css';
import Track from '../Track/Track';

function Tracklist({ tracks, onAdd }) {
    return (
        <div className="TrackList">
            {
                tracks && tracks.map(track => {
                    return (
                        <Track
                            track={ track }
                            id={ track.id }
                            onAdd={ onAdd }
                        />
                    );
                })
            }
        </div>
    );
};

export default Tracklist;
