# Gavellia — System Architecture

> Version 2.0 | Last Updated: July 2026

---

## 1. Executive Summary

Gavellia is a premium auction marketplace built with Next.js 15 (App Router), React 19, TypeScript, and Redux Toolkit. The platform enables dual user roles (buyer/seller) with real-time and timed auction capabilities across luxury product categories including watches, art, automotive, jewellery, fashion, and collectibles.

### Current State

| Aspect | Status |
|---|---|
| **Deployment** | Production (Vercel) |
| **Backend** | Mock API (static JSON) |
| **Database** | None (in-memory) |
| **Authentication** | UI only |
| **Real-Time** | Simulated |
| **Live URL** | [gavellia-client.vercel.app](https://gavellia-client.vercel.app) |

---

## 2. System Architecture

### 2.1 Architectural Overview

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT TIER                                        │
│                                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐ │
│  │   Browser     │  │  Next.js     │  │   React 19   │  │   Redux Toolkit     │ │
│  │   (DOM)       │←→│   Router     │←→│   Runtime    │←→│   (State Mgmt)      │ │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────────────┘ │
│                          │                    │                    │              │
│                          ▼                    ▼                    ▼              │
│  ┌──────────────────────────────────────────────────────────────────────────────┐│
│  │                     UI COMPONENT LAYER                                       ││
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐││
│  │  │  shadcn/ui  │  │   Radix     │  │   Tailwind  │  │   Custom Components │││
│  │  │  (19 comps) │  │   Primitives│  │   CSS 4.x   │  │   (12 modules)      │││
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────────────┘││
│  └──────────────────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           SERVER TIER (Next.js API Routes)                      │
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────────────┐│
│  │                      API ROUTE HANDLERS                                     ││
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐         ││
│  │  │/products │ │/overview │ │/my-bids  │ │/purchases│ │/listings │         ││
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘         ││
│  └─────────────────────────────────────────────────────────────────────────────┘│
│                          │                                                      │
│                          ▼                                                      │
│  ┌─────────────────────────────────────────────────────────────────────────────┐│
│  │                    DATA TRANSFORMATION LAYER                                ││
│  │  • Filtering (category, price, location, condition)                        ││
│  │  • Pagination (page, limit, totals)                                        ││
│  │  • Sorting (price, bids, time)                                             ││
│  │  • Aggregation (stats, counts)                                             ││
│  │  • Relationship resolution (related products)                              ││
│  └─────────────────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                            DATA TIER                                            │
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────────────┐│
│  │                     products.json (Static Data)                             ││
│  │  • 100+ product records                                                     ││
│  │  • 95 unique Unsplash image URLs                                            ││
│  │  • 9 categories, 3 auction types, 5 conditions                             ││
│  │  • In-memory transformation on each request                                ││
│  └─────────────────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Architectural Pattern

**Pattern:** Client-Side SPA with Server-Side Mock API (BFF Pattern)

| Characteristic | Implementation |
|---|---|
| **Rendering** | Client-side (CSR) with static generation where possible |
| **State Management** | Centralized (Redux Toolkit) |
| **API Communication** | REST (fetch via Redux Thunks) |
| **Routing** | File-based (Next.js App Router) |
| **Styling** | Utility-first (Tailwind CSS) |
| **Component Model** | Composition-based (React) |

### 2.3 Request/Response Flow

```
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
│  User   │     │ React   │     │ Redux   │     │ Next.js │     │  Data   │
│ Action  │────→│ Component│────→│ Thunk   │────→│ API     │────→│ Source  │
│         │     │         │     │         │     │ Route   │     │         │
└─────────┘     └─────────┘     └─────────┘     └─────────┘     └─────────┘
     │               │               │               │               │
     │               │               │               │               │
     ▼               ▼               ▼               ▼               ▼
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
│ Click/  │     │ Re-render│     │ Dispatch│     │ GET     │     │ Read +  │
│ Input   │     │ with new │     │ API     │     │ /api/*  │     │ Trans-  │
│         │     │ state    │     │ call    │     │         │     │ form    │
└─────────┘     └─────────┘     └─────────┘     └─────────┘     └─────────┘
     │               ▲               │               │               │
     │               │               │               │               │
     │               └───────────────┴───────────────┴───────────────┘
     │                           Response Flow
     │
     ▼
┌─────────┐
│ UI      │
│ Update  │
└─────────┘
```

---

## 3. Technology Stack

### 3.1 Core Technologies

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| **Framework** | Next.js | 15.5.7 | App Router, API routes, build system |
| **UI Library** | React | 19.1.0 | Component rendering, virtual DOM |
| **Language** | TypeScript | 5.x | Type safety, developer experience |
| **Runtime** | Node.js | 18+ | Server-side execution |

### 3.2 State Management

| Technology | Version | Purpose |
|---|---|---|
| Redux Toolkit | 2.9.0 | State container, slices, async thunks |
| React Redux | 9.2.0 | React bindings, typed hooks |

### 3.3 UI & Styling

| Technology | Version | Purpose |
|---|---|---|
| Tailwind CSS | 4.x | Utility-first CSS framework |
| shadcn/ui | — | Pre-built component library (New York) |
| Radix UI | Various | Accessible UI primitives |
| Recharts | 3.7.0 | Data visualization |
| Motion | 12.x | Animations and transitions |
| Embla Carousel | 8.6.0 | Carousel component |
| Lucide React | 0.541.0 | Icon system |
| React Icons | 5.5.0 | Brand icons |

### 3.4 Utilities

| Package | Purpose |
|---|---|
| clsx | Conditional class construction |
| tailwind-merge | Class deduplication |
| class-variance-authority | Component variants |

---

## 4. Directory Structure

```
gavellia_client/
├── public/                              # Static assets
│   ├── productImage/                    # Product images
│   ├── ArtBanner.jpg                    # Hero banners
│   ├── AutomationBanner.jpg
│   ├── WatchBanner.png
│   ├── LiveAucBanner-*.jpg
│   └── *.png                            # Flags, icons
│
├── src/
│   ├── app/                             # Next.js App Router
│   │   ├── layout.tsx                   # Root layout (fonts, providers, metadata)
│   │   ├── page.tsx                     # Root page (role-based routing)
│   │   ├── globals.css                  # Theme, CSS variables, Tailwind
│   │   ├── loading.tsx                  # Global loading skeleton
│   │   ├── error.tsx                    # Global error boundary
│   │   │
│   │   ├── home/                        # Buyer home page
│   │   ├── products/                    # Product catalog
│   │   │   ├── page.tsx                 # Listing with filters
│   │   │   └── [title]/                 # Dynamic detail route
│   │   │       ├── page.tsx             # Timed auction detail
│   │   │       └── live/page.tsx        # Live auction detail
│   │   ├── overviews/                   # Buyer dashboard
│   │   ├── my-bids/                     # Bid management
│   │   ├── purchases/                   # Purchase tracking
│   │   ├── messages/                    # Messaging system
│   │   ├── profile-settings/            # User settings
│   │   ├── how-it-works/                # Educational page
│   │   │
│   │   ├── (seller)/                    # Seller route group
│   │   │   ├── seller-home/             # Seller landing
│   │   │   ├── overview/                # Seller dashboard
│   │   │   ├── create-lot/              # Lot creation wizard
│   │   │   ├── listing-management/      # Listing management
│   │   │   │   └── [id]/                # Listing detail
│   │   │   └── sales-analytics/         # Revenue analytics
│   │   │
│   │   └── api/                         # Server-side API routes
│   │       ├── products/                # Product endpoints
│   │       │   └── [id]/                # Single product
│   │       ├── overview/                # Buyer dashboard
│   │       ├── my-bids/                 # Bids endpoint
│   │       ├── purchases/               # Purchases endpoint
│   │       └── listings/                # Seller listings
│   │
│   ├── components/                      # React components
│   │   ├── ui/                          # 19 shadcn/ui primitives
│   │   ├── common/                      # Shared components
│   │   │   ├── Navbar.tsx               # Role-aware navigation
│   │   │   ├── Footer.tsx               # Footer
│   │   │   ├── ConditionalFooter.tsx    # Context-dependent footer
│   │   │   ├── ProductCard.tsx          # Product card
│   │   │   └── auth/                    # Authentication
│   │   │       ├── AuthDialog.tsx       # Auth modal
│   │   │       └── authComponents/      # 12 multi-step forms
│   │   │
│   │   ├── HomeComponents/              # 6 buyer home sections
│   │   ├── ProductsPageComponents/      # 7 product catalog components
│   │   ├── ProductDetailsPageComponents/# 7 timed auction detail
│   │   ├── ProductDetailsLivePageComponents/ # 5 live auction detail
│   │   ├── OverViewComponents/          # 5 buyer dashboard sections
│   │   ├── MyBidsComponents/            # 4 bid management components
│   │   ├── PurchasesComponents/         # 3 purchase tracking components
│   │   ├── ProfileSettingComponents/    # 1 profile settings
│   │   ├── HowItWorksPageComponents/    # 6 how it works sections
│   │   │
│   │   └── SellerAllComponents/         # Seller feature modules
│   │       ├── SellerHomePageComponents/    # 3 seller home
│   │       ├── OverviewComponents/          # 5 seller dashboard
│   │       ├── CreateLotComponents/         # 7 lot creation wizard
│   │       ├── ListingManagementComponents/ # 5 listing management
│   │       ├── SalesAnalyticsComponents/    # 5 analytics
│   │       └── MessageInquiriesComponents/  # 4 messaging
│   │
│   ├── redux/                           # State management
│   │   ├── store.ts                     # Store configuration
│   │   ├── Providers.tsx                # Provider wrapper
│   │   ├── hooks.ts                     # Typed hooks
│   │   └── feature/                     # 6 Redux slices
│   │       ├── userRoleSlice.ts
│   │       ├── productsSlice.ts
│   │       ├── overviewSlice.ts
│   │       ├── myBidsSlice.ts
│   │       ├── purchasesSlice.ts
│   │       └── listingsSlice.ts
│   │
│   ├── types/                           # TypeScript definitions
│   │   └── allTypes.ts                  # All shared interfaces
│   │
│   ├── data/                            # Static data
│   │   └── products.json                # Mock product database
│   │
│   └── lib/                             # Utilities
│       └── utils.ts                     # cn() class merge
│
├── next.config.ts                       # Next.js configuration
├── tailwind.config.js                   # Tailwind configuration
├── tsconfig.json                        # TypeScript configuration
├── components.json                      # shadcn/ui configuration
├── eslint.config.mjs                    # ESLint flat config
├── package.json                         # Dependencies
├── README.md                            # Project documentation
└── ARCHITECTURE.md                      # This document
```

---

## 5. Component Architecture

### 5.1 Component Hierarchy

```
RootLayout (layout.tsx)
├── Providers (Redux)
│   ├── Navbar
│   │   ├── Logo
│   │   ├── Navigation Links
│   │   ├── Search
│   │   ├── User Menu (Dropdown)
│   │   └── Role Switcher
│   │
│   ├── [Page Content] (role-based)
│   │   ├── HomePage / SellerHome
│   │   │   ├── HeroCards (Art, Watch, Automotive)
│   │   │   ├── ProductsSection
│   │   │   └── BottomCTA
│   │   │
│   │   ├── ProductsPage
│   │   │   ├── CategoryTabs
│   │   │   ├── FilterSidebar
│   │   │   ├── ProductsGrid
│   │   │   │   └── ProductCard[]
│   │   │   └── Pagination
│   │   │
│   │   ├── ProductDetailPage
│   │   │   ├── ImageCarousel
│   │   │   ├── ProductInfo
│   │   │   ├── BidSection
│   │   │   ├── Description
│   │   │   └── RelatedProducts
│   │   │
│   │   └── [Other Pages...]
│   │
│   └── ConditionalFooter
│       ├── Footer (buyer)
│       └── Footer (seller)
```

### 5.2 Component Patterns

#### Pattern 1: Page → Content → Feature

```
┌─────────────────────────────────────────────────────────────┐
│  Route Page (page.tsx)                                      │
│  • Thin wrapper                                             │
│  • Exports metadata                                         │
│  • Handles Suspense boundaries                              │
├─────────────────────────────────────────────────────────────┤
│  Content Component (e.g., ProductsPage.tsx)                 │
│  • Layout structure                                         │
│  • Data fetching (Redux dispatch)                           │
│  • State coordination                                       │
├─────────────────────────────────────────────────────────────┤
│  Feature Components                                         │
│  • CategoryTabs    → Category selection                     │
│  • FilterSidebar   → Filter controls                        │
│  • ProductsGrid    → Product display                        │
│  • Pagination      → Page navigation                        │
└─────────────────────────────────────────────────────────────┘
```

#### Pattern 2: Multi-Step Wizard

```
┌─────────────────────────────────────────────────────────────┐
│  CreateLotRanderPage                                        │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  StepIndicator                                        │  │
│  │  ○ ─── ○ ─── ○ ─── ○ ─── ○                          │  │
│  │  1     2     3     4     5                           │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Step Content (conditional rendering)                 │  │
│  │                                                       │  │
│  │  if step === 1: <LotDetails />                        │  │
│  │  if step === 2: <UploadImage />                       │  │
│  │  if step === 3: <PricingAndAuctionType />             │  │
│  │  if step === 4: <Publish />                           │  │
│  │  if step === 5: <Success />                           │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Navigation Buttons                                   │  │
│  │  [Back]                              [Next/Submit]    │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

#### Pattern 3: Tab-Based Views

```
┌─────────────────────────────────────────────────────────────┐
│  TabBar                                                     │
│  ┌──────┬──────┬──────┬──────┐                             │
│  │ Tab1 │ Tab2 │ Tab3 │ Tab4 │                             │
│  └──────┴──────┴──────┴──────┘                             │
├─────────────────────────────────────────────────────────────┤
│  Content (conditional based on activeTab)                   │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  ListItem[] (mapped from filtered data)               │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │  ListItem (avatar, title, meta, actions)        │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│  Pagination (if applicable)                                 │
└─────────────────────────────────────────────────────────────┘
```

---

## 6. State Management Architecture

### 6.1 Store Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                        REDUX STORE                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  userRoleSlice                                            │  │
│  │  ├── role: "buyer" | "seller"                             │  │
│  │  ├── setUserRole(role)                                    │  │
│  │  ├── toggleUserRole()                                     │  │
│  │  ├── switchToBuyer()                                      │  │
│  │  └── switchToSeller()                                     │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  productsSlice                                            │  │
│  │  ├── products: ProductData[]                              │  │
│  │  ├── total: number                                        │  │
│  │  ├── page: number                                         │  │
│  │  ├── totalPages: number                                   │  │
│  │  ├── loading: boolean                                     │  │
│  │  ├── error: string | null                                 │  │
│  │  ├── filters: FilterState                                 │  │
│  │  ├── sortBy: string                                       │  │
│  │  ├── selectedProduct: ProductData | null                  │  │
│  │  ├── relatedProducts: ProductData[]                       │  │
│  │  ├── fetchProducts(params)                                │  │
│  │  └── fetchProductById(id)                                 │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  overviewSlice                                            │  │
│  │  ├── stats: OverviewStats                                 │  │
│  │  ├── inspiredByBids: InspiredByBidProduct[]               │  │
│  │  ├── liveAuctionStartingSoon: LiveAuctionItem[]           │  │
│  │  ├── recentActivity: RecentActivityItem[]                 │  │
│  │  └── fetchOverview()                                      │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  myBidsSlice                                              │  │
│  │  ├── activeBids: BidItem[]                                │  │
│  │  ├── wonBids: BidItem[]                                   │  │
│  │  ├── lostBids: BidItem[]                                  │  │
│  │  ├── currentBids: BidItem[]                               │  │
│  │  ├── tabCounts: object                                    │  │
│  │  ├── total: number                                        │  │
│  │  ├── page: number                                         │  │
│  │  ├── totalPages: number                                   │  │
│  │  └── fetchMyBids({ tab, page, limit })                    │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  purchasesSlice                                           │  │
│  │  ├── toPay: PurchaseItem[]                                │  │
│  │  ├── toShip: PurchaseItem[]                               │  │
│  │  ├── inTransit: PurchaseItem[]                            │  │
│  │  ├── completed: PurchaseItem[]                            │  │
│  │  ├── currentItems: PurchaseItem[]                         │  │
│  │  ├── tabCounts: object                                    │  │
│  │  ├── setCurrentTab(tab)                                   │  │
│  │  └── fetchPurchases()                                     │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  listingsSlice                                            │  │
│  │  ├── listings: Listing[]                                  │  │
│  │  ├── allListings: Listing[]                               │  │
│  │  ├── selectedListing: ListingDetail | null                │  │
│  │  ├── tabCounts: object                                    │  │
│  │  ├── loading: boolean                                     │  │
│  │  ├── detailLoading: boolean                               │  │
│  │  ├── fetchListings({ tab })                               │  │
│  │  ├── fetchListingDetail(id)                               │  │
│  │  └── clearSelectedListing()                               │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 6.2 Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           DATA FLOW: Product Listing                            │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  User Interaction                                                               │
│       │                                                                         │
│       ▼                                                                         │
│  ┌─────────────────┐                                                            │
│  │ Component        │ ProductsPage.tsx                                          │
│  │ useEffect        │                                                           │
│  └────────┬────────┘                                                            │
│           │                                                                     │
│           ▼                                                                     │
│  ┌─────────────────┐                                                            │
│  │ dispatch         │ Redux dispatch                                            │
│  │ (fetchProducts)  │                                                           │
│  └────────┬────────┘                                                            │
│           │                                                                     │
│           ▼                                                                     │
│  ┌─────────────────┐                                                            │
│  │ Redux Thunk      │ productsSlice.ts                                          │
│  │ createAsyncThunk │                                                           │
│  └────────┬────────┘                                                            │
│           │                                                                     │
│           ▼                                                                     │
│  ┌─────────────────┐                                                            │
│  │ fetch()          │ HTTP GET                                                   │
│  │ /api/products    │ /api/products?page=1&limit=12&category=watches            │
│  └────────┬────────┘                                                            │
│           │                                                                     │
│           ▼                                                                     │
│  ┌─────────────────┐                                                            │
│  │ API Route        │ route.ts                                                  │
│  │ Handler          │                                                           │
│  └────────┬────────┘                                                            │
│           │                                                                     │
│           ▼                                                                     │
│  ┌─────────────────┐                                                            │
│  │ Read JSON        │ products.json                                             │
│  │ + Transform      │ filter → sort → paginate → aggregate                      │
│  └────────┬────────┘                                                            │
│           │                                                                     │
│           ▼                                                                     │
│  ┌─────────────────┐                                                            │
│  │ NextResponse     │ JSON response                                             │
│  │ .json(data)      │ { products: [...], total, page, totalPages }              │
│  └────────┬────────┘                                                            │
│           │                                                                     │
│           ▼                                                                     │
│  ┌─────────────────┐                                                            │
│  │ Reducer          │ productsSlice.ts                                          │
│  │ fulfilled case   │ state.products = action.payload.products                  │
│  └────────┬────────┘                                                            │
│           │                                                                     │
│           ▼                                                                     │
│  ┌─────────────────┐                                                            │
│  │ Store Update     │ Redux store notified                                      │
│  └────────┬────────┘                                                            │
│           │                                                                     │
│           ▼                                                                     │
│  ┌─────────────────┐                                                            │
│  │ Component        │ useAppSelector reads new state                            │
│  │ Re-render        │ ProductsGrid re-renders with new products                 │
│  └─────────────────┘                                                            │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 7. API Architecture

### 7.1 Endpoint Registry

| Method | Endpoint | Handler | Description |
|---|---|---|---|
| GET | `/api/products` | `route.ts` | Paginated product listing with filters |
| GET | `/api/products/[id]` | `[id]/route.ts` | Single product detail + related |
| GET | `/api/overview` | `route.ts` | Buyer dashboard aggregation |
| GET | `/api/my-bids` | `route.ts` | Bid history by tab |
| GET | `/api/purchases` | `route.ts` | Purchase history by status |
| GET | `/api/listings` | `route.ts` | Seller listings by tab |

### 7.2 Query Parameters

```
GET /api/products
├── page: number          (default: 1)
├── limit: number         (default: 12)
├── category: string      (art|watches|cars|jewellery|fashion|collectibles|antiques|shoes|bags)
├── auctionType: string   (timed|live|upcoming)
├── priceMin: number
├── priceMax: number
├── location: string      (uk|usa|europe)
├── condition: string     (new|used|restored|forparts)
├── auctionHouses: string (Christie's|Sotheby's|Bonhams|...)
├── search: string        (title search)
└── sortBy: string        (price-asc|price-desc|bids|newest)

GET /api/products/[id]
└── (path param only)

GET /api/overview
└── (no params)

GET /api/my-bids
├── tab: string           (active|won|lost)
├── page: number
└── limit: number

GET /api/purchases
└── status: string        (toPay|toShip|inTransit|completed)

GET /api/listings
├── tab: string           (timed|live|sold|draft)
└── id: number            (optional, for detail)
```

### 7.3 Response Schemas

```typescript
// GET /api/products
interface ProductsResponse {
  products: ProductData[];
  total: number;
  page: number;
  totalPages: number;
}

// GET /api/products/[id]
interface ProductDetailResponse {
  product: ProductData;
  relatedProducts: ProductData[];
}

// GET /api/overview
interface OverviewResponse {
  stats: {
    currentlyBidding: number;
    saved: number;
    needsPayment: number;
    spent: number;
  };
  inspiredByBids: InspiredByBidProduct[];
  liveAuctionStartingSoon: LiveAuctionItem[];
  recentActivity: RecentActivityItem[];
}

// GET /api/my-bids
interface MyBidsResponse {
  bids: BidItem[];
  tabCounts: {
    active: number;
    won: number;
    lost: number;
  };
  total: number;
  page: number;
  totalPages: number;
}

// GET /api/purchases
interface PurchasesResponse {
  toPay: PurchaseItem[];
  toShip: PurchaseItem[];
  inTransit: PurchaseItem[];
  completed: PurchaseItem[];
  tabCounts: {
    toPay: number;
    toShip: number;
    inTransit: number;
    completed: number;
  };
}

// GET /api/listings
interface ListingsResponse {
  listings: Listing[];
  tabCounts: {
    timed: number;
    live: number;
    sold: number;
    draft: number;
  };
}
```

---

## 8. Routing Architecture

### 8.1 Route Map

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              ROUTE HIERARCHY                                    │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  / (Root)                                                                       │
│  ├── /home                          [Buyer Home]                                │
│  ├── /products                      [Product Catalog]                           │
│  │   └── /[title]                   [Product Detail]                            │
│  │       └── /live                  [Live Auction]                              │
│  ├── /overviews                     [Buyer Dashboard]                           │
│  ├── /my-bids                       [Bid Management]                            │
│  ├── /purchases                     [Purchase Tracking]                         │
│  ├── /messages                      [Messaging]                                 │
│  ├── /profile-settings              [Profile Settings]                          │
│  ├── /how-it-works                  [How It Works]                              │
│  │                                                                               │
│  └── (seller)                       [Route Group - no URL prefix]               │
│      ├── /seller-home               [Seller Landing]                            │
│      ├── /overview                  [Seller Dashboard]                          │
│      ├── /create-lot                [Lot Creation Wizard]                       │
│      ├── /listing-management        [Listing Management]                        │
│      │   └── /[id]                  [Listing Detail]                            │
│      └── /sales-analytics           [Sales Analytics]                           │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### 8.2 Route Categories

| Category | Routes | Access |
|---|---|---|
| **Buyer** | `/home`, `/products/*`, `/overviews`, `/my-bids`, `/purchases`, `/messages`, `/profile-settings`, `/how-it-works` | Buyer role |
| **Seller** | `/seller-home`, `/overview`, `/create-lot`, `/listing-management/*`, `/sales-analytics` | Seller role |
| **Shared** | `/` (root) | Both roles |

### 8.3 Dynamic Routes

| Pattern | Parameter | Example |
|---|---|---|
| `/products/[title]` | `title` (slug) | `/products/rolex-submariner` |
| `/products/[title]/live` | `title` (slug) | `/products/rolex-submariner/live` |
| `/listing-management/[id]` | `id` (number) | `/listing-management/12345` |

---

## 9. Design System

### 9.1 Color System

```
┌─────────────────────────────────────────────────────────────────┐
│                        COLOR TOKENS                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Primary Palette                                                │
│  ├── --primary:      oklch(0.205 0 0)    # Near-black          │
│  ├── --secondary:    oklch(0.97 0 0)     # Near-white          │
│  ├── --tertiary:     #1c1c1c59           # 35% black           │
│  └── --accent:       #6C63FF             # Indigo/purple       │
│                                                                 │
│  Background Palette                                             │
│  ├── --bg-color:     #ffffff             # Page background     │
│  ├── --card-bg:      #f6f6f7             # Card surfaces       │
│  └── --link-color:   #007aff             # Link accent         │
│                                                                 │
│  Semantic Tokens                                                │
│  ├── --muted:             oklch(0.97 0 0)                      │
│  ├── --muted-foreground:  oklch(0.556 0 0)                     │
│  ├── --border:            oklch(0.922 0 0)                     │
│  ├── --destructive:       oklch(0.577 0.245 27.325)            │
│  └── --ring:              oklch(0.708 0 0)                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 9.2 Typography Scale

```
┌─────────────────────────────────────────────────────────────────┐
│                        TYPOGRAPHY                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Font Families                                                  │
│  ├── Sans:  Geist (var(--font-geist-sans))                     │
│  └── Mono:  Geist Mono (var(--font-geist-mono))                │
│                                                                 │
│  Type Scale                                                     │
│  ├── Hero:      text-3xl md:text-4xl xl:text-5xl              │
│  │              font-bold font-serif italic                     │
│  │                                                              │
│  ├── H1:        text-2xl md:text-3xl font-semibold            │
│  ├── H2:        text-xl md:text-2xl font-semibold             │
│  ├── H3:        text-base md:text-lg font-semibold            │
│  │                                                              │
│  ├── Body:      text-sm                                         │
│  ├── Small:     text-xs                                         │
│  ├── Caption:   text-[10px]                                     │
│  │                                                              │
│  ├── Label:     text-xs font-semibold uppercase tracking-widest│
│  └── Meta:      text-xs text-tertiary                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 9.3 Spacing & Layout

```
┌─────────────────────────────────────────────────────────────────┐
│                      LAYOUT SYSTEM                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Max Width                                                      │
│  └── max-w-625 mx-auto (root layout constraint)                │
│                                                                 │
│  Page Padding                                                   │
│  └── px-2 md:px-4 xl:px-6                                     │
│                                                                 │
│  Section Spacing                                                │
│  ├── mb-8  (small sections)                                    │
│  └── mb-12 (large sections)                                    │
│                                                                 │
│  Card System                                                    │
│  ├── Border:   border border-gray-100                          │
│  ├── Radius:   rounded-xl (10px)                               │
│  ├── Padding:  p-4 md:p-6                                     │
│  └── Shadow:   hover:shadow-md transition                      │
│                                                                 │
│  Button System                                                  │
│  ├── Primary:   bg-primary text-white rounded-none             │
│  ├── Secondary: bg-card-bg text-primary rounded-none           │
│  └── Ghost:     bg-transparent hover:bg-gray-100               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 9.4 Responsive Breakpoints

| Breakpoint | Width | Usage |
|---|---|---|
| `sm:` | 640px | Small tablets, stacked layouts |
| `md:` | 768px | Tablets, two-column layouts |
| `lg:` | 1024px | Desktop, full navigation |
| `xl:` | 1280px | Large screens, expanded spacing |
| `2xl:` | 1536px | Extra large screens |

---

## 10. Data Model

### 10.1 Entity Relationship Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                      ENTITY RELATIONSHIPS                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐         ┌──────────────┐                     │
│  │   Product    │         │   Category   │                     │
│  ├──────────────┤         ├──────────────┤                     │
│  │ id           │────────→│ name         │                     │
│  │ title        │         │ slug         │                     │
│  │ category     │         └──────────────┘                     │
│  │ ...          │                                              │
│  └──────┬───────┘                                              │
│         │                                                      │
│         ├──→ ┌──────────────┐                                  │
│         │    │ AuctionType  │                                  │
│         │    ├──────────────┤                                  │
│         │    │ timed        │                                  │
│         │    │ live         │                                  │
│         │    │ upcoming     │                                  │
│         │    └──────────────┘                                  │
│         │                                                      │
│         ├──→ ┌──────────────┐                                  │
│         │    │  Condition   │                                  │
│         │    ├──────────────┤                                  │
│         │    │ new          │                                  │
│         │    │ used         │                                  │
│         │    │ restored     │                                  │
│         │    │ forparts     │                                  │
│         │    └──────────────┘                                  │
│         │                                                      │
│         ├──→ ┌──────────────┐                                  │
│         │    │   Location   │                                  │
│         │    ├──────────────┤                                  │
│         │    │ uk           │                                  │
│         │    │ usa          │                                  │
│         │    │ europe       │                                  │
│         │    └──────────────┘                                  │
│         │                                                      │
│         └──→ ┌──────────────┐                                  │
│              │ AuctionHouse │                                  │
│              ├──────────────┤                                  │
│              │ Christie's   │                                  │
│              │ Sotheby's    │                                  │
│              │ Bonhams      │                                  │
│              │ ...          │                                  │
│              └──────────────┘                                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 10.2 Product Schema

```typescript
interface ProductData {
  id: string;                    // Unique identifier
  title: string;                 // Product name
  time: string;                  // Time remaining (e.g., "02d:08h:49sec")
  starting: number;              // Starting bid price (£)
  bids: number;                  // Number of bids placed
  highestBid: number;            // Current highest bid (£)
  img: string[];                 // Array of image URLs (4 per product)
  action: "timed" | "live" | "upcoming";  // Auction type
  category: string;              // Product category
  condition: string;             // Item condition
  location: string;              // Seller location
  auctionHouse: string;          // Auction house name
  description: string;           // Product description
  features: string[];            // Key features list
  color: string;                 // Item color
  gender: string;                // Target gender (men|women|unisex)
}
```

---

## 11. Build & Deployment

### 11.1 Build Pipeline

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                          BUILD PIPELINE                                          │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐      │
│  │   Source     │    │ TypeScript  │    │   Next.js   │    │   Output    │      │
│  │   Code       │───→│ Compilation │───→│ Optimization│───→│   .next/    │      │
│  │             │    │             │    │             │    │             │      │
│  └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘      │
│        │                  │                  │                  │               │
│        ▼                  ▼                  ▼                  ▼               │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐      │
│  │ .tsx/.ts    │    │ tsc --noEmit│    │ Webpack     │    │ Static      │      │
│  │ files       │    │ Type check  │    │ Bundle      │    │ Assets      │      │
│  │             │    │             │    │             │    │             │      │
│  └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘      │
│                                                                                 │
│  Steps:                                                                         │
│  1. TypeScript compilation (tsc)                                                │
│  2. ESLint linting                                                              │
│  3. Next.js optimization (minification, code splitting)                        │
│  4. Static page generation (SSG)                                                │
│  5. Build trace collection                                                      │
│  6. Output to .next/                                                            │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### 11.2 Deployment Architecture

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                        DEPLOYMENT ARCHITECTURE                                   │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐      │
│  │   GitHub     │    │   Vercel    │    │   CDN       │    │   Browser   │      │
│  │   Repository │───→│   Build     │───→│   Edge      │───→│   Client    │      │
│  │             │    │             │    │             │    │             │      │
│  └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘      │
│        │                  │                  │                  │               │
│        ▼                  ▼                  ▼                  ▼               │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐      │
│  │ git push    │    │ Automatic   │    │ Static      │    │ HTTPS       │      │
│  │ to main     │    │ build       │    │ assets      │    │ Access      │      │
│  │             │    │ & deploy    │    │ cached      │    │             │      │
│  └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘      │
│                                                                                 │
│  Environment:                                                                   │
│  ├── Runtime: Node.js 18+                                                       │
│  ├── Build: npm run build                                                       │
│  ├── Output: .next/                                                             │
│  └── Domain: gavellia-client.vercel.app                                         │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 12. Security Considerations

### 12.1 Current State

| Area | Status | Notes |
|---|---|---|
| **Authentication** | ❌ Not implemented | UI only, no actual auth |
| **Authorization** | ❌ Not implemented | No role-based access control |
| **Data Validation** | ⚠️ Partial | TypeScript types, no runtime validation |
| **XSS Protection** | ✅ Basic | React auto-escaping, CSP headers from Vercel |
| **CSRF Protection** | ❌ Not implemented | No forms requiring CSRF tokens |
| **Rate Limiting** | ❌ Not implemented | No API rate limiting |
| **HTTPS** | ✅ Enabled | Vercel provides SSL |

### 12.2 Recommended Security Layer

```
┌─────────────────────────────────────────────────────────────────┐
│                    SECURITY ARCHITECTURE                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Authentication Layer                                     │  │
│  │  ├── NextAuth.js / Auth.js                                │  │
│  │  ├── OAuth providers (Google, GitHub, Apple)              │  │
│  │  ├── Email/password authentication                        │  │
│  │  └── Session management (JWT/cookies)                     │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Authorization Layer                                      │  │
│  │  ├── Role-based access control (RBAC)                     │  │
│  │  ├── Middleware protection for routes                      │  │
│  │  └── API route guards                                     │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Data Validation                                          │  │
│  │  ├── Zod schema validation                                │  │
│  │  ├── Input sanitization                                   │  │
│  │  └── API request/response validation                      │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Rate Limiting                                            │  │
│  │  ├── API route rate limiting                              │  │
│  │  ├── Sliding window algorithm                             │  │
│  │  └── IP-based throttling                                  │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 13. Performance Considerations

### 13.1 Current Optimizations

| Technique | Status | Notes |
|---|---|---|
| **Code Splitting** | ✅ Automatic | Next.js automatic code splitting |
| **Static Generation** | ✅ Partial | Some pages SSG, most CSR |
| **Image Optimization** | ✅ Using next/image | Responsive images with lazy loading |
| **Bundle Analysis** | ⚠️ Not configured | No bundle analyzer |
| **Caching** | ⚠️ Minimal | Browser caching only |
| **Compression** | ✅ Enabled | Vercel gzip/brotli |

### 13.2 Performance Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    PERFORMANCE LAYERS                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Edge Layer (CDN)                                         │  │
│  │  ├── Static assets (images, JS, CSS)                     │  │
│  │  ├── Global edge caching                                  │  │
│  │  └── DDoS protection                                      │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Rendering Layer                                          │  │
│  │  ├── Static Site Generation (SSG) for product pages      │  │
│  │  ├── Incremental Static Regeneration (ISR) potential      │  │
│  │  └── Client-side rendering for dynamic content            │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Client Layer                                             │  │
│  │  ├── React 19 concurrent features                         │  │
│  │  ├── Lazy loading (React.lazy + Suspense)                 │  │
│  │  ├── Image lazy loading (next/image priority)             │  │
│  │  └── Virtual scrolling (for large lists)                  │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 14. Known Limitations

| Area | Limitation | Impact | Priority |
|---|---|---|---|
| **Data Layer** | Static JSON, no database | No persistence, no real-time | High |
| **Authentication** | UI only, no actual auth | No security, no sessions | High |
| **API** | Mock routes, no real backend | No production readiness | High |
| **Real-Time** | No WebSocket/SSE | Live auctions simulated | High |
| **File Upload** | Client-side only | No server storage | Medium |
| **Search** | In-memory filtering | No full-text search | Medium |
| **Caching** | No ISR/SSG configuration | Re-build required | Low |
| **Testing** | No test suite | No regression protection | Medium |

---

## 15. Future Architecture Roadmap

### Phase 1: Core Backend (Priority: High)
1. **Database** — PostgreSQL with Prisma ORM
2. **Authentication** — NextAuth.js with OAuth providers
3. **File Storage** — Cloudflare R2 / AWS S3
4. **API** — Replace mock routes with real database queries

### Phase 2: Real-Time Features (Priority: High)
5. **WebSocket** — Socket.io for live auction bidding
6. **Notifications** — Push notifications for bid updates
7. **Live Updates** — Server-Sent Events for real-time data

### Phase 3: Enhanced Features (Priority: Medium)
8. **Search** — Elasticsearch / Algolia integration
9. **Payment** — Stripe integration for secure transactions
10. **Shipping** — Integration with shipping providers
11. **Email** — Transactional email system

### Phase 4: Optimization (Priority: Low)
12. **Testing** — Vitest (unit), Playwright (E2E)
13. **Monitoring** — Sentry error tracking, Vercel Analytics
14. **Performance** — Bundle analysis, lazy loading optimization
15. **SEO** — Structured data, sitemap generation

---

*Document Version: 2.0*
*Last Updated: July 2026*
*Author: Gavellia Engineering Team*
