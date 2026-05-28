# Order Tracker Client

A modern, real-time order tracking application built with **Next.js 16**, **React 19**, and **Socket.IO**. The client enables users to browse food items, place orders, track order status in real-time, and provides an admin dashboard for order management.

---

## 🎯 Project Overview

Order Tracker Client is a full-featured food ordering platform with:
- **User authentication** with JWT-based secure sessions
- **Real-time order updates** via WebSocket (Socket.IO)
- **Admin dashboard** for managing orders and updating statuses
- **Responsive UI** with Tailwind CSS and shadcn/ui components
- **Type-safe development** with TypeScript
- **Production-ready** architecture with middleware authentication

---

## 🏗️ Tech Stack

### Core Framework
- **Next.js 16.2.6** - React meta-framework with App Router
- **React 19.2.4** - UI library
- **TypeScript 5** - Type safety

### Styling & UI
- **Tailwind CSS 4** - Utility-first CSS framework
- **shadcn/ui** - High-quality component library
- **Lucide React** - Icon library

### Real-time Communication
- **Socket.IO Client 4.8.3** - WebSocket library for live updates

### API & Authentication
- **jsonwebtoken** - JWT token handling
- **Native Fetch API** - HTTP requests with custom wrapper

### Utilities
- **Sonner** - Toast notifications
- **clsx** - Conditional className utility
- **Tailwind Merge** - Merge Tailwind classes

### Development Tools
- **ESLint 9** - Code linting
- **pnpm 10.24.0** - Package manager

---

## 📂 Project Structure

```
order-tracker-client/
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── (commonLayout)/       # Shared layout routes
│   │   │   ├── layout.tsx        # Common layout wrapper
│   │   │   ├── page.tsx          # Home page
│   │   │   ├── admin/            # Admin routes
│   │   │   │   ├── page.tsx      # Admin dashboard
│   │   │   ├── food/             # Food browsing routes
│   │   │   │   ├── page.tsx      # Food list
│   │   │   │   └── [id]/         # Food details (dynamic)
│   │   │   └── orders/           # User orders routes
│   │   │       └── page.tsx      # My orders
│   │   ├── auth/                 # Authentication
│   │   │   └── page.tsx          # Login/Register
│   │   ├── layout.tsx            # Root layout
│   │   └── globals.css           # Global styles
│   │
│   ├── components/               # Reusable React components
│   │   ├── admin/                # Admin-specific components
│   │   │   ├── AdminOrders.tsx   # Admin orders list
│   │   │   ├── OrderCard.tsx     # Order display card
│   │   │   └── OrderDialog.tsx   # Order detail modal
│   │   ├── food/                 # Food-related components
│   │   │   ├── Foods.tsx         # Food list container
│   │   │   ├── FoodCard.tsx      # Individual food item
│   │   │   └── FoodDetails.tsx   # Detailed food view
│   │   ├── user/                 # User-specific components
│   │   │   ├── MyOrders.tsx      # User orders list
│   │   │   ├── OrderCard.tsx     # Order card for users
│   │   │   └── ProgressBar.tsx   # Order status progress
│   │   ├── auth/                 # Auth components
│   │   │   └── Auth.tsx          # Login/Register form
│   │   ├── home/                 # Home page components
│   │   │   └── Hero.tsx          # Hero section
│   │   ├── additionals/          # Navigation components
│   │   │   └── Navbar.tsx        # Navigation bar
│   │   ├── ui/                   # UI component library
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── select.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── textarea.tsx
│   │   │   └── label.tsx
│   │   └── examples/              # Example components
│   │       └── SocketIOExample.tsx
│   │
│   ├── contexts/                 # React Context providers
│   │   └── SocketContext.tsx     # Socket.IO context provider
│   │
│   ├── hooks/                    # Custom React hooks
│   │   └── useSocketIO.ts        # Socket event management hook
│   │
│   ├── services/                 # API service layer
│   │   ├── auth.services.ts      # Authentication API
│   │   ├── food.services.ts      # Food API
│   │   └── order.services.ts     # Order API
│   │
│   ├── lib/                      # Utility libraries
│   │   ├── apis.ts               # HTTP request wrapper
│   │   ├── socket.ts             # Socket.IO initialization
│   │   └── utils.ts              # General utilities
│   │
│   ├── constants/                # Application constants
│   │   └── data.ts               # Types and constants
│   │
│   ├── utils/                    # Helper utilities
│   │   └── verifyToken.ts        # JWT verification
│   │
│   └── proxy.ts                  # Middleware for auth protection
│
├── public/                       # Static assets
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript configuration
├── next.config.ts                # Next.js configuration
├── postcss.config.mjs            # PostCSS configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── eslint.config.mjs             # ESLint configuration
└── components.json               # shadcn/ui configuration
```

