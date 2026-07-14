# Gavellia

> A premium online auction platform for buying and selling luxury goods through real-time and timed bidding.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://gavellia-client.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-15.5-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## Live Application

**[Visit Gavellia](https://gavellia-client.vercel.app/)**

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [API Routes](#api-routes)
- [Contributing](#contributing)
- [License](#license)

## Overview

Gavellia is a sophisticated auction marketplace that enables users to buy and sell premium products through competitive bidding. The platform supports both timed auctions and live bidding sessions across categories including fashion, art, watches, cars, jewellery, collectibles, antiques, shoes, and bags.

### Key Highlights

- **Dual-Role System** — Buyers and sellers share a single platform with seamless role switching
- **Real-Time Bidding** — Live auction support with instant bid updates
- **Timed Auctions** — Duration-based bidding with countdown timers and automatic extensions
- **Curated Categories** — Fashion, art, watches, automotive, jewellery, collectibles, and more
- **Responsive Design** — Optimized for desktop, tablet, and mobile experiences

## Features

### Buyer Experience

- Browse and search products with advanced filtering (category, price, location, condition)
- Participate in timed and live auctions
- Track bid history across active, won, and lost bids
- Manage purchases through payment, shipping, and delivery stages
- Personalized dashboard with stats and activity feed

### Seller Experience

- Multi-step lot creation wizard with image upload
- Listing management with timed, live, sold, and draft tabs
- Sales analytics with revenue charts and category breakdowns
- Participant tracking for each listing
- Messaging system for buyer inquiries

### Platform

- Secure multi-step registration with ID verification
- Role-based navigation that adapts to buyer/seller mode
- Conditional footer rendering based on context
- How It Works educational page for new users

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 15.5](https://nextjs.org/) (App Router) |
| **UI Library** | [React 19.1](https://reactjs.org/) |
| **Language** | [TypeScript 5.x](https://www.typescriptlang.org/) |
| **State Management** | [Redux Toolkit 2.9](https://redux-toolkit.js.org/) + [React Redux 9.2](https://react-redux.js.org/) |
| **Styling** | [Tailwind CSS 4.x](https://tailwindcss.com/) |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com/) (New York style) + [Radix UI](https://www.radix-ui.com/) primitives |
| **Charts** | [Recharts 3.7](https://recharts.org/) |
| **Animations** | [Motion 12.x](https://motion.dev/) |
| **Carousel** | [Embla Carousel 8.6](https://www.embla-carousel.com/) |
| **Icons** | [Lucide React](https://lucide.dev/) + [React Icons](https://react-icons.github.io/react-icons/) |
| **Utilities** | [clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/dcastil/tailwind-merge) + [CVA](https://cva.style/) |
| **Deployment** | [Vercel](https://vercel.com/) |

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

```bash
git clone https://github.com/rahul3507/Gavellia_Client.git
cd Gavellia_Client
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Project Structure

```
Gavellia_Client/
├── public/                          # Static assets
│   └── productImage/                # Product images
├── src/
│   ├── app/                         # Next.js App Router
│   │   ├── layout.tsx               # Root layout (fonts, providers, navbar, footer)
│   │   ├── page.tsx                 # Root page (role-based routing)
│   │   ├── globals.css              # Theme, CSS variables, Tailwind config
│   │   ├── home/                    # Buyer home page
│   │   ├── products/                # Product catalog
│   │   │   ├── page.tsx             # Product listing with filters
│   │   │   └── [title]/             # Product detail (dynamic route)
│   │   │       └── live/            # Live auction page
│   │   ├── overviews/               # Buyer dashboard
│   │   ├── my-bids/                 # Bid management
│   │   ├── purchases/               # Purchase tracking
│   │   ├── messages/                # Messaging system
│   │   ├── profile-settings/        # User settings
│   │   ├── how-it-works/            # Informational page
│   │   ├── (seller)/                # Seller route group (no URL prefix)
│   │   │   ├── seller-home/         # Seller landing
│   │   │   ├── overview/            # Seller dashboard
│   │   │   ├── create-lot/          # Lot creation wizard
│   │   │   ├── listing-management/  # Listing management
│   │   │   └── sales-analytics/     # Revenue analytics
│   │   └── api/                     # Server-side API routes
│   │       ├── products/            # Product endpoints
│   │       ├── overview/            # Buyer overview endpoint
│   │       ├── my-bids/             # Bids endpoint
│   │       ├── purchases/           # Purchases endpoint
│   │       └── listings/            # Seller listings endpoint
│   ├── components/                  # React components
│   │   ├── ui/                      # shadcn/ui primitives (19 components)
│   │   ├── common/                  # Shared components (Navbar, Footer, ProductCard)
│   │   │   └── auth/                # Multi-step registration (12 form steps)
│   │   ├── HomeComponents/          # Buyer home sections
│   │   ├── ProductsPageComponents/  # Product catalog components
│   │   ├── ProductDetailsPageComponents/    # Standard product detail
│   │   ├── ProductDetailsLivePageComponents/ # Live auction detail
│   │   ├── OverViewComponents/      # Buyer dashboard sections
│   │   ├── MyBidsComponents/        # Bid management components
│   │   ├── PurchasesComponents/     # Purchase tracking components
│   │   ├── ProfileSettingComponents/ # Profile settings
│   │   ├── HowItWorksPageComponents/ # How It Works page sections
│   │   └── SellerAllComponents/     # Seller feature modules
│   │       ├── SellerHomePageComponents/
│   │       ├── OverviewComponents/
│   │       ├── CreateLotComponents/
│   │       ├── ListingManagementComponents/
│   │       ├── SalesAnalyticsComponents/
│   │       └── MessageInquiriesComponents/
│   ├── redux/                       # State management
│   │   ├── store.ts                 # Redux store configuration
│   │   ├── Providers.tsx            # Redux provider wrapper
│   │   ├── hooks.ts                 # Typed hooks (useAppDispatch, useAppSelector)
│   │   └── feature/                 # Redux slices
│   │       ├── userRoleSlice.ts     # Buyer/seller role state
│   │       ├── productsSlice.ts     # Product listing & filters
│   │       ├── overviewSlice.ts     # Buyer dashboard data
│   │       ├── myBidsSlice.ts       # Bid tracking
│   │       ├── purchasesSlice.ts    # Purchase tracking
│   │       └── listingsSlice.ts     # Seller listing management
│   ├── types/                       # TypeScript interfaces
│   │   └── allTypes.ts              # All shared type definitions
│   ├── data/                        # Static data
│   │   └── products.json            # Product data source for API routes
│   └── lib/                         # Utilities
│       └── utils.ts                 # cn() class merge utility
├── next.config.ts                   # Next.js configuration
├── tailwind.config.js               # Tailwind CSS configuration
├── tsconfig.json                    # TypeScript configuration
├── components.json                  # shadcn/ui configuration
└── eslint.config.mjs                # ESLint flat config
```

## Architecture

### Data Flow

```
┌─────────────┐    ┌──────────────┐    ┌─────────────┐    ┌──────────────┐    ┌───────────┐
│ products.json│───▶│ API Routes   │───▶│ Redux Store │───▶│  Components  │───▶│   UI      │
│ (Static Data)│    │ (Next.js)    │    │ (RTK Slices)│    │  (React)     │    │ (Browser) │
└─────────────┘    └──────────────┘    └─────────────┘    └──────────────┘    └───────────┘
```

### State Management

The application uses Redux Toolkit with 6 slices:

| Slice | Responsibility |
|---|---|
| `userRole` | Manages buyer/seller role switching |
| `products` | Product listing, filtering, sorting, and detail views |
| `overview` | Buyer dashboard stats, inspired bids, live auctions, activity |
| `myBids` | Active, won, and lost bid tracking with pagination |
| `purchases` | Purchase status tracking (to-pay, to-ship, in-transit, completed) |
| `listings` | Seller listing management with tab-based filtering |

### Component Architecture

Components follow a modular pattern where each page has its own folder:

- **Route Page** — Thin wrapper that imports a content component
- **Content Component** — Handles layout and data fetching
- **Feature Components** — Reusable UI sections (cards, lists, forms)

### Role-Based Rendering

The root page (`/`) checks the Redux `userRole` state and renders either the buyer home or seller home. Users can switch roles via the navbar, which dynamically updates navigation links and available routes.

### API Layer

All 6 API routes are server-side endpoints that read from `products.json` and transform data in-memory. They simulate a real backend with filtering, pagination, and sorting capabilities.

## API Routes

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/products` | Paginated product listing with filters |
| GET | `/api/products/[id]` | Single product detail with related items |
| GET | `/api/overview` | Buyer dashboard data |
| GET | `/api/my-bids` | Bid history by tab (active/won/lost) |
| GET | `/api/purchases` | Purchase history by status |
| GET | `/api/listings` | Seller listings by tab (timed/live/sold/draft) |

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

**Built with care by the Gavellia Team**

For questions or support, please [open an issue](https://github.com/rahul3507/Gavellia_Client/issues).
