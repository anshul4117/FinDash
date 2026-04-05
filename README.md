# 💰 Finance Dashboard UI

## 📌 Overview

A modern and responsive Finance Dashboard UI built to visualize financial data, manage transactions, and generate insights. 

Built with **React 19**, **Tailwind CSS 4**, and **Zustand**, this project focuses on a premium, glassmorphic UI design, clean component architecture, and robust frontend state management without relying on a backend.

---

## 🚀 Features

### 📊 Dashboard
* **Dynamic Stats**: Total Balance, Income, Expenses summary with trend indicators.
* **Balance Trend**: Interactive area chart showing your balance over time (Recharts).
* **Spending Breakdown**: Visual category distribution with a custom-themed donut chart.

### 💳 Transactions
* **Data Management**: View, search, filter, and sort your financial activities.
* **Full CRUD**: Add, Edit, and Delete transactions with a modular form.
* **Role-Based UI**: Smart components that adapt based on the user's role:
  * **Viewer** → Safe, read-only access.
  * **Admin** → Full control over transactional data.

### 📈 Insights
* **Advanced Analytics**: Monthly comparison charts and category spending progress.
* **Smart Suggestions**: Contextual feedback based on spending behavior.
* **Key Metrics**: Instantly see your highest spending category and savings rate.

---

## 🛠️ Tech Stack

* **React (Vite)**: Ultra-fast dev experience and React v19.
* **Tailwind CSS 4**: Modern styling engine with glassmorphic components.
* **Zustand**: Lightweight global state management with local storage persistence.
* **Recharts**: Responsive, high-performance data visualization.
* **React Router**: Seamless client-side navigation.
* **Framer Motion**: Smooth micro-animations and layout transitions.

---

## 📁 Project Structure

```
src/
  components/  # UI components (StatCard, Sidebar, etc.)
  data/        # Mock JSON data and constants
  hooks/       # Custom React hooks
  layouts/     # Page layout wrappers (DashboardLayout)
  pages/       # Page components (Dashboard, Transactions, Insights)
  store/       # Zustand state management
  utils/       # Formatting and data aggregation helpers
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
```

---

## 💡 Approach

* **Component-Based Architecture**: Modular, reusable components using Tailwind utilities.
* **Global State**: Managed via Zustand with persistence to ensure role and data stay consistent across refreshes.
* **Premium UX**: Focused on UI clarity, smooth animations, and a responsive layout that works on all devices.
* **Data Simulation**: Realistic mock data used to provide a life-like experience of a real finance app.

---

## ✨ Highlights

* **Glassmorphism**: Elegant backdrop blurs and subtle borders.
* **Responsive Sidebar**: Collapsible menu with a mobile-friendly overlay.
* **Role Switcher**: Live role-toggling in the sidebar for easy manual testing.
* **Animations**: Consistent fade-in and scale effects for a premium feel.

---

## 📸 Screenshots

*(Add your high-res screenshots here)*

---

## 📌 Notes

This project is built as part of a frontend evaluation assignment and focuses on UI/UX and state management rather than backend integration.
