import React from 'react';
import Toast from './Toast';

interface ToastData {
    id: string;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    duration?: number;
}

interface ToastContainerProps {
    toasts: ToastData[];
    onRemoveToast: (id: string) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemoveToast }) => {
    return (
        <div className="toast-container">
            {toasts.map((toast, index) => (
                <div
                    key={toast.id}
                    style={{
                        position: 'fixed',
                        top: `${20 + index * 80}px`,
                        right: '20px',
                        zIndex: 1000 + index
                    }}
                >
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        duration={toast.duration}
                        onClose={() => onRemoveToast(toast.id)}
                    />
                </div>
            ))}
        </div>
    );
};

export default ToastContainer;