# Customer Search Application - Setup Guide

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start JSON Server (Terminal 1):
   ```bash
   npm run server
   ```

3. Start Development Server (Terminal 2):
   ```bash
   npm run dev
   ```

4. Open browser to: http://localhost:5173

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run server` - Start JSON Server API
- `npm run lint` - Run ESLint

## Configuration

The entire application is driven by `src/config/searchConfig.ts`. Edit this file to add/modify search fields and result columns.
