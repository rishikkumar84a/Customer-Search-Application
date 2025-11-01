import { Customer, SearchCriteria } from '@/types';

const API_BASE_URL = 'http://localhost:3001';

/**
 * Search for customers based on criteria
 * Fetches all customers and filters client-side for better flexibility
 */
export const searchCustomers = async (
  criteria: SearchCriteria
): Promise<Customer[]> => {
  try {
    // Fetch all customers
    const response = await fetch(`${API_BASE_URL}/customers`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const allCustomers: Customer[] = await response.json();
    console.log('🔍 Total customers fetched:', allCustomers.length);
    console.log('🔍 Search criteria:', criteria);
    
    // Filter customers based on criteria (client-side)
    const filteredCustomers = allCustomers.filter((customer) => {
      // Check each criterion
      for (const [key, value] of Object.entries(criteria)) {
        if (!value || value.trim() === '') {
          continue; // Skip empty criteria
        }

        const searchValue = value.toLowerCase().trim();

        // Handle different field types
        if (key === 'firstName') {
          if (!customer.firstName.toLowerCase().includes(searchValue)) {
            return false;
          }
        } else if (key === 'lastName') {
          if (!customer.lastName.toLowerCase().includes(searchValue)) {
            return false;
          }
        } else if (key === 'dateOfBirth') {
          // Handle date matching - support both formats
          const customerDate = customer.dateOfBirth; // Format: "1985-03-15"
          const searchDate = value; // User input
          
          // Direct match
          if (customerDate === searchDate) {
            continue; // Match found, check next criterion
          }
          
          // Try converting formats (DD-MM-YYYY to YYYY-MM-DD)
          const datePattern = /^(\d{2})-(\d{2})-(\d{4})$/;
          const match = searchDate.match(datePattern);
          if (match) {
            const [, day, month, year] = match;
            const convertedDate = `${year}-${month}-${day}`;
            if (customerDate === convertedDate) {
              continue; // Match found
            }
          }
          
          return false; // No match
        } else {
          // Generic field matching
          const customerValue = (customer as any)[key];
          if (customerValue && typeof customerValue === 'string') {
            if (!customerValue.toLowerCase().includes(searchValue)) {
              return false;
            }
          }
        }
      }
      return true; // All criteria matched
    });

    console.log('✅ Filtered customers:', filteredCustomers.length);
    if (filteredCustomers.length > 0) {
      console.log('✅ Found customers:', filteredCustomers.map(c => `${c.firstName} ${c.lastName}`));
    }
    
    return filteredCustomers;
  } catch (error) {
    console.error('❌ Search error:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to fetch customers: ${error.message}`);
    }
    throw new Error('Failed to fetch customers');
  }
};

/**
 * Fetch all customers (useful for initial load or testing)
 */
export const getAllCustomers = async (): Promise<Customer[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/customers`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: Customer[] = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch customers: ${error.message}`);
    }
    throw new Error('Failed to fetch customers');
  }
};

/**
 * Get a single customer by ID
 */
export const getCustomerById = async (id: string): Promise<Customer> => {
  try {
    const response = await fetch(`${API_BASE_URL}/customers/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: Customer = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch customer: ${error.message}`);
    }
    throw new Error('Failed to fetch customer');
  }
};
