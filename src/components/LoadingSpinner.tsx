import React from 'react';

interface LoadingSpinnerProps {
    size?: 'small' | 'medium' | 'large';
    message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'medium', message }) => {
    return (
        <div className={`loading-spinner-container ${size}`}>
            <div className="loading-spinner-wrapper">
                <div className="loading-spinner">
                    <div className="spinner-ring"></div>
                    <div className="spinner-ring"></div>
                    <div className="spinner-ring"></div>
                </div>
                {message && <p className="loading-message">{message}</p>}
            </div>
        </div>
    );
};

export default LoadingSpinner;