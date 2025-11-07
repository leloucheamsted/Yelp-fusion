import React, { useState } from 'react';
import SearchForm from './components/SearchForm';
import BusinessList from './components/BusinessList';
import PaginationComponent from './components/PaginationComponent';
import ToastContainer from './components/ToastContainer';
import { apiService } from './apiService';
import { Business, SearchParams, Pagination } from './types';
import { useToast } from './hooks/useToast';

function App() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [lastSearchParams, setLastSearchParams] = useState<SearchParams | null>(null);
  const { toasts, showSuccess, showError, removeToast } = useToast();

  const handleSearch = async (searchParams: SearchParams) => {
    setLoading(true);
    setError(null);
    setLastSearchParams(searchParams);

    try {
      const response = await apiService.searchBusinesses(searchParams);
      setBusinesses(response.data);
      setPagination(response.pagination);

      // Toast de succès
      if (response.data.length > 0) {
        showSuccess(`✨ ${response.data.length} entreprise${response.data.length > 1 ? 's' : ''} trouvée${response.data.length > 1 ? 's' : ''} !`);
      }

      // Information sur la sauvegarde
      if (response.saved_to_database && response.saved_to_database > 0) {
        showSuccess(`💾 ${response.saved_to_database} entreprise${response.saved_to_database > 1 ? 's' : ''} sauvegardée${response.saved_to_database > 1 ? 's' : ''} en base de données`);
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur inconnue s\'est produite';
      setError(errorMessage);
      setBusinesses([]);
      setPagination(null);
      showError(errorMessage, 7000); // Toast d'erreur avec durée plus longue
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = async (newOffset: number) => {
    if (!lastSearchParams) return;

    const newSearchParams = {
      ...lastSearchParams,
      offset: newOffset,
    };

    await handleSearch(newSearchParams);
  };

  const handleRetry = () => {
    if (lastSearchParams) {
      handleSearch(lastSearchParams);
    }
  };

  return (
    <div className="App">
      <SearchForm onSearch={handleSearch} loading={loading} />
      
      <div className="main-content">
        <div className="container">
          <BusinessList
            businesses={businesses}
            loading={loading}
            error={error}
            onRetry={handleRetry}
          />

          {pagination && !loading && !error && (
            <PaginationComponent
              pagination={pagination}
              onPageChange={handlePageChange}
              loading={loading}
            />
          )}
        </div>
      </div>

      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
    </div>
  );
}

export default App;