---

## 🚀 Features

### User Features
- **Authentication**: Secure login/register with JWT tokens
- **Browse Food**: View available food items with filters
- **Place Orders**: Add items to cart and place orders
- **Track Orders**: Real-time order status updates
- **Order History**: View past orders and details

### Admin Features
- **Dashboard**: View all orders
- **Order Management**: Update order status (ORDERED → IN_PROGRESS → DELIVERY → COMPLETED)
- **Real-time Notifications**: See new orders as they come in
- **Cancel Orders**: Ability to cancel orders if needed

### Technical Features
- **Real-time Updates**: WebSocket-based socket.io for instant updates
- **Type Safety**: Full TypeScript support
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Error Handling**: Comprehensive error messages with toast notifications
- **Authentication Middleware**: Protected routes with token verification

---

## 🛠️ Getting Started

### Prerequisites
- **Node.js** >= 18
- **pnpm** >= 10.24.0 (recommended) or npm/yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd order-tracker-client
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up environment variables** (see [Environment Variables](#-environment-variables) section)
   ```bash
   cp .env.example .env.local
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   ```

   The application will be available at `http://localhost:3000`

---

## 🔧 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Socket.IO Configuration
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
```

### Variable Descriptions
- `NEXT_PUBLIC_API_URL`: Backend API base URL (must be public for client-side requests)
- `NEXT_PUBLIC_SOCKET_URL`: Socket.IO server URL for real-time updates

---

## 📜 Available Scripts

```bash
# Development
pnpm dev              # Start dev server with hot reload

# Production
pnpm build            # Build optimized production bundle
pnpm start            # Start production server

# Linting
pnpm lint             # Run ESLint on all files
```

---

## 🏛️ Architecture & Key Concepts

### API Layer (`src/lib/apis.ts`)
- **Centralized HTTP client** using native Fetch API
- **Automatic token injection** from request options
- **Error handling** with user-friendly messages
- **Credentials support** for cookie-based authentication

```typescript
apiFetch<T>(endpoint: string, options?: RequestOptions): Promise<T>
```

### Service Layer (`src/services/`)
- **Auth Service**: Login, register, logout, get current user
- **Food Service**: Fetch foods, get individual food details
- **Order Service**: Create orders, get user orders, fetch all orders (admin), update order status

### Socket.IO Integration
- **Socket Context** (`src/contexts/SocketContext.tsx`): Manages socket instance and connection state
- **useSocketIO Hook** (`src/hooks/useSocketIO.ts`): Provides production-ready socket operations
  - `on(event, callback)`: Register event listener (auto-deduplicates)
  - `off(event)`: Remove event listener
  - `once(event, callback)`: One-time event listener
  - `emit(event, data)`: Send event to server

### Authentication & Authorization
- **JWT Tokens**: Stored as HTTP-only cookies
- **Token Verification**: Custom middleware in `proxy.ts` verifies tokens on every route
- **Role-Based Access Control**: Routes protected for users and admins
- **Protected Routes**:
  - User routes: `/`, `/food`, `/orders`
  - Admin routes: `/admin`
  - Public routes: `/auth`

### Real-time Events
The application listens for the following Socket.IO events:

| Event | Description | Listener |
|-------|-------------|----------|
| `order:status-updated` | Order status changed | MyOrders component |
| `order:new` | New order placed | AdminOrders component (admin only) |

---

## 📦 Component Breakdown

### UI Components (`src/components/ui/`)
Shadcn/ui based components:
- `Button`, `Card`, `Input`, `Label`
- `Dialog`, `Select`, `Textarea`, `Badge`
- `Skeleton`, `Tabs`

### Feature Components

#### Authentication (`src/components/auth/`)
- **Auth.tsx**: Login/Register form with validation

#### Food Management (`src/components/food/`)
- **Foods.tsx**: List view with filters
- **FoodCard.tsx**: Individual food item card
- **FoodDetails.tsx**: Detailed view with order form

#### Orders (`src/components/user/` & `src/components/admin/`)
- **MyOrders.tsx** (User): Display user's orders with real-time updates
- **AdminOrders.tsx** (Admin): Display all orders with status update capability
- **OrderCard.tsx**: Order display with relevant information
- **OrderDialog.tsx** (Admin): Modal for order details
- **ProgressBar.tsx**: Visual order status indicator

#### Navigation
- **Navbar.tsx**: Navigation with user profile and logout

---

## 🔌 Real-time Updates with Socket.IO

### Connection Flow
1. User authenticates via login
2. `SocketProvider` initializes socket connection
3. Connection verified with `authServices.me()`
4. Socket registers for specific events based on user role
5. Real-time events trigger component state updates

### Example: Listening to Order Updates
```typescript
const { on, isConnected } = useSocketIO();

useEffect(() => {
  if (!isConnected) return;

  const cleanup = on("order:status-updated", (order: Order) => {
    // Update order in state with new data
    setData((prev) => 
      prev.map((o) => o.id === order.id ? order : o)
    );
  });

  return cleanup; // Auto-cleanup on unmount
}, [isConnected, on]);
```

---

## 🔐 Security Features

- **JWT Token Authentication**: Secure token-based auth
- **HTTP-Only Cookies**: Tokens stored securely
- **CSRF Protection**: Socket.IO credentials support
- **Route Protection**: Middleware validates tokens on every route
- **Token Verification**: Custom JWT verification utility
- **Secure Headers**: Proper CORS and security headers

---

## 🎨 Styling & Theming

- **Tailwind CSS 4**: Utility-first CSS framework
- **shadcn/ui Components**: Pre-built accessible components
- **Responsive Design**: Mobile-first approach
- **Dark Mode Ready**: Component structure supports theming
- **Custom Animations**: `tw-animate-css` for smooth transitions

---

## 📱 Routes

### User Routes
- `/` - Home page
- `/food` - Browse food items
- `/food/[id]` - Food details and order
- `/orders` - My orders with real-time updates

### Admin Routes
- `/admin` - Admin dashboard with all orders

### Auth Routes
- `/auth` - Login/Register page

---

## 🐛 Debugging

### Development Tips
1. **Check Socket Connection**: Use browser DevTools → Network → WS
2. **Token Verification**: Check Application → Cookies → `accessToken`
3. **API Errors**: Check browser console and Network tab
4. **Socket Events**: Use `console.log` in event handlers

### Common Issues

**Socket connection failed**
- Verify `NEXT_PUBLIC_SOCKET_URL` is correct
- Check backend server is running
- Ensure credentials/CORS is configured

**Token verification error**
- Clear cookies and login again
- Check token expiration in JWT
- Verify backend signing key

**Page redirects to auth**
- Token may be invalid/expired
- Check token in cookies
- Login again with correct credentials

---

## 📚 Data Types

### Order
```typescript
type Order = {
  id: string;
  user_id: string;
  food_id: string;
  quantity: number;
  total: number;
  status: OrderStatus;
  address: string;
  notes: string | null;
  created_at: Date;
  updated_at: Date;
};
```

### OrderStatus
- `ORDERED` - Just placed
- `IN_PROGRESS` - Being prepared
- `DELIVERY` - Out for delivery
- `COMPLETED` - Successfully delivered
- `CANCELLED` - Order cancelled

### Food
```typescript
type Food = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: FoodCategory;
  image_url: string;
  available: boolean;
};
```

---

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/feature-name`)
2. Commit changes (`git commit -m 'Add feature'`)
3. Push to branch (`git push origin feature/feature-name`)
4. Open a Pull Request

---

## 📝 License

This project is private and under development.

---

## 📞 Support

For issues or questions, please contact the development team.

---

**Status**: 🚧 Under Development