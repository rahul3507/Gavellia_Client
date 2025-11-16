<!-- @format -->

# Gavellia

> A modern online auction platform for buying and selling premium goods through real-time and timed bidding.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://gavellia-client.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-15.5-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## 🌐 Live Application

**[Visit Gavellia](https://gavellia-client.vercel.app/)**

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development](#development)
  - [Build & Deployment](#build--deployment)
- [Project Structure](#project-structure)
- [User Roles](#user-roles)
- [Core Functionality](#core-functionality)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

Gavellia is a sophisticated e-commerce platform that enables users to buy and sell products through competitive bidding processes. The platform offers a seamless auction experience with support for both timed auctions and live bidding sessions, catering to a diverse range of product categories including fashion, electronics, collectibles, and luxury items.

### Key Highlights

- **Multi-Role System**: Support for individual buyers, professional buyers, and sellers
- **Dynamic Bidding**: Real-time and timed auction mechanisms
- **Role Flexibility**: Seamless switching between buyer and seller roles
- **Modern UI/UX**: Responsive design optimized for all devices
- **Type-Safe**: Built with TypeScript for enhanced reliability

## ✨ Features

### User Management

- **Flexible Registration**: Sign up as an individual buyer, professional buyer, or seller
- **Authentication System**: Secure login with role-based access control
- **Profile Management**: Complete user profile with business and personal information
- **Document Verification**: ID and business document upload for sellers

### Auction Capabilities

- **Timed Auctions**: Set duration-based bidding with countdown timers
- **Live Auctions**: Real-time bidding sessions with instant updates
- **Bid Management**: Place, track, and manage bids across multiple auctions
- **Bid Sheets**: Comprehensive bid history and participant tracking

### Product Features

- **Lot Creation**: Intuitive multi-step process for creating auction lots
- **Image Management**: Upload and manage product images
- **Pricing Controls**: Set starting bids, reserves, and buy-now prices
- **Category Support**: Fashion, electronics, collectibles, luxury items, and more

### User Experience

- **Role Switching**: Seamlessly switch between buyer and seller modes
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile
- **Interactive UI**: Modern animations and transitions
- **Navigation**: Intuitive routing with conditional rendering based on user role

## 🛠 Technology Stack

### Frontend Framework

- **[Next.js 15.5](https://nextjs.org/)** - React framework with server-side rendering and static generation
- **[React 19.1](https://reactjs.org/)** - Component-based UI library
- **[TypeScript 5.x](https://www.typescriptlang.org/)** - Static type checking

### State Management

- **[Redux Toolkit 2.9](https://redux-toolkit.js.org/)** - Predictable state container
- **[React Redux 9.2](https://react-redux.js.org/)** - Official React bindings for Redux

### UI & Styling

- **[Tailwind CSS 4.x](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible UI primitives
- **[Shadcn UI](https://ui.shadcn.com/)** - Re-usable component library
- **[Lucide React](https://lucide.dev/)** - Icon library
- **[Embla Carousel](https://www.embla-carousel.com/)** - Lightweight carousel library
- **[Motion](https://motion.dev/)** - Animation library

### Additional Libraries

- **[React Icons](https://react-icons.github.io/react-icons/)** - Icon collection
- **[Class Variance Authority](https://cva.style/)** - CSS class variance management
- **[clsx](https://github.com/lukeed/clsx)** & **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** - Conditional class utilities

### Development Tools

- **[ESLint](https://eslint.org/)** - Code linting and quality
- **[PostCSS](https://postcss.org/)** - CSS transformations

## 🚀 Getting Started

### Prerequisites

- **Node.js**: Version 18.x or higher
- **npm** or **yarn**: Package manager
- **Git**: Version control

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/rahul3507/Gavellia_Client.git
   cd Gavellia_Client
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

### Development

Start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`.

### Build & Deployment

**Build for production:**

```bash
npm run build
# or
yarn build
```

**Run production build locally:**

```bash
npm start
# or
yarn start
```

**Linting:**

```bash
npm run lint
# or
yarn lint
```

## 📁 Project Structure

```
Gavellia_client/
├── public/              # Static assets
│   └── productImage/    # Product images
├── src/
│   ├── app/             # Next.js app router pages
│   │   ├── create-lot/  # Lot creation flow
│   │   ├── home/        # Buyer home page
│   │   ├── products/    # Product listings and details
│   │   └── seller-home/ # Seller dashboard
│   ├── components/      # React components
│   │   ├── common/      # Shared components (Navbar, Footer, etc.)
│   │   ├── ui/          # Shadcn UI components
│   │   ├── createLotComponents/   # Lot creation components
│   │   ├── homeComponents/        # Home page components
│   │   └── productsComponents/    # Product-related components
│   ├── contexts/        # React contexts
│   ├── data/            # Static data and mock data
│   ├── lib/             # Utility functions
│   ├── redux/           # Redux store and slices
│   │   ├── api/         # API integration (RTK Query)
│   │   └── feature/     # Redux slices
│   └── types/           # TypeScript type definitions
├── components.json      # Shadcn UI configuration
├── next.config.ts       # Next.js configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── tsconfig.json        # TypeScript configuration
```

## 👥 User Roles

### Individual Buyer

- Browse and search product listings
- Participate in auctions
- Place bids on items
- Track bid history

### Professional Buyer

- All individual buyer features
- Business information management
- Enhanced purchasing capabilities

### Seller

- Create and manage auction lots
- Upload product images and details
- Set pricing and auction parameters
- Monitor active auctions and bids
- Business verification and tax information

## 🔧 Core Functionality

### Authentication Flow

Multi-step registration process including:

- Email verification
- Account type selection
- Personal information
- Address details
- Business information (for sellers)
- Government ID verification
- Tax information
- Document upload

### Lot Creation

Sellers can create auction lots through a guided process:

1. **Lot Details**: Product information and description
2. **Image Upload**: Multiple product images
3. **Pricing & Auction Type**: Set starting bid, reserve, and auction format
4. **Review & Publish**: Final review before going live

### Bidding System

- Real-time bid updates
- Bid sheet with participant information
- Automatic bid validation
- Bid history tracking
- Winner notification

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ by the Gavellia Team**

For questions or support, please [open an issue](https://github.com/rahul3507/Gavellia_Client/issues).
