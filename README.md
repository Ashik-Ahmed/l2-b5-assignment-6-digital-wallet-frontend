# Digital Wallet Frontend

This is the frontend for a digital wallet application. It provides a user interface for users, agents, and administrators to manage their accounts and transactions.

## Project Overview

The digital wallet application allows users to send and receive money, view their transaction history, and manage their profile. Agents can perform cash-in and cash-out operations for users. Administrators have an overview of the entire system, including managing users and agents.

## Tech Stack

- **Framework:** [React](https://reactjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/)
- **Routing:** [React Router](https://reactrouter.com/)
- **UI:**
  - [Tailwind CSS](https://tailwindcss.com/)
  - [shadcn](https://ui.shadcn.com/) for accessible UI components
  - [lucide-react](https://lucide.dev/guide/packages/lucide-react) for icons
- **Form Handling:** [React Hook Form](https://react-hook-form.com/)
- **Schema Validation:** [Zod](https://zod.dev/)
- **API Communication:** [Axios](https://axios-http.com/)
- **Theming:** [next-themes](https://github.com/pacocoursey/next-themes)

## Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd l2-b5-assignment-6-digital-wallet-frontend
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run lint`: Lints the codebase using ESLint.
- `npm run preview`: Starts a local server to preview the production build.

## Live Deployment

The application is deployed on Vercel. You can access the live version here: [Deployment URL](https://l2-b5-assignment-6-digital-wallet-f.vercel.app)


## Login Credentials

You can use the following dummy credentials to log in and test the application:

### User

- **Email:** `ashik.itbl@gmail.com`
- **Password:** `123456`

### Agent

- **Email:** `rana.agent@gmail.com`
- **Password:** `123456`

### Admin

- **Email:** `admin_user@gmail.com`
- **Password:** `123456`
