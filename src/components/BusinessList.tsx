import React from 'react';
import { Business } from '../types';
import BusinessCard from './BusinessCard';
import LoadingSpinner from './LoadingSpinner';

interface BusinessListProps {
    businesses: Business[];
    loading: boolean;
    error: string | null;
    onRetry?: () => void;
}

const BusinessList: React.FC<BusinessListProps> = ({ businesses, loading, error, onRetry }) => {
    if (loading) {
        return (
            <div className="business-list-container">
                <div className="loading-container">
                    <LoadingSpinner
                        size="large"
                        message="🔍 Recherche d'entreprises en cours..."
                    />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="business-list-container">
                <div className="error-container">
                    <div className="error-icon">⚠️</div>
                    <h3>Oups ! Une erreur s'est produite</h3>
                    <p className="error-message">{error}</p>
                    {onRetry && (
                        <button onClick={onRetry} className="retry-button">
                            🔄 Réessayer
                        </button>
                    )}
                    <div className="error-tips">
                        <h4>💡 Suggestions :</h4>
                        <ul>
                            <li>Vérifiez votre connexion internet</li>
                            <li>Essayez avec une autre recherche</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

    if (businesses.length === 0) {
        return (
            <div className="business-list-container">
                <div className="empty-container">
                    <div className="empty-icon">🔍</div>
                    <h3>Aucun résultat</h3>
                    <p>Aucune entreprise trouvée pour votre recherche.</p>
                    <p>Essayez avec d'autres mots-clés ou une autre localisation.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="business-list-container">
            <div className="results-header">
                <h2>Résultats de recherche</h2>
                <p>{businesses.length} entreprise{businesses.length > 1 ? 's' : ''} trouvée{businesses.length > 1 ? 's' : ''}</p>
            </div>

            <div className="business-list">
                {businesses.map((business, index) => (
                    <BusinessCard
                        key={business.yelp_id || index}
                        business={business}
                    />
                ))}
            </div>
        </div>
    );
};

export default BusinessList;