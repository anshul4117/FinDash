# 💰 Finance Dashboard UI

## 📌 Overview

A modern and responsive Finance Dashboard UI built to visualize financial data, manage transactions, and generate insights.

Built with **React 19**, **Tailwind CSS 4**, **Zustand**, **Framer Motion**, and **Recharts**, this project focuses on a premium editorial design, clean component architecture, and robust frontend state management without relying on a backend.

---

## 🚀 Features

### 🔐 Authentication & Role-Based Access (RBAC)
* **Simulated Login**: Select your role (Admin or Viewer) via a premium split-screen login page with 3D glassmorphic visuals.
* **Protected Routes**: Unauthenticated users are redirected to the login page.
* **Admin Role**: Full CRUD access — add, edit, and delete transactions.
* **Viewer Role**: Read-only access — browse data and insights without mutation capabilities.
* **Session Persistence**: Role and auth state are persisted in localStorage via Zustand.

### 📊 Dashboard
* **Dynamic Stats**: Total Balance, Income, Expenses with trend indicators.
* **Balance Trend**: Interactive area chart showing balance over time (Recharts).
* **Spending Breakdown**: Donut chart with distinct per-category colors.

### 💳 Transactions
* **Data Management**: Search, filter by category, and sort transactions.
* **Full CRUD**: Add, Edit, and Delete with a modular form modal.
* **Mobile Card View**: On small screens, the table transforms into a scrollable card list.
* **Pagination**: Client-side pagination (8 items per page) with page controls.
* **CSV Export**: Download filtered transactions as a CSV file.
* **Empty State**: Friendly UI when no results match filters.

### 📈 Insights
* **Monthly Comparison**: Income vs Expenses composed chart (Bar + Line).
* **Smart Suggestions**: Contextual feedback based on spending behavior.
* **Category Limits**: Visual progress bars for top spending categories.
* **Key Metrics**: Highest spending category and savings rate at a glance.

### 🎨 Design & UX
* **Dark Mode**: Full dark mode support with localStorage persistence.
* **Mobile-First Responsive**: Drawer sidebar on mobile, collapsible on desktop.
* **Floating Action Button (FAB)**: Quick "Add Transaction" on mobile for Admin.
* **Skeleton Loading**: Shimmer effects during data loading.
* **Micro-Animations**: Framer Motion for page transitions, hover effects, and list animations.
* **Accessibility**: `aria-label` attributes on all icon-only buttons.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 19 (Vite)** | UI framework with ultra-fast HMR |
| **Tailwind CSS 4** | Utility-first styling with `@theme` tokens |
| **Zustand** | Lightweight global state with `persist` middleware |
| **Recharts** | Responsive, high-performance data visualization |
| **React Router v6** | Client-side routing with protected routes |
| **Framer Motion** | Smooth animations and layout transitions |
| **Lucide React** | Premium icon library |
| **Manrope + Inter** | Google Fonts for editorial typography |

---

## 📁 Project Structure

```
src/
  assets/          # Static images (3D login shield)
  components/      # Reusable UI (Sidebar, Navbar, StatCard, Skeleton, TransactionModal)
  data/            # Mock data and category constants
  hooks/           # Custom hooks (useFilteredTransactions, useWindowSize)
  layouts/         # Page layout wrappers (DashboardLayout)
  pages/           # Page components (Login, Dashboard, Transactions, Insights)
  store/           # Zustand state management (useFinanceStore)
  utils/           # Formatting helpers and CSV export
```

---

## ⚙️ Setup Instructions

```bash
# Clone the repository
git clone <repo-link>

# Enter the directory
cd finance-dashboard

# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build
```

---

## 💡 Approach & Design Decisions

### Architecture
* **Component-Based**: Modular, reusable components with single-responsibility.
* **Custom Hooks**: `useFilteredTransactions` encapsulates search/filter/sort logic; `useWindowSize` provides reactive breakpoint detection.
* **Utility Layer**: `formatters.js` for currency/date formatting; `csvExport.js` for file downloads.

### State Management
* **Zustand + Persist**: Single store manages `transactions`, `role`, `isAuthenticated`, and `filters`. All state is persisted to localStorage so role and data survive page reloads.

### Responsive Strategy
* **Mobile-First**: All layouts start from single-column and expand via `sm:`, `md:`, `lg:` Tailwind breakpoints.
* **Sidebar**: Full sidebar on desktop → collapsible mini-mode on tablet → off-canvas drawer with backdrop on mobile.
* **Transactions**: Data table on desktop → card list on mobile. No horizontal scrolling.
* **FAB**: Floating "+" button on mobile for quick transaction creation (Admin only).

### Visual Design
* **Editorial Finance Aesthetic**: Inspired by the "Precision Curator" design philosophy — tonal depth over borders, high-contrast typography, and ambient shadows.
* **Color Palette**: Deep Navy (`#011627`), Sea Green (`#2ec4b6`), Amber Glow (`#ff9f1c`), Honey Bronze (`#ffbf69`), Frozen Water (`#cbf3f0`).
* **3D Login Asset**: Custom-generated glassmorphic shield with the project's brand colors.

---

## ✨ Highlights

* **Glassmorphism**: Backdrop blurs and translucent surfaces on the Login page.
* **Responsive Sidebar**: Drawer (mobile) → Mini (tablet) → Full (desktop).
* **Role-Based UI**: Admin sees edit/delete actions; Viewer sees read-only.
* **Pagination**: Clean page controls with result counts.
* **Dark Mode Aware Charts**: All chart grids, tooltips, and labels adapt to the current theme.
* **Empty States**: Friendly messaging with "Clear filters" action when no data matches.

---

## 📌 Notes

This project is built as part of a frontend evaluation assignment and focuses on UI/UX, responsive design, and state management rather than backend integration. All data is simulated client-side with realistic mock transactions.
