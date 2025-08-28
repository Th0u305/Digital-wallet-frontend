# Digital Wallet Frontend

A secure, role-based, and user-friendly frontend application for a Digital Wallet System, built with React.js, Redux Toolkit, and Tailwind CSS. This application provides a seamless interface for Users, Agents, and Admins to manage wallets and perform financial operations.

---

## ✨ Key Features

###  Public & Authentication
-   **Polished Landing Experience**: A fully responsive public-facing website with Home, About, Features, and Contact pages.
-   **Secure JWT Authentication**: Robust login and registration system with role selection (User or Agent).
-   **Persistent State**: Users remain logged in even after a page refresh.
-   **Role-Based Redirection**: Users are automatically redirected to their specific dashboard after logging in.

### User Dashboard
-   **At-a-Glance Overview**: View wallet balance and a summary of recent transactions.
-   **Financial Operations**: Seamlessly deposit, withdraw, and send money to other users.
-   **Complete History**: Access a paginated and filterable transaction history.
-   **Profile Management**: Easily update personal information and change passwords.

### Agent Dashboard
-   **Agent-Specific Overview**: Dashboard tailored for agent activities like cash-in/cash-out summaries.
-   **Facilitate User Transactions**: Add money to or withdraw money from a user's wallet.
-   **Activity Tracking**: View a complete history of all transactions handled.

### Admin Dashboard
-   **System-Wide Control Panel**: A comprehensive overview of the entire system's health.
-   **User & Agent Management**: View, block, unblock, approve, or suspend accounts.
-   **Advanced Transaction Monitoring**: View all system transactions with powerful search and filtering capabilities.
-   **Data Visualization**: Key metrics are displayed using dynamic charts and tables.

### General UI/UX
-   **Guided Tour**: An interactive tour for new users highlighting key features, powered by `react-joyride`.
-   **Toast Notifications**: Instant feedback for all user actions (success, error, warning).
-   **Fully Responsive**: A polished and consistent experience across all devices, from mobile to desktop.
-   **Modern UI**: Skeleton loaders for smooth data fetching, clear typography, and a professional color scheme with light/dark modes.

---

## 🛠️ Technology Stack

-   **Core Framework**: React.js, TypeScript
-   **State Management**: Redux Toolkit
-   **Data Fetching**: RTK Query
-   **Routing**: React Router
-   **Styling**: Tailwind CSS
-   **UI Components**: shadcn/ui
-   **Notifications**: React Hot Toast
-   **Guided Tour**: React Joyride

---

## 🚀 Getting Started

Follow these steps to get the project running on your local machine.

### **1. Prerequisites**

-   [Node.js](https://nodejs.org/en/) (v18 or later)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
-   A running instance of the backend API server.

### **2. Clone the Repository**

```bash
git clone [https://github.com/Th0u305/Digital-wallet-frontend]
cd digital-wallet-frontend

3. Install Dependencies
npm install

4. Set Up Environment Variables
Create a .env file in the root of the project and add the URL for your backend API.

5. Run the Application
Start the development server.

npm run dev

The application should now be running at http://localhost:5000.

🗂️ Folder Structure
The project uses a feature-sliced design for a scalable and maintainable codebase.

src/
├── app/              # Redux store, API setup, hooks
├── components/       # Reusable UI components (buttons, inputs, etc.)
├── features/         # Feature-specific logic and components (e.g., auth, dashboard)
├── hooks/            # Custom hooks
├── lib/              # Utility functions (e.g., cn for Tailwind)
├── pages/            # Top-level page components
├── routes/           # Routing configuration, including protected routes
├── main.tsx          # Main application entry point
└── App.tsx           # Root application component
