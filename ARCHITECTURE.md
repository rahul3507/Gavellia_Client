# Gavellia — System Architecture

## 1. Executive Summary

Gavellia is a premium auction marketplace built with Next.js 15 (App Router), React 19, TypeScript, and Redux Toolkit. It supports dual user roles (buyer/seller) with real-time and timed auction capabilities across luxury product categories.

**Current State:** The application operates with a mock API layer backed by static JSON data. All server-side logic reads from a single `products.json` file and transforms data in-memory. No external database or third-party API integrations are present.

---

## 2. High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                          CLIENT (Browser)                           │
├─────────────────────────────────────────────────────────────────────┤
│  Next.js App Router  │  React 19  │  Redux Toolkit  │  Tailwind   │
├─────────────────────────────────────────────────────────────────────┤
│                         API ROUTES (Server)                         │
├─────────────────────────────────────────────────────────────────────┤
│                      products.json (Static Data)                    │
└─────────────────────────────────────────────────────────────────────┘
```

### Architectural Pattern

**Client-Heavy SPA with Server-Side Mock API**

- The frontend handles all routing, state management, and UI rendering
- API routes serve as a mock backend, reading static JSON and returning transformed data
- No server-side rendering (SSR) is utilized beyond the default Next.js behavior
- No database, authentication service, or external APIs are integrated

---

## 3. Technology Stack

### Core

| Technology | Version | Role |
|---|---|---|
| Next.js | 15.5.7 | Framework, routing, API routes, build system |
| React | 19.1.0 | Component rendering, UI library |
| TypeScript | 5.x | Type safety, developer experience |

### State Management

| Technology | Version | Role |
|---|---|---|
| Redux Toolkit | 2.9.0 | State container, async thunks, slices |
| React Redux | 9.2.0 | React-Redux bindings, typed hooks |

### UI Layer

| Technology | Version | Role |
|---|---|---|
| Tailwind CSS | 4.x | Utility-first styling, design tokens |
| shadcn/ui | — | Pre-built component library (New York style) |
| Radix UI | Various | Unstyled accessible primitives |
| Recharts | 3.7.0 | Data visualization (charts) |
| Motion | 12.x | Animations and transitions |
| Embla Carousel | 8.6.0 | Carousel/slider component |
| Lucide React | 0.541.0 | Icon system |
| React Icons | 5.5.0 | Additional brand icons |

### Utilities

| Package | Purpose |
|---|---|
| clsx | Conditional class name construction |
| tailwind-merge | Tailwind class deduplication |
| class-variance-authority (CVA) | Component variant definitions |

---

## 4. Directory Structure

```
src/
├── app/                          # Next.js App Router (routes + API)
│   ├── layout.tsx                # Root layout (fonts, providers, navbar, footer)
│   ├── page.tsx                  # Root page (role-based: buyer → home, seller → seller-home)
│   ├── globals.css               # Tailwind imports, CSS variables, theme tokens
│   ├── loading.tsx               # Global loading skeleton
│   ├── error.tsx                 # Global error boundary
│   │
│   ├── [Buyer Routes]            # 11 buyer-facing pages
│   ├── (seller)/                 # 5 seller routes (route group, no URL prefix)
│   └── api/                      # 6 mock API endpoints
│
├── components/                   # React component tree
│   ├── ui/                       # 19 shadcn/ui primitives
│   ├── common/                   # Shared components + auth flow (12 steps)
│   ├── [Page-Specific Folders]   # 12 page-specific component directories
│   └── SellerAllComponents/      # 6 seller feature modules
│
├── redux/                        # State management
│   ├── store.ts                  # Store configuration
│   ├── Providers.tsx             # Provider wrapper
│   ├── hooks.ts                  # Typed hooks
│   └── feature/                  # 6 Redux slices
│
├── types/                        # TypeScript definitions
│   └── allTypes.ts               # All shared interfaces and types
│
├── data/                         # Static data
│   └── products.json             # Mock product database
│
└── lib/                          # Utilities
    └── utils.ts                  # cn() class merge function
