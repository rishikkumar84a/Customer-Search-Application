import { Customer, SearchConfig } from '@/types';

/**
 * Configuration-driven search system
 * 
 * This configuration object defines:
 * 1. Search form fields (what inputs to render)
 * 2. Result table columns (what data to display)
 * 
 * To add a new search field:
 * 1. Add it to the 'fields' object with appropriate configuration
 * 2. Optionally add it to 'resultFields' if you want it in the results table
 */
export const searchConfig: SearchConfig = {
  // Search form field definitions
  fields: {
    firstName: {
      uiType: 'input',
      label: 'First Name',
      placeholder: 'Enter first name',
      renderOrder: 1,
    },
    lastName: {
      uiType: 'input',
      label: 'Last Name',
      placeholder: 'Enter last name',
      renderOrder: 2,
    },
    dateOfBirth: {
      uiType: 'date',
      label: 'Date of Birth',
      renderOrder: 3,
    },
  },

  // Result table column definitions
  resultFields: [
    {
      key: 'name',
      label: 'Full Name',
      renderOrder: 1,
      formatter: (customer: Customer) => 
        `${customer.firstName} ${customer.lastName}`,
    },
    {
      key: 'dateOfBirth',
      label: 'Date of Birth',
      renderOrder: 2,
      formatter: (customer: Customer) => {
        const date = new Date(customer.dateOfBirth);
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      },
    },
    {
      key: 'primaryPhone',
      label: 'Primary Phone',
      renderOrder: 3,
      formatter: (customer: Customer) => {
        const primaryPhone = customer.phones.find((p) => p.isPrimary);
        return primaryPhone?.number || 'N/A';
      },
    },
    {
      key: 'primaryEmail',
      label: 'Primary Email',
      renderOrder: 4,
      formatter: (customer: Customer) => {
        const primaryEmail = customer.emails.find((e) => e.isPrimary);
        return primaryEmail?.address || 'N/A';
      },
    },
  ],
};
