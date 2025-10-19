# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
**
**Coach Admin Panel Overview****

This is a React + JavaScript admin panel for managing coaches with features like listing, filtering, adding, editing, and deleting coach data. The panel is fully responsive and styled with TailwindCSS, using modern UI components from ShadCN.

**Key Features & Implementation****

Data Fetching and State Management

React Query (react-query): Handles all API interactions (GET, POST, PUT, DELETE) with caching, loading, and error states.

Example: fetching coaches list, adding a new coach, updating status.

Zustand: Manages local UI state, particularly for filtering and toggling active/inactive states without prop drilling.

UI Components

ShadCN + TailwindCSS: Provides prebuilt, accessible, and customizable components (cards, tables, dialogs, toggles).

React Icons & Lucide React: For icons in cards, buttons, and stats.

Radix UI: For advanced components like dropdowns, slots, and toggles.

Forms and Validation

React Hook Form + Yup: Used for forms like adding/editing coaches with schema validation.

Routing and Notifications

React Router Dom: Handles navigation between pages/routes.

React Toastify: Provides notifications for success/error actions.

Styling Utilities

TailwindCSS: Core styling system.

Tailwind Merge + clsx + class-variance-authority: Utility libraries for conditional classes and styling variants.

tw-animate-css: Adds CSS animations for UI feedback.

Loading Indicators

react-loading-indicators: Shows loading states while fetching or mutating data.

**Separation of Concerns:**

API logic handled via axios + react-query.

UI state (filters, toggles) handled via zustand.

Components are modular, reusable, and styled with Tailwind + ShadCN.

Responsive & Interactive UI:

Stats cards, toggles, modals, and dropdowns provide interactive user experience.

Loading states and toast notifications improve feedback.

Scalable Architecture:

Adding new API endpoints or filters is straightforward.
