# Customer Search Application - Care247

A **configuration-driven** customer search application built with React, TypeScript, Tailwind CSS, and shadcn/ui components. This application demonstrates a highly extensible architecture where all UI components and search functionality are controlled via configuration objects, allowing for easy modifications without changing component code.

---

## 🎯 Features

- **Configuration-Driven Architecture**: All form fields, result columns, and UI behaviors are controlled via a centralized configuration object
- **Dynamic Form Generation**: Search form fields are automatically generated based on configuration
- **Dynamic Results Table**: Result columns and data formatting are configuration-driven
- **TypeScript**: Fully typed for better development experience and code safety
- **Responsive Design**: Mobile-friendly UI built with Tailwind CSS
- **Modern UI Components**: Utilizes shadcn/ui component library
- **State Management**: Proper loading, error, and empty states
- **JSON Server Integration**: Mock backend API for realistic data fetching

---

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Build Tool**: Vite
- **Backend**: JSON Server (mock API)
- **Icons**: Lucide React

---

## 📁 Project Structure

```
customer-search-app/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── ui/              # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   └── table.tsx
│   │   ├── FormField.tsx    # Generic form field component
│   │   ├── SearchForm.tsx   # Configuration-driven search form
│   │   └── ResultsTable.tsx # Configuration-driven results table
│   ├── config/              # Configuration files
│   │   └── searchConfig.ts  # Search configuration object
│   ├── hooks/               # Custom React hooks
│   │   └── useCustomerSearch.ts
│   ├── lib/                 # Utility functions
│   │   └── utils.ts
│   ├── pages/               # Page components
│   │   └── SearchPage.tsx
│   ├── services/            # API services
│   │   └── customerService.ts
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── db.json                  # JSON Server database
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.ts
└── README.md
```

---

## 🚀 Setup and Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation Steps

1. **Navigate to the project directory:**
   ```bash
   cd "Customer Search Application"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the JSON Server (in one terminal):**
   ```bash
   npm run server
   ```
   This will start the mock API at `http://localhost:3001`

4. **Start the development server (in another terminal):**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production build will be created in the `dist` folder.

---

## 🔧 Configuration-Driven Approach

### Core Concept

The application uses a **centralized configuration object** (`src/config/searchConfig.ts`) that defines:
- Search form fields (type, label, placeholder, order)
- Result table columns (label, data formatting, order)

This approach allows you to **add, modify, or remove features by changing configuration only**, without modifying component code.

### Configuration Structure

```typescript
export const searchConfig: SearchConfig = {
  // Search form field definitions
  fields: {
    firstName: {
      uiType: 'input',           // Field type: 'input' | 'date' | 'select'
      label: 'First Name',       // Display label
      placeholder: 'Enter...',   // Placeholder text
      renderOrder: 1,            // Display order
      required: false,           // Optional: make field required
    },
    // ... more fields
  },

  // Result table column definitions
  resultFields: [
    {
      key: 'name',               // Unique identifier
      label: 'Full Name',        // Column header
      renderOrder: 1,            // Display order
      formatter: (customer) => { // Custom data formatting
        return `${customer.firstName} ${customer.lastName}`;
      },
    },
    // ... more columns
  ],
};
```

---

## ➕ How to Add a New Search Field

### Example: Adding a "Middle Name" field

**Step 1**: Update the configuration in `src/config/searchConfig.ts`:

```typescript
export const searchConfig: SearchConfig = {
  fields: {
    firstName: { /* existing config */ },
    lastName: { /* existing config */ },
    
    // ADD THIS NEW FIELD
    middleName: {
      uiType: 'input',
      label: 'Middle Name',
      placeholder: 'Enter middle name',
      renderOrder: 1.5,  // Position between firstName and lastName
    },
    
    dateOfBirth: { /* existing config */ },
  },
  
  resultFields: [
    // Optionally add to results table
    {
      key: 'fullName',
      label: 'Full Name',
      renderOrder: 1,
      formatter: (customer) => 
        `${customer.firstName} ${customer.middleName || ''} ${customer.lastName}`.trim(),
    },
    // ... other fields
  ],
};
```

**Step 2**: That's it! No component changes needed. The form will automatically render the new field.

### Example: Adding a "Marital Status" Dropdown

```typescript
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
```

---

## 📊 Data Model

### Customer Interface

```typescript
interface Customer {
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
```

### Address Interface

```typescript
interface Address {
  id: string;
  type: 'Home' | 'Business' | 'Mailing';
  street: string;
  city: string;
  state: string;
  zipCode: string;
}
```

### Phone Interface

```typescript
interface Phone {
  id: string;
  type: 'Mobile' | 'Home' | 'Work';
  number: string;
  isPrimary: boolean;
}
```

### Email Interface

```typescript
interface Email {
  id: string;
  type: 'Personal' | 'Work';
  address: string;
  isPrimary: boolean;
}
```

