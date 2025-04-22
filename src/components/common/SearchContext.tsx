import React, { createContext, useState, useContext, useEffect } from 'react';

interface SearchContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

// Create a context with default values
const SearchContext = createContext<SearchContextType>({
  searchTerm: '',
  setSearchTerm: () => {},
});

/**
 * Provider component for the search context
 */
export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Log when search term changes for debugging
  useEffect(() => {
    if (searchTerm) {
      console.log('Search term changed in context:', searchTerm);
    }
  }, [searchTerm]);

  // Force a console log to check when provider is created
  useEffect(() => {
    console.log('SearchProvider initialized');
  }, []);

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};

/**
 * Custom hook to use the search context
 */
export const useSearch = (): SearchContextType => {
  const context = useContext(SearchContext);

  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }

  return context;
};

export default SearchContext;