```

---

## 5. Routing Architecture

### Page Routes (17 total)

```
/                               → Role-based redirect (buyer/seller)
/home                           → Buyer home (hero cards, product grid)
/products                       → Product catalog (filters, categories, pagination)
/products/[title]               → Product detail (timed auction)
/products/[title]/live          → Product detail (live auction)
/overviews                      → Buyer dashboard
/my-bids                        → Bid management (active/won/lost)
/purchases                      → Purchase tracking (4 statuses)
/messages                       → Messaging system
/profile-settings               → User profile settings
/how-it-works                   → Educational content page

/seller-home                    → Seller landing page
/overview                       → Seller dashboard (stats, revenue, activity)
/create-lot                     → Multi-step lot creation wizard
/listing-management             → Listing management (4 tabs)
/listing-management/[id]        → Individual listing detail
/sales-analytics                → Revenue charts and analytics
```

### Route Groups

The `(seller)` route group contains all seller-side pages. This allows shared layouts without adding a URL segment prefix, keeping URLs clean (`/overview` instead of `/seller/overview`).

---

## 6. State Management Architecture

### Store Structure

```
Redux Store
├── userRole          → { role: "buyer" | "seller" }
├── products          → { products[], filters, pagination, selectedProduct, ... }
├── overview          → { stats, inspiredByBids[], liveAuctionStartingSoon[], recentActivity[] }
├── myBids            → { activeBids[], wonBids[], lostBids[], tabCounts, pagination }
├── purchases         → { toPay[], toShip[], inTransit[], completed[], tabCounts }
└── listings          → { listings[], selectedListing, tabCounts, participants[] }
```

### Data Flow Pattern

```
Component Dispatches Action
        │
        ▼
Redux Thunk (async)
        │
        ▼
API Route (GET /api/...)
        │
        ▼
products.json (read + transform)
        │
        ▼
Response → Reducer → Store Update → Component Re-render
```

### Slice Responsibilities

| Slice | Sync Actions | Async Thunks | State Complexity |
|---|---|---|---|
| `userRole` | `setUserRole`, `toggleUserRole`, `switchToBuyer`, `switchToSeller` | None | Low |
| `products` | `setFilter`, `setSortBy`, `setPage`, `clearFilters`, `toggleArrayFilter` | `fetchProducts`, `fetchProductById` | High |
| `overview` | None | `fetchOverview` | Medium |
| `myBids` | None | `fetchMyBids` | Medium |
| `purchases` | `setCurrentTab` | `fetchPurchases` | Medium |
| `listings` | `clearSelectedListing` | `fetchListings`, `fetchListingDetail` | High |

---

## 7. Component Architecture

### Component Hierarchy

```
RootLayout
├── Navbar                    (role-aware navigation)
├── [Page Content]            (role-based routing)
│   └── PageComponent
│       ├── SectionComponents (cards, grids, forms)
│       └── UI Primitives     (shadcn/ui)
└── ConditionalFooter         (context-dependent rendering)
```

### Component Patterns

**Pattern 1: Page → Content → Feature**

```
app/products/page.tsx          → Thin wrapper
  └── ProductsPage.tsx         → Layout + data fetching
      ├── CategoryTabs         → Feature component
      ├── FilterSidebar        → Feature component
      ├── ProductsGrid         → Feature component
      └── Pagination           → Feature component
```

**Pattern 2: Multi-Step Wizards**

```
CreateLotRanderPage
├── StepIndicator              → Progress tracker
├── LotDetails                 → Step 1
├── UploadImage                → Step 2
├── PricingAndAuctionType      → Step 3
├── Publish                    → Step 4
└── Success                    → Completion
```

**Pattern 3: Tab-Based Views**

```
TabBar → Content Component → ListItem Components
```

Used in: My Bids (active/won/lost), Purchases (4 statuses), Listings (timed/live/sold/draft)

---

## 8. API Architecture

### Endpoint Design

All endpoints are GET-only and follow REST conventions:

```
GET /api/products              → Collection with query params
GET /api/products/[id]         → Single resource
GET /api/overview              → Dashboard aggregation
GET /api/my-bids               → Filtered collection
GET /api/purchases             → Grouped collection
GET /api/listings              → Filtered collection (supports ?id= for detail)
```

### Query Parameters

| Endpoint | Parameters |
|---|---|
| `/api/products` | `page`, `limit`, `category`, `auctionType`, `priceMin`, `priceMax`, `location`, `condition`, `auctionHouses`, `search`, `sortBy` |
| `/api/my-bids` | `tab` (active/won/lost), `page`, `limit` |
| `/api/purchases` | `status` (toPay/toShip/inTransit/completed) |
| `/api/listings` | `tab` (timed/live/sold/draft), `id` (for detail) |

### Data Transformation

API routes perform in-memory transformations:
- Filtering by multiple criteria
- Pagination with total counts
- Sorting by various fields
- Aggregation for dashboard stats
- Relationship resolution (related products by category)

---

## 9. Design System

### Color Tokens (OKLCH)

| Token | Value | Usage |
|---|---|---|
| `--primary` | `oklch(0.205 0 0)` | Near-black — primary text, buttons, backgrounds |
| `--secondary` | `oklch(0.97 0 0)` | Near-white — secondary backgrounds |
| `--tertiary` | `#1c1c1c59` | 35% black — muted labels |
| `--bg-color` | `#ffffff` | Pure white — page background |
| `--card-bg` | `#f6f6f7` | Light gray — card surfaces |
| `--link-color` | `#007aff` | Blue — link accent |

