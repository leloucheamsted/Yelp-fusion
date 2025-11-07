import React from 'react';
import { Pagination } from '../types';

interface PaginationComponentProps {
    pagination: Pagination;
    onPageChange: (offset: number) => void;
    loading: boolean;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({
    pagination,
    onPageChange,
    loading
}) => {
    const currentPage = Math.floor(pagination.offset / pagination.limit) + 1;
    const totalPages = Math.ceil(pagination.total / pagination.limit);

    const handlePreviousPage = () => {
        if (pagination.offset > 0) {
            const newOffset = Math.max(0, pagination.offset - pagination.limit);
            onPageChange(newOffset);
        }
    };

    const handleNextPage = () => {
        if (pagination.has_next) {
            const newOffset = pagination.offset + pagination.limit;
            onPageChange(newOffset);
        }
    };

    const handlePageClick = (page: number) => {
        const newOffset = (page - 1) * pagination.limit;
        onPageChange(newOffset);
    };

    const getVisiblePages = () => {
        const pages: number[] = [];
        const maxVisible = 5;

        let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let end = Math.min(totalPages, start + maxVisible - 1);

        // Ajuster le début si on est près de la fin
        if (end - start < maxVisible - 1) {
            start = Math.max(1, end - maxVisible + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages;
    };

    if (pagination.total <= pagination.limit) {
        return null; // Pas besoin de pagination
    }

    return (
        <div className="pagination-container">
            <div className="pagination-info">
                <p>
                    Affichage de {pagination.offset + 1} à {Math.min(pagination.offset + pagination.limit, pagination.total)}
                    sur {pagination.total} résultats
                </p>
            </div>

            <div className="pagination-controls">
                <button
                    onClick={handlePreviousPage}
                    disabled={pagination.offset === 0 || loading}
                    className="pagination-button pagination-button-prev"
                >
                    ← Précédent
                </button>

                <div className="pagination-pages">
                    {currentPage > 3 && (
                        <>
                            <button
                                onClick={() => handlePageClick(1)}
                                disabled={loading}
                                className="pagination-button"
                            >
                                1
                            </button>
                            {currentPage > 4 && <span className="pagination-ellipsis">...</span>}
                        </>
                    )}

                    {getVisiblePages().map(page => (
                        <button
                            key={page}
                            onClick={() => handlePageClick(page)}
                            disabled={loading}
                            className={`pagination-button ${page === currentPage ? 'active' : ''}`}
                        >
                            {page}
                        </button>
                    ))}

                    {currentPage < totalPages - 2 && (
                        <>
                            {currentPage < totalPages - 3 && <span className="pagination-ellipsis">...</span>}
                            <button
                                onClick={() => handlePageClick(totalPages)}
                                disabled={loading}
                                className="pagination-button"
                            >
                                {totalPages}
                            </button>
                        </>
                    )}
                </div>

                <button
                    onClick={handleNextPage}
                    disabled={!pagination.has_next || loading}
                    className="pagination-button pagination-button-next"
                >
                    Suivant →
                </button>
            </div>
        </div>
    );
};

export default PaginationComponent;