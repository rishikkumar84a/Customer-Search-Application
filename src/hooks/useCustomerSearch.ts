import { useState, useCallback } from 'react';
import { Customer, SearchCriteria } from '@/types';
import { searchCustomers } from '@/services/customerService';

interface UseCustomerSearchResult {
  customers: Customer[];
  isLoading: boolean;
  error: string | null;
  hasSearched: boolean;
  search: (criteria: SearchCriteria) => Promise<void>;
  clearResults: () => void;
}

/**
 * Custom hook for customer search functionality
 * Manages search state, loading, errors, and results
 */
export const useCustomerSearch = (): UseCustomerSearchResult => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const search = useCallback(async (criteria: SearchCriteria) => {
    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const results = await searchCustomers(criteria);
      setCustomers(results);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      setCustomers([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setCustomers([]);
    setError(null);
    setHasSearched(false);
  }, []);

  return {
    customers,
    isLoading,
    error,
    hasSearched,
    search,
    clearResults,
  };
};
