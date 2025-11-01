# Customer Search Application - Complete File Structure

## 📂 Project Overview

This document provides a complete overview of the Customer Search Application file structure and key files.

## 🗂️ Directory Structure

```
Customer Search Application/
│
├── 📄 package.json                    # Project dependencies and scripts
├── 📄 tsconfig.json                   # TypeScript configuration
├── 📄 tsconfig.node.json             # TypeScript config for Vite
├── 📄 vite.config.ts                 # Vite build configuration
├── 📄 tailwind.config.js             # Tailwind CSS configuration
├── 📄 postcss.config.js              # PostCSS configuration
├── 📄 .eslintrc.cjs                  # ESLint configuration
├── 📄 .gitignore                     # Git ignore patterns
├── 📄 index.html                     # HTML entry point
├── 📄 db.json                        # JSON Server database (15 customers)
├── 📄 README.md                      # Comprehensive documentation
├── 📄 SETUP.md                       # Quick setup guide
│
└── src/
    ├── 📄 main.tsx                   # React app entry point
    ├── 📄 App.tsx                    # Root App component
    ├── 📄 index.css                  # Global styles + Tailwind
    ├── 📄 vite-env.d.ts             # Vite type definitions
    │
    ├── components/                   # React components
    │   ├── ui/                      # shadcn/ui components
    │   │   ├── 📄 button.tsx        # Button component
    │   │   ├── 📄 card.tsx          # Card components
    │   │   ├── 📄 input.tsx         # Input component
    │   │   ├── 📄 label.tsx         # Label component
    │   │   └── 📄 table.tsx         # Table components
    │   │
    │   ├── 📄 FormField.tsx         # Generic form field component
    │   ├── 📄 SearchForm.tsx        # Configuration-driven search form
    │   └── 📄 ResultsTable.tsx      # Configuration-driven results table
    │
    ├── config/                      # Configuration files
    │   └── 📄 searchConfig.ts       # ⭐ Main configuration object
    │
    ├── hooks/                       # Custom React hooks
    │   └── 📄 useCustomerSearch.ts  # Customer search hook
    │
    ├── lib/                         # Utility functions
    │   └── 📄 utils.ts              # Tailwind class merging utility
    │
    ├── pages/                       # Page components
    │   └── 📄 SearchPage.tsx        # Main search page
    │
    ├── services/                    # API services
    │   └── 📄 customerService.ts    # Customer API calls
    │
    └── types/                       # TypeScript definitions
        └── 📄 index.ts              # All type definitions
```

## 🔑 Key Files Description

### Configuration Files

| File | Purpose |
|------|---------|
| `src/config/searchConfig.ts` | **⭐ Most Important** - Controls all search fields and result columns |
| `package.json` | Dependencies, scripts, project metadata |
| `tsconfig.json` | TypeScript compiler options |
| `tailwind.config.js` | Tailwind CSS theming and configuration |
| `vite.config.ts` | Vite bundler configuration with path aliases |

### Core Application Files

| File | Purpose |
|------|---------|
| `src/main.tsx` | React application entry point |
| `src/App.tsx` | Root component |
| `src/pages/SearchPage.tsx` | Main page orchestrating search functionality |
| `src/index.css` | Global styles and Tailwind directives |

### Type Definitions

| File | Purpose |
|------|---------|
| `src/types/index.ts` | All TypeScript interfaces (Customer, Address, Phone, Email, Config types) |

### Components

| Component | Type | Purpose |
|-----------|------|---------|
| `FormField.tsx` | Generic | Renders any form field based on config |
| `SearchForm.tsx` | Container | Generates entire search form from config |
| `ResultsTable.tsx` | Container | Generates results table from config |
| `ui/button.tsx` | UI | Styled button component |
| `ui/card.tsx` | UI | Card container components |
| `ui/input.tsx` | UI | Input field component |
| `ui/label.tsx` | UI | Form label component |
| `ui/table.tsx` | UI | Table components |

### Services & Hooks

