// Customer data models
export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  maritalStatus: 'Single' | 'Married' | 'Divorced' | 'Widowed';
  secureId: string;
  addresses: Address[];
  phones: Phone[];
  emails: Email[];
}

export interface Address {
  id: string;
  type: 'Home' | 'Business' | 'Mailing';
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface Phone {
  id: string;
  type: 'Mobile' | 'Home' | 'Work';
  number: string;
  isPrimary: boolean;
}

export interface Email {
  id: string;
  type: 'Personal' | 'Work';
  address: string;
  isPrimary: boolean;
}

// Configuration types
export type FieldUIType = 'input' | 'date' | 'select';

export interface FieldConfig {
  uiType: FieldUIType;
  label: string;
  placeholder?: string;
  renderOrder: number;
  options?: Array<{ value: string; label: string }>;
  required?: boolean;
}

export interface SearchFieldsConfig {
  [key: string]: FieldConfig;
}

export interface ResultFieldConfig {
  key: string;
  label: string;
  renderOrder: number;
  formatter?: (customer: Customer) => string;
}

export interface SearchConfig {
  fields: SearchFieldsConfig;
  resultFields: ResultFieldConfig[];
}

// Search criteria type
export interface SearchCriteria {
  [key: string]: string;
}

// API response types
export interface ApiError {
  message: string;
  status?: number;
}
