import React, { useState } from 'react';
import { SearchFieldsConfig, SearchCriteria } from '@/types';
import { FormField } from '@/components/FormField';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, X } from 'lucide-react';

interface SearchFormProps {
  config: SearchFieldsConfig;
  onSearch: (criteria: SearchCriteria) => void;
  onClear: () => void;
  isLoading?: boolean;
}

/**
 * Configuration-driven search form component
 * Dynamically renders fields based on the provided configuration
 */
export const SearchForm: React.FC<SearchFormProps> = ({
  config,
  onSearch,
  onClear,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<SearchCriteria>({});

  // Sort fields by renderOrder
  const sortedFields = Object.entries(config).sort(
    ([, a], [, b]) => a.renderOrder - b.renderOrder
  );

  const handleFieldChange = (fieldKey: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldKey]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(formData);
  };

  const handleClear = () => {
    setFormData({});
    onClear();
  };

  const hasValues = Object.values(formData).some((value) => value && value.trim() !== '');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Search Customers</CardTitle>
        <CardDescription>
          Enter search criteria to find customers. All fields are optional.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedFields.map(([fieldKey, fieldConfig]) => (
              <FormField
                key={fieldKey}
                fieldKey={fieldKey}
                config={fieldConfig}
                value={formData[fieldKey] || ''}
                onChange={handleFieldChange}
              />
            ))}
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={isLoading}>
              <Search className="mr-2 h-4 w-4" />
              {isLoading ? 'Searching...' : 'Search'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleClear}
              disabled={!hasValues && !isLoading}
            >
              <X className="mr-2 h-4 w-4" />
              Clear Filters
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
