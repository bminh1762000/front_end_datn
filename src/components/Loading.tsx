import React from 'react';
import './Loading.scss';

const Loading = () => {
    return (
        <div className="loading-overlay">
            <div className="loading">
                <div className="spinner"></div>
                <p>Loading...</p>
            </div>
        </div>
    );
};

export default Loading;
