import React from 'react';

import './Tracklist.css';
import Track from '../Track/Track';

function Tracklist({ tracks, onAdd, isRemoval, onRemove, onPlayPreview, isPlaying }) {
    return (
        <div className="TrackList">
            {
                tracks && tracks.map(track => {
                    return (
                        <Track
                            key={ track.id }
                            {...{ track, onAdd, onRemove, isRemoval, onPlayPreview, isPlaying }}
                        />
                    );
                })
            }
        </div>
    );
};

export default Tracklist;