| File | Purpose |
|------|---------|
| `services/customerService.ts` | API calls to JSON Server |
| `hooks/useCustomerSearch.ts` | Search state management hook |

### Data

| File | Purpose |
|------|---------|
| `db.json` | Mock database with 15 customer records |

## 📊 Component Hierarchy

```
App
└── SearchPage
    ├── Header
    ├── Main
    │   ├── SearchForm (config-driven)
    │   │   └── FormField[] (dynamically generated)
    │   └── ResultsTable (config-driven)
    │       └── Table (dynamically generated columns)
    └── Footer
```

## 🔄 Data Flow

```
User Input
    ↓
SearchForm (config-driven)
    ↓
useCustomerSearch hook
    ↓
customerService.searchCustomers()
    ↓
JSON Server API (http://localhost:3001)
    ↓
Results returned
    ↓
ResultsTable (config-driven)
    ↓
Display to User
```

## 🎯 Configuration-Driven Architecture

### The Magic File: `src/config/searchConfig.ts`

This single file controls:
- ✅ Which search fields appear
- ✅ Field types (input, date, select)
- ✅ Field labels and placeholders
- ✅ Field ordering
- ✅ Result table columns
- ✅ Data formatting

**To add a new field**: Edit only this file!

### Example Configuration

```typescript
// src/config/searchConfig.ts
export const searchConfig = {
  fields: {
    firstName: {
      uiType: 'input',
      label: 'First Name',
      placeholder: 'Enter first name',
      renderOrder: 1,
    },
    // Add more fields here
  },
  resultFields: [
    {
      key: 'name',
      label: 'Full Name',
      renderOrder: 1,
      formatter: (customer) => `${customer.firstName} ${customer.lastName}`,
    },
    // Add more columns here
  ],
};
```

## 📦 Dependencies

### Production Dependencies
- `react` - UI library
- `react-dom` - React DOM rendering
- `class-variance-authority` - Class variance utilities
- `clsx` - Class name utility
- `tailwind-merge` - Tailwind class merging
- `lucide-react` - Icon library

### Development Dependencies
- `vite` - Build tool
- `typescript` - Type safety
- `@vitejs/plugin-react` - Vite React plugin
- `tailwindcss` - CSS framework
- `json-server` - Mock API server
- `eslint` - Code linting
- `@typescript-eslint/*` - TypeScript ESLint plugins

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start JSON Server:**
   ```bash
   npm run server
   ```

3. **Start dev server:**
   ```bash
   npm run dev
   ```

4. **Access application:**
   - Frontend: http://localhost:5173
   - API: http://localhost:3001/customers

## 📝 Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| `dev` | `npm run dev` | Start development server |
| `build` | `npm run build` | Build for production |
| `preview` | `npm run preview` | Preview production build |
| `server` | `npm run server` | Start JSON Server |
| `lint` | `npm run lint` | Run ESLint |

## 🎨 Styling System

- **Tailwind CSS**: Utility-first CSS framework
- **CSS Variables**: Theme colors defined in `index.css`
- **shadcn/ui**: Component styling patterns
- **Responsive**: Mobile-first grid system

## 🔐 Type Safety

All files are fully typed:
- ✅ Customer data models
- ✅ Configuration objects
- ✅ Component props
- ✅ API responses
- ✅ Hook returns

## 📚 Documentation Files

- `README.md` - Complete documentation (setup, architecture, decisions)
- `SETUP.md` - Quick setup guide
- `FILE_STRUCTURE.md` - This file

## 🎓 Learning Resources

To understand the configuration-driven approach:
1. Read `README.md` - "Configuration-Driven Approach" section
2. Explore `src/config/searchConfig.ts`
3. See how `SearchForm.tsx` uses the config
4. See how `ResultsTable.tsx` uses the config
5. Try adding a new field (example in README)

---

**Total Files**: ~25 files
**Total Lines of Code**: ~2,000+ lines
**Configuration Files to Modify**: Just 1 (`searchConfig.ts`)
