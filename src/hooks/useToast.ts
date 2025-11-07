import { useState, useCallback } from 'react';

interface ToastData {
    id: string;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    duration?: number;
}

export const useToast = () => {
    const [toasts, setToasts] = useState<ToastData[]>([]);

    const showToast = useCallback((message: string, type: ToastData['type'], duration = 5000) => {
        const id = Date.now().toString();
        const newToast: ToastData = { id, message, type, duration };

        setToasts(prev => [...prev, newToast]);

        // Auto-remove après la durée spécifiée
        setTimeout(() => {
            setToasts(prev => prev.filter(toast => toast.id !== id));
        }, duration + 300); // +300ms pour l'animation
    }, []);

    const removeToast = useCallback((id: string) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);

    const showSuccess = useCallback((message: string, duration?: number) => {
        showToast(message, 'success', duration);
    }, [showToast]);

    const showError = useCallback((message: string, duration?: number) => {
        showToast(message, 'error', duration);
    }, [showToast]);

    const showWarning = useCallback((message: string, duration?: number) => {
        showToast(message, 'warning', duration);
    }, [showToast]);

    const showInfo = useCallback((message: string, duration?: number) => {
        showToast(message, 'info', duration);
    }, [showToast]);

    return {
        toasts,
        showSuccess,
        showError,
        showWarning,
        showInfo,
        removeToast,
    };
};