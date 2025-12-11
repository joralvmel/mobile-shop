# 📱 Mobile Shop

A modern Single Page Application for browsing and purchasing mobile devices.

## 🛠️ Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Client-side routing
- **SCSS** - Styling
- **Vitest** - Testing framework
- **LocalStorage** - Client-side caching

## 📋 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
```

### Available Scripts

```bash
# Development server (start script)
npm run dev

# Production build (build script)
npm run build

# Run tests (test script)
npm test

# Run tests with UI
npm run test:ui

# Generate test coverage
npm run test:coverage

# Code quality check (lint script)
npm run lint

# Preview production build
npm run preview
```

## 🏗️ Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Main pages (PLP, PDP)
├── hooks/          # Custom React hooks
├── services/       # API and business logic
├── context/        # Global state (Cart)
├── types/          # TypeScript definitions
├── styles/         # SCSS styles
└── utils/          # Utilities (caching)
```

## 🚀 Features

- **Product Listing** - Browse all products with real-time search
- **Product Details** - View full specifications and add to cart
- **Shopping Cart** - Add products with color and storage selection
- **Responsive Design** - Adapts to all screen sizes (1-4 column grid)
- **Client-side Caching** - 1-hour data persistence with automatic revalidation
- **Global Cart State** - Real-time cart counter updates

## 🌐 API Endpoints

Base URL: `https://itx-frontend-test.onrender.com/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/product` | Get all products |
| GET | `/api/product/:id` | Get product details |
| POST | `/api/cart` | Add product to cart |

### Add to Cart Request
```json
{
  "id": "0001",
  "colorCode": 1,
  "storageCode": 2
}
```

### Add to Cart Response
```json
{
  "count": 1
}
```

## 💾 Caching System

- Data cached in localStorage for 1 hour
- Automatic revalidation after expiration
- Cached on every API request

## 🧪 Testing

The project includes unit and integration tests using:
- **Vitest** - Test runner
- **React Testing Library** - Component testing
- **jsdom** - DOM environment

Tests are located in `src/__tests__/` and cover:
- Components (ProductCard, SearchBox)
- Services (productService, cartService)
- Custom Hooks (useProductSearch)

```bash
# Run all tests
npm test

# Run tests with UI dashboard
npm run test:ui

# Generate coverage report
npm run test:coverage
```

## 📱 Responsive Grid

- **Mobile** (< 768px): 1 column
- **Tablet** (768px+): 2 columns
- **Desktop** (1024px+): 3 columns
- **Large** (1280px+): 4 columns

