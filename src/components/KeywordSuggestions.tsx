import React from 'react';

interface KeywordSuggestionsProps {
    onKeywordClick: (keyword: string) => void;
}

const KeywordSuggestions: React.FC<KeywordSuggestionsProps> = ({ onKeywordClick }) => {
    const suggestions = [
        { category: 'Restaurants & Food', keywords: ['restaurants', 'boulangeries', 'cafés', 'pizzerias', 'bars'] },
        { category: 'Services', keywords: ['coiffeurs', 'pharmacies', 'banques', 'dentistes', 'vétérinaires'] },
        { category: 'Shopping', keywords: ['supermarchés', 'fleuristes', 'librairies', 'bijouteries', 'magasins'] },
        { category: 'Santé & Bien-être', keywords: ['médecins', 'kinés', 'spas', 'salles de sport', 'optiques'] }
    ];

    return (
        <div className="keyword-suggestions">
            <h3>Suggestions de recherche :</h3>
            {suggestions.map((categoryGroup, index) => (
                <div key={index} className="suggestion-group">
                    <h4>{categoryGroup.category}</h4>
                    <div className="keyword-tags">
                        {categoryGroup.keywords.map((keyword, keyIndex) => (
                            <button
                                key={keyIndex}
                                onClick={() => onKeywordClick(keyword)}
                                className="keyword-tag"
                            >
                                {keyword}
                            </button>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default KeywordSuggestions;