# 🎓 Configuration Examples - Step-by-Step Guide

This guide provides **copy-paste examples** for extending the Customer Search Application through configuration changes only.

---

## 📝 Table of Contents

1. [Adding a Text Input Field](#1-adding-a-text-input-field)
2. [Adding a Date Field](#2-adding-a-date-field)
3. [Adding a Dropdown (Select) Field](#3-adding-a-dropdown-select-field)
4. [Adding a Required Field](#4-adding-a-required-field)
5. [Adding a Result Column](#5-adding-a-result-column)
6. [Complete Example: Adding Multiple Fields](#6-complete-example-adding-multiple-fields)
7. [Advanced: Custom Data Formatters](#7-advanced-custom-data-formatters)

---

## 1️⃣ Adding a Text Input Field

### Example: Add "Email" Search Field

**File:** `src/config/searchConfig.ts`

```typescript
export const searchConfig: SearchConfig = {
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
    
    // ⭐ ADD THIS NEW FIELD
    email: {
      uiType: 'input',
      label: 'Email Address',
      placeholder: 'Enter email address',
      renderOrder: 4,
    },
  },
  
  resultFields: [
    // ... existing fields
  ],
};
```

**Result:** A new "Email Address" input field appears in the search form!

---

## 2️⃣ Adding a Date Field

### Example: Add "Registration Date" Search Field

```typescript
export const searchConfig: SearchConfig = {
  fields: {
    // ... existing fields
    
    // ⭐ ADD THIS NEW FIELD
    registrationDate: {
      uiType: 'date',
      label: 'Registration Date',
      renderOrder: 5,
    },
  },
  
  resultFields: [
    // ... existing fields
  ],
};
```

**Result:** A date picker appears for searching by registration date!

---

## 3️⃣ Adding a Dropdown (Select) Field

### Example: Add "Marital Status" Dropdown

```typescript
export const searchConfig: SearchConfig = {
  fields: {
    // ... existing fields
    
    // ⭐ ADD THIS NEW FIELD
    maritalStatus: {
      uiType: 'select',
      label: 'Marital Status',
      renderOrder: 4,
      options: [
        { value: 'Single', label: 'Single' },
        { value: 'Married', label: 'Married' },
        { value: 'Divorced', label: 'Divorced' },
        { value: 'Widowed', label: 'Widowed' },
      ],
    },
  },
  
  resultFields: [
    // ... existing fields
  ],
};
```

**Result:** A dropdown menu with marital status options appears!

---

## 4️⃣ Adding a Required Field

### Example: Make "Last Name" Required

```typescript
export const searchConfig: SearchConfig = {
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
      required: true,  // ⭐ ADD THIS LINE
    },
    // ... other fields
  },
  
  resultFields: [
    // ... existing fields
  ],
};
```

**Result:** Last Name field shows a red asterisk (*) and is required!

---

## 5️⃣ Adding a Result Column

### Example: Add "Marital Status" to Results Table

```typescript
export const searchConfig: SearchConfig = {
  fields: {
    // ... existing fields
  },
  
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
    
    // ⭐ ADD THIS NEW COLUMN
    {
      key: 'maritalStatus',
      label: 'Marital Status',
      renderOrder: 3,
      formatter: (customer: Customer) => customer.maritalStatus,
    },
    
    {
      key: 'primaryPhone',
      label: 'Primary Phone',
      renderOrder: 4,
      formatter: (customer: Customer) => {
        const primaryPhone = customer.phones.find((p) => p.isPrimary);
        return primaryPhone?.number || 'N/A';
      },
    },
    {
      key: 'primaryEmail',
      label: 'Primary Email',
      renderOrder: 5,
      formatter: (customer: Customer) => {
        const primaryEmail = customer.emails.find((e) => e.isPrimary);
        return primaryEmail?.address || 'N/A';
      },
    },
  ],
};
```

**Result:** A new "Marital Status" column appears in the results table!

---

## 6️⃣ Complete Example: Adding Multiple Fields

### Example: Add City, State, and Phone Search

**Complete Updated Config:**

```typescript
import { Customer, SearchConfig } from '@/types';

export const searchConfig: SearchConfig = {
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
    
    // ⭐ NEW FIELDS
    city: {
      uiType: 'input',
      label: 'City',
      placeholder: 'Enter city',
      renderOrder: 4,
    },
    state: {
      uiType: 'input',
      label: 'State',
      placeholder: 'Enter state (e.g., NY)',
      renderOrder: 5,
    },
    phoneNumber: {
      uiType: 'input',
      label: 'Phone Number',
      placeholder: 'Enter phone number',
      renderOrder: 6,
    },
    maritalStatus: {
      uiType: 'select',
      label: 'Marital Status',
      renderOrder: 7,
      options: [
        { value: 'Single', label: 'Single' },
        { value: 'Married', label: 'Married' },
        { value: 'Divorced', label: 'Divorced' },
        { value: 'Widowed', label: 'Widowed' },
      ],
    },
  },

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
    
    // ⭐ NEW COLUMN
    {
      key: 'location',
      label: 'Location',
      renderOrder: 3,
      formatter: (customer: Customer) => {
        const homeAddress = customer.addresses.find(a => a.type === 'Home');
        return homeAddress ? `${homeAddress.city}, ${homeAddress.state}` : 'N/A';
      },
    },
    
    {
      key: 'primaryPhone',
      label: 'Primary Phone',
      renderOrder: 4,
      formatter: (customer: Customer) => {
        const primaryPhone = customer.phones.find((p) => p.isPrimary);
        return primaryPhone?.number || 'N/A';
      },
    },
    {
      key: 'primaryEmail',
      label: 'Primary Email',
      renderOrder: 5,
      formatter: (customer: Customer) => {
        const primaryEmail = customer.emails.find((e) => e.isPrimary);
        return primaryEmail?.address || 'N/A';
      },
    },
  ],
};
```

**Result:** 
- 4 new search fields (City, State, Phone, Marital Status)
- 1 new result column (Location showing City, State)

---

## 7️⃣ Advanced: Custom Data Formatters

### Example 1: Format Phone Number

```typescript
{
  key: 'formattedPhone',
  label: 'Phone',
  renderOrder: 3,
  formatter: (customer: Customer) => {
    const primaryPhone = customer.phones.find((p) => p.isPrimary);
    if (!primaryPhone) return 'N/A';
    
    // Format: (555) 123-4567
    const cleaned = primaryPhone.number.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return primaryPhone.number;
  },
},
```

### Example 2: Show Age from Date of Birth

```typescript
{
  key: 'age',
  label: 'Age',
  renderOrder: 2,
  formatter: (customer: Customer) => {
    const birthDate = new Date(customer.dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return `${age} years`;
  },
},
```

### Example 3: Show Multiple Addresses

```typescript
{
  key: 'addresses',
  label: 'Addresses',
  renderOrder: 6,
  formatter: (customer: Customer) => {
    return customer.addresses
      .map(addr => `${addr.type}: ${addr.city}, ${addr.state}`)
      .join('; ');
  },
},
```

### Example 4: Show All Phone Numbers

```typescript
{
  key: 'allPhones',
  label: 'All Phones',
  renderOrder: 7,
  formatter: (customer: Customer) => {
    return customer.phones
      .map(phone => `${phone.type}: ${phone.number}${phone.isPrimary ? ' (Primary)' : ''}`)
      .join(', ');
  },
},
```

### Example 5: Conditional Formatting

```typescript
{
  key: 'status',
  label: 'Account Status',
  renderOrder: 8,
  formatter: (customer: Customer) => {
    // Example: Show status based on some condition
    const hasEmail = customer.emails.length > 0;
    const hasPhone = customer.phones.length > 0;
    
    if (hasEmail && hasPhone) return '✅ Complete';
    if (hasEmail || hasPhone) return '⚠️ Partial';
    return '❌ Incomplete';
  },
},
```

---

## 🎯 Quick Reference: Field Types

### Input Field Template
```typescript
fieldName: {
  uiType: 'input',
  label: 'Field Label',
  placeholder: 'Placeholder text',
  renderOrder: 1,
  required: false,  // optional
},
```

### Date Field Template
```typescript
fieldName: {
  uiType: 'date',
  label: 'Field Label',
  renderOrder: 1,
  required: false,  // optional
},
```

### Select Field Template
```typescript
fieldName: {
  uiType: 'select',
  label: 'Field Label',
  renderOrder: 1,
  options: [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
  ],
  required: false,  // optional
},
```

### Result Column Template
```typescript
{
  key: 'uniqueKey',
  label: 'Column Header',
  renderOrder: 1,
  formatter: (customer: Customer) => {
    // Return the value to display
    return customer.fieldName;
  },
},
```

---

## 🚀 Testing Your Changes

After modifying the config:

1. **Save the file** (`src/config/searchConfig.ts`)
2. **Check the browser** - Changes should appear automatically (HMR)
3. **If not, refresh** the page
4. **Test the new fields** by entering data and searching

---

## ✅ Best Practices

1. **Use meaningful field names** - Match the API field names when possible
2. **Set appropriate renderOrder** - Lower numbers appear first
3. **Provide clear labels** - Help users understand what to enter
4. **Add helpful placeholders** - Show example values
5. **Format result data** - Make results easy to read
6. **Handle missing data** - Use `|| 'N/A'` for optional fields
7. **Test all scenarios** - Empty results, errors, loading states

---

## 🐛 Troubleshooting

### Field doesn't appear
- Check `renderOrder` is set
- Verify the config syntax is valid TypeScript
- Ensure you saved the file

### Field appears but search doesn't work
- Verify the field name matches the API response
- Check JSON Server query parameters
- Look for errors in browser console

### Result column is empty
- Check the formatter function logic
- Ensure the data path is correct (e.g., `customer.firstName`)
- Handle undefined/null cases

---

## 📚 Additional Resources

- **Main Documentation:** `README.md`
- **Architecture Diagrams:** `ARCHITECTURE.md`
- **Type Definitions:** `src/types/index.ts`
- **Current Config:** `src/config/searchConfig.ts`

---

## 🎉 You're Ready!

With these examples, you can extend the Customer Search Application to support **any search criteria** and **any result columns** you need - all through configuration only!

**No component code changes required!** 🚀
