import React, { useState } from 'react';
import { SearchParams } from '../types';

interface SearchFormProps {
    onSearch: (params: SearchParams) => void;
    loading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, loading }) => {
    const [term, setTerm] = useState('');
    const [location, setLocation] = useState('');
    const [errors, setErrors] = useState<{ term?: string; location?: string }>({});

    const validateForm = () => {
        const newErrors: { term?: string; location?: string } = {};

        if (!term.trim()) {
            newErrors.term = 'Veuillez préciser ce que vous recherchez';
        } else if (term.trim().length < 2) {
            newErrors.term = 'Le terme de recherche doit contenir au moins 2 caractères';
        }

        if (!location.trim()) {
            newErrors.location = 'Veuillez préciser une localisation';
        } else if (location.trim().length < 2) {
            newErrors.location = 'La localisation doit contenir au moins 2 caractères';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        // Nettoyer les erreurs lors d'une recherche réussie
        setErrors({});

        onSearch({
            term: term.trim(),
            location: location.trim(),
            limit: 10,
            offset: 0,
        });
    };

    const handleTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTerm(e.target.value);
        // Nettoyer l'erreur lors de la saisie
        if (errors.term) {
            setErrors(prev => ({ ...prev, term: undefined }));
        }
    };

    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocation(e.target.value);
        // Nettoyer l'erreur lors de la saisie
        if (errors.location) {
            setErrors(prev => ({ ...prev, location: undefined }));
        }
    };

    const handleKeywordClick = (keyword: string) => {
        setTerm(keyword);
        // Nettoyer l'erreur lors de la sélection d'un mot-clé
        if (errors.term) {
            setErrors(prev => ({ ...prev, term: undefined }));
        }
    };

    return (
        <div className="search-form-navbar">
            <div className="navbar-container">
                <div className="navbar-brand">
                    <h1>🔍 Yelp Search</h1>
                </div>

                <form onSubmit={handleSubmit} className="navbar-form">
                    <div className="form-field">
                        <input
                            type="text"
                            id="term"
                            value={term}
                            onChange={handleTermChange}
                            placeholder="Type d'entreprise (restaurants, coiffeurs, etc.)"
                            disabled={loading}
                            className={`form-input ${errors.term ? 'error' : ''}`}
                            required
                        />
                    </div>

                    <div className="form-field">
                        <input
                            type="text"
                            id="location"
                            value={location}
                            onChange={handleLocationChange}
                            placeholder="Localisation (Paris, Marseille, etc.)"
                            disabled={loading}
                            className={`form-input ${errors.location ? 'error' : ''}`}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className={`search-button ${loading ? 'loading' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Recherche...' : 'Rechercher'}
                    </button>
                </form>

                {!loading && (
                    <div className="suggestions">
                        <span className="suggestions-label">Suggestions:</span>
                        <div className="suggestions-buttons">
                            {['restaurants', 'coiffeurs', 'pharmacies'].map((keyword) => (
                                <button
                                    key={keyword}
                                    type="button"
                                    onClick={() => handleKeywordClick(keyword)}
                                    className="suggestion-button"
                                >
                                    {keyword}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Affichage des erreurs sous la barre */}
            {(errors.term || errors.location) && (
                <div className="navbar-errors">
                    <div className="navbar-errors-container">
                        {errors.term && <p className="error-text">• {errors.term}</p>}
                        {errors.location && <p className="error-text">• {errors.location}</p>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchForm;