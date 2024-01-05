import React from 'react';

import './MessageBox.css';
import errorIcon from './error-icon.gif';
import successIcon from './success-icon.gif';

function MessageBox({ type, message }) {
    const getIcon = () => {
        switch (type) {
            case 'success':
                return successIcon;
            case 'error':
                return errorIcon;
            default:
                return null;
        }
    };

    return (
        <div className={`MessageBox ${type}`}>
            <img src={ getIcon() } alt={ type === 'success' ? 'Success' : 'Error' } />
            <p>{message}</p>
        </div>
    );
};

export default MessageBox;