**Accent:** `#6C63FF` (indigo/purple) — active states, gradients, highlights

### Typography

| Usage | Pattern |
|---|---|
| Page titles | `text-3xl md:text-4xl font-bold font-serif italic` |
| Section headings | `text-xl md:text-2xl font-semibold` |
| Card titles | `text-sm font-bold tracking-tight` |
| Body text | `text-sm text-primary/80` |
| Uppercase labels | `text-xs font-semibold uppercase tracking-widest` |

### Spacing & Layout

- **Max width:** `max-w-625 mx-auto` (root layout)
- **Page padding:** `px-2 md:px-4 xl:px-6`
- **Section margin:** `mb-8` to `mb-12`
- **Card radius:** `rounded-xl` (10px)
- **Button radius:** `rounded-none` (sharp corners for CTAs)

### Responsive Breakpoints

| Breakpoint | Usage |
|---|---|
| `sm:` | Small tablets, stacked layouts |
| `md:` | Tablets, two-column layouts |
| `lg:` | Desktop, full navigation |
| `xl:` | Large screens, expanded spacing |

---

## 10. Data Model

### Product Schema

```typescript
interface ProductData {
  id: number;
  title: string;
  time: string;
  starting: number;
  bids: number;
  highestBid: number;
  img: string[];
  action: "timed" | "live" | "upcoming";
  category: string;
  condition: string;
  location: string;
  auctionHouse: string;
  description: string;
  features: string[];
}
```

### Key Relationships

```
Product ──┬── Category (string enum)
          ├── AuctionType (timed | live | upcoming)
          ├── Condition (string enum)
          ├── AuctionHouse (string enum)
          └── Location (string enum)
```

---

## 11. Build & Deployment

### Build Pipeline

```
TypeScript Compilation → Next.js Optimization → Static Export → Vercel Deployment
```

### Environment

- **Runtime:** Node.js 18+
- **Package Manager:** npm
- **Deployment:** Vercel (automatic from Git)
- **Build Command:** `npm run build`
- **Output:** `.next/` directory

---

## 12. Known Architectural Limitations

| Area | Limitation | Impact |
|---|---|---|
| **Data Layer** | Static JSON, no database | No persistence, no real-time updates |
| **Authentication** | UI only, no actual auth | No security, no session management |
| **API** | Mock routes, no real backend | No production readiness |
| **Real-Time** | No WebSocket/SSE integration | Live auctions are simulated |
| **File Upload** | Client-side only | No server storage |
| **Search** | In-memory filtering only | No full-text search capability |

---

## 13. Future Architecture Considerations

1. **Backend Integration** — Replace mock API routes with a real backend (REST/GraphQL)
2. **Authentication** — Implement NextAuth.js or similar for session management
3. **Real-Time** — Add WebSocket support for live auction bidding
4. **Database** — Integrate PostgreSQL/MongoDB for persistent data
5. **File Storage** — Add S3/Cloudflare R2 for product images
6. **Search** — Integrate Elasticsearch or Algolia for product search
7. **Caching** — Implement ISR/SSG for product pages
8. **Testing** — Add unit tests (Vitest), integration tests, E2E tests (Playwright)

---

*Document Version: 1.0*
*Last Updated: July 2026*
