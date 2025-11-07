import React, { useEffect, useState } from 'react';

interface ToastProps {
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    duration?: number;
    onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, duration = 5000, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Animation d'entrée
        const showTimer = setTimeout(() => setIsVisible(true), 100);

        // Auto-close
        const closeTimer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 300); // Attendre la fin de l'animation
        }, duration);

        return () => {
            clearTimeout(showTimer);
            clearTimeout(closeTimer);
        };
    }, [duration, onClose]);

    const getIcon = () => {
        switch (type) {
            case 'success': return '✅';
            case 'error': return '❌';
            case 'warning': return '⚠️';
            case 'info': return 'ℹ️';
            default: return 'ℹ️';
        }
    };

    return (
        <div className={`toast toast-${type} ${isVisible ? 'toast-visible' : ''}`}>
            <div className="toast-content">
                <span className="toast-icon">{getIcon()}</span>
                <span className="toast-message">{message}</span>
                <button className="toast-close" onClick={() => setIsVisible(false)}>
                    ×
                </button>
            </div>
        </div>
    );
};

export default Toast;