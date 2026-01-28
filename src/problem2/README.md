# Currency Swap Interface

A highly responsive, secure, and performant currency swap interface built with React, TypeScript, and Vite.

**Live Demo**: [http://code-challenge-livid-three.vercel.app](http://code-challenge-livid-three.vercel.app)

## 🏗 Architecture & Patterns

This project follows industry-standard frontend architectural patterns to ensure scalability, maintainability, and type safety.

### 1. Layered Architecture
- **API Layer (`/api`)**: Centralized Axios instances with interceptors for request/response handling, global error management, and base configuration.
- **Service Layer (`/api/services`)**: Business logic for data fetching, abstracting raw API calls into typed services.
- **Hook Layer (`/hooks` & `/api/hooks`)**:
    - **Data Hooks**: Implementation of **TanStack React Query** for server state management, caching, and automatic revalidation.
    - **Logic Hooks**: Encapsulated UI logic (`useAppLogic`) to keep components presentational and easy to test.
- **Common Layer (`/common`)**: Centralized source of truth for all configurations, constants, and localized messages.

### 2. Design Patterns
- **Provider Pattern**: Using React Context for global state management (e.g., wallet balances).
- **Compound Components**: Modular UI components (Modal, Input, Button) designed for reuse and clear responsibility.
- **Localization Pattern**: All UI strings are externalized into `app.messages.ts` and `toast.messages.ts` to support future i18n and consistent messaging.
- **Atomic Utility Pattern**: Styling is driven by Tailwind CSS with a central theme configuration for consistency.

## 🛠 Tech Stack
- **Framework**: React 19 + TypeScript
- **State Management**: TanStack React Query (Server State) + React Context (Client State)
- **HTTP Client**: Axios (with Interceptors)
- **Styling**: Tailwind CSS 4 + Lucide Icons
- **Notifications**: Sonner (Custom Toast implementation)

## 🚀 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```