---

## 🏗 Architecture and Design Decisions

### 1. Configuration-Driven Components

**Decision**: All UI components accept configuration objects as props instead of hardcoded values.

**Benefits**:
- Easy to extend without modifying component code
- Single source of truth for form structure
- Type-safe configuration with TypeScript
- Reduced code duplication

### 2. Generic Component Pattern

**Components like `FormField` and `ResultsTable` are generic and reusable**:
- `FormField`: Renders any input type based on `uiType` config
- `SearchForm`: Dynamically generates form from config
- `ResultsTable`: Dynamically generates columns from config

### 3. Custom Hooks for State Management

**`useCustomerSearch` hook** encapsulates all search-related state:
- Loading states
- Error handling
- Search results
- Search history tracking

**Benefits**:
- Separation of concerns
- Reusable logic
- Cleaner component code

### 4. Service Layer Pattern

**`customerService.ts`** abstracts API calls:
- Centralized API logic
- Easy to mock or replace
- Type-safe request/response handling

### 5. TypeScript First

**Strict typing throughout**:
- All data models defined as interfaces
- Configuration objects are strongly typed
- Props are typed for all components

---

## 🎨 UI/UX Features

### State Management

- **Loading State**: Spinner with "Searching..." message
- **Error State**: Red alert with error message
- **Empty State**: Friendly message when no results found
- **No Search State**: Instructional message before first search

### Responsive Design

- Mobile-first approach
- Grid layout adapts to screen size (1/2/3 columns)
- Touch-friendly buttons and inputs

### Accessibility

- Proper label associations
- Semantic HTML elements
- Keyboard navigation support
- Clear visual feedback

---

## 🧪 Testing the Application

### Test Scenarios

1. **Search by First Name**: Enter "John" → Should return John Doe
2. **Search by Last Name**: Enter "Smith" → Should return Jane Smith
3. **Search by Date of Birth**: Enter "1985-03-15" → Should return matching customer
4. **Combined Search**: Enter multiple criteria
5. **No Results**: Enter non-existent data
6. **Clear Filters**: Click "Clear Filters" button

### Sample Data

The `db.json` file contains 15 customers with various attributes. Some examples:
- John Doe (ID: 1)
- Jane Smith (ID: 2)
- Michael Johnson (ID: 3)

---

## ⏱ Time Spent & Development Process

**Total Time**: Approximately 3-4 hours

### Breakdown:
- **Project Setup** (30 min): Vite, TypeScript, Tailwind, dependencies
- **Type Definitions** (20 min): Customer models, configuration types
- **Configuration System** (30 min): searchConfig design and implementation
- **Component Development** (90 min):
  - shadcn/ui components
  - FormField, SearchForm, ResultsTable
  - SearchPage
- **API Integration** (30 min): customerService, useCustomerSearch hook
- **Styling & Polish** (30 min): Tailwind styling, responsive design
- **Testing & Debug** (20 min): Manual testing, bug fixes
- **Documentation** (30 min): README, code comments

### Trade-offs & Decisions

1. **JSON Server vs. Real Backend**
   - ✅ Simple, fast setup
   - ❌ Limited query capabilities (used `_like` for partial matching)

2. **Configuration in TypeScript vs. JSON**
   - ✅ Type safety and intellisense
   - ✅ Can include formatter functions
   - ❌ Not runtime configurable (requires rebuild)

3. **shadcn/ui vs. Other UI Libraries**
   - ✅ Customizable, copy-paste components
   - ✅ No bundle size overhead
   - ❌ Manual setup for each component

4. **Custom Hooks vs. Context API**
   - ✅ Simpler for single-page app
   - ❌ Would need Context for multi-page sharing

---

## 🔮 Future Enhancements

If more time was available, consider:

1. **Advanced Search**:
   - Search by address, phone, email
   - Date range queries
   - Autocomplete suggestions

2. **Pagination**:
   - Handle large result sets
   - Page size configuration

3. **Sorting & Filtering**:
   - Sortable table columns
   - Client-side filtering

4. **Export Functionality**:
   - Export results to CSV/Excel
   - Print-friendly view

5. **Detail View**:
   - Click row to see full customer details
   - Modal or separate page

6. **Validation**:
   - Form validation rules in config
   - Input format validation (phone, email)

7. **Persistence**:
   - Save search preferences
   - Recent searches history

8. **Testing**:
   - Unit tests (Jest + React Testing Library)
   - E2E tests (Playwright/Cypress)

---

## 📝 License

This project is created as an assignment for Care247.

---

## 👤 Contact

For questions or feedback, please reach out to the development team.

---

## 🙏 Acknowledgments

- **shadcn/ui** for beautiful UI components
- **Lucide** for clean, consistent icons
- **JSON Server** for quick mock API setup
- **Vite** for blazing fast development experience
