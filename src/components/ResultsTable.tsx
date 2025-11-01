import React from 'react';
import { Customer, ResultFieldConfig } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

interface ResultsTableProps {
  customers: Customer[];
  fieldConfig: ResultFieldConfig[];
  isLoading: boolean;
  error: string | null;
  hasSearched: boolean;
}

/**
 * Configuration-driven results table component
 * Displays customer data based on the provided field configuration
 */
export const ResultsTable: React.FC<ResultsTableProps> = ({
  customers,
  fieldConfig,
  isLoading,
  error,
  hasSearched,
}) => {
  // Sort fields by renderOrder
  const sortedFields = [...fieldConfig].sort(
    (a, b) => a.renderOrder - b.renderOrder
  );

  // Loading state
  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin mb-4" />
            <p>Searching for customers...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Error state
  if (error) {
    return (
      <Card className="border-destructive">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center py-12 text-destructive">
            <AlertCircle className="h-8 w-8 mb-4" />
            <p className="font-semibold">Error</p>
            <p className="text-sm mt-2">{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // No search performed yet
  if (!hasSearched) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <Search className="h-8 w-8 mb-4" />
            <p>Enter search criteria above to find customers</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // No results found
  if (customers.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <AlertCircle className="h-8 w-8 mb-4" />
            <p className="font-semibold">No customers found</p>
            <p className="text-sm mt-2">Try adjusting your search criteria</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Results table
  return (
    <Card>
      <CardHeader>
        <CardTitle>Search Results</CardTitle>
        <CardDescription>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span>
              Found {customers.length} customer{customers.length !== 1 ? 's' : ''}
            </span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {sortedFields.map((field) => (
                  <TableHead key={field.key}>{field.label}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  {sortedFields.map((field) => (
                    <TableCell key={`${customer.id}-${field.key}`}>
                      {field.formatter ? field.formatter(customer) : ''}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

// Import Search icon from lucide-react (missed in initial import)
import { Search } from 'lucide-react';
