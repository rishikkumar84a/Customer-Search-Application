import React from 'react';
import { SearchForm } from '@/components/SearchForm';
import { ResultsTable } from '@/components/ResultsTable';
import { useCustomerSearch } from '@/hooks/useCustomerSearch';
import { searchConfig } from '@/config/searchConfig';
import { SearchCriteria } from '@/types';

/**
 * Main search page component
 * Orchestrates the search form and results table using configuration
 */
export const SearchPage: React.FC = () => {
  const { customers, isLoading, error, hasSearched, search, clearResults } =
    useCustomerSearch();

  const handleSearch = async (criteria: SearchCriteria) => {
    await search(criteria);
  };

  const handleClear = () => {
    clearResults();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-foreground">Care247</h1>
          <p className="text-muted-foreground mt-1">Customer Search Application</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Search Form - driven by configuration */}
          <SearchForm
            config={searchConfig.fields}
            onSearch={handleSearch}
            onClear={handleClear}
            isLoading={isLoading}
          />

          {/* Results Table - driven by configuration */}
          <ResultsTable
            customers={customers}
            fieldConfig={searchConfig.resultFields}
            isLoading={isLoading}
            error={error}
            hasSearched={hasSearched}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-12 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 Care247. Configuration-driven customer search application.</p>
        </div>
      </footer>
    </div>
  );
};
