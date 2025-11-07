import React from 'react';
import { Business } from '../types';

interface BusinessCardProps {
    business: Business;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ business }) => {
    const [imageError, setImageError] = React.useState(false);
    const [imageLoading, setImageLoading] = React.useState(true);

    const handleWebsiteClick = (url: string) => {
        if (url && url !== '') {
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    };

    const handleImageError = () => {
        setImageError(true);
        setImageLoading(false);
    };

    const handleImageLoad = () => {
        setImageLoading(false);
    };

    const formatRating = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={`star ${i < Math.floor(rating) ? 'filled' : i < rating ? 'half' : ''}`}>
                ★
            </span>
        ));
    };

    const formatPhoneNumber = (phone: string) => {
        // Améliorer l'affichage du numéro de téléphone
        return phone.replace(/^\+33/, '0').replace(/(\d{2})(?=\d)/g, '$1 ');
    };

    return (
        <div className="business-card">
            {business.image_url && !imageError && (
                <div className="business-image">
                    {imageLoading && <div className="image-placeholder">📸</div>}
                    <img
                        src={business.image_url}
                        alt={business.name}
                        onError={handleImageError}
                        onLoad={handleImageLoad}
                        style={{ display: imageLoading ? 'none' : 'block' }}
                    />
                </div>
            )}

            {(!business.image_url || imageError) && (
                <div className="business-image no-image">
                    <div className="no-image-placeholder">
                        <span className="no-image-icon">🏢</span>
                        <span className="no-image-text">Aucune image</span>
                    </div>
                </div>
            )}

            <div className="business-content">
                <div className="business-header">
                    <h3 className="business-name">{business.name}</h3>
                    {business.rating > 0 && (
                        <div className="business-rating">
                            <div className="stars">
                                {formatRating(business.rating)}
                            </div>
                            <span className="rating-text">
                                {business.rating}/5 ({business.review_count} avis)
                            </span>
                        </div>
                    )}
                </div>

                <div className="business-info">
                    {business.address && (
                        <div className="info-item">
                            <span className="info-icon">📍</span>
                            <span className="info-text">{business.address}</span>
                        </div>
                    )}

                    {business.phone && (
                        <div className="info-item">
                            <span className="info-icon">📞</span>
                            <a href={`tel:${business.phone}`} className="info-text phone-link">
                                {formatPhoneNumber(business.phone)}
                            </a>
                        </div>
                    )}

                    {business.website && business.website !== '' && (
                        <div className="info-item">
                            <span className="info-icon">🌐</span>
                            <button
                                onClick={() => handleWebsiteClick(business.website)}
                                className="website-button"
                            >
                                Voir le site web
                            </button>
                        </div>
                    )}

                    {business.categories && business.categories.length > 0 && (
                        <div className="info-item">
                            <span className="info-icon">🏷️</span>
                            <div className="categories">
                                {business.categories.map((category, index) => (
                                    <span key={index} className="category-tag">
                                        {category.title}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BusinessCard;