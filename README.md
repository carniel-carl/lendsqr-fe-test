# Lendsqr Frontend Interview Assessment

## Overview

The Lendsqr Frontend Interview Assessment.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Demo](#demo)
- [Project Structure](#project-structure)

## Features

- User Authentication
- User Filtering and Search
- Pagination
- Detailed User Views
- Responsive Design
- Error Handling and Notifications

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **TypeScript**: Typed superset of JavaScript that compiles to plain JavaScript.
- **Vite**: Fast build tool and development server.
- **React Router**: For routing and navigation.
- **Axios**: For making API requests.
- **React Query**: For data fetching and state management.
- **ESLint**: For linting and code quality.
- **Prettier**: For code formatting.

## Installation

To get started with the project, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/carniel-carl/lendsqr-fe-test.git
   cd lendsqr-fe-test
   ```
2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables: Create a `.env` file in the root directory and add the following:s**:

   ```bash
   VITE_API_ENDPOINT=your_api_endpoint
   VITE_API_TOKEN=your_api_token
   ```

4. **Start the development server**:

   ```bash
   npm run dev

   ```

## Usage

Once the development server is running, you can access the application at http://localhost:5173. The main features of the application include:

- Login: Authenticate using your email and password.
- User Management: View, filter, and manage users.
- User Details: Click on a user to view detailed information.

## Demo / Preview

Here’s a preview:

![Project Screenshot](./public/images/preview.png)

Check out demo **[here](https://chimezie-nmugha-lendsqr-fe-test.vercel.app/)**

## Project Structure

The project structure is organized as follows:

```
src/
├── App.tsx
├── Layout
│   ├── DashboardLayout.tsx
│   ├── Logo.tsx
│   ├── Navbar.tsx
│   └── Sidebar.tsx
├── Routing
│   ├── ProtectedRoutes.tsx
│   ├── Routing.tsx
│   └── ScrollToTop.tsx
├── Sections
│   ├── LoginForm.tsx
│   ├── OrganisationSwitcher.tsx
│   ├── UserProfileData.tsx
│   └── UserProfileHeader.tsx
├── components
│   ├── Button.tsx
│   ├── CustomSelect.tsx
│   ├── DropdownBox.tsx
│   ├── DropdownMenu.tsx
│   ├── FilterComponent.tsx
│   ├── Input.tsx
│   ├── LoaderIcon.tsx
│   ├── Loading.tsx
│   ├── Pagination.tsx
│   ├── SidebarLink.tsx
│   ├── StarRating.tsx
│   ├── StatusBadge.tsx
│   ├── Table.tsx
│   └── UserAnalyticsCard.tsx
├── data
│   ├── SidebarData.ts
│   ├── mockData.ts
│   ├── organisations-data.ts
│   └── status-data.ts
├── hooks
│   ├── useClickOutside.tsx
│   └── useDebounce.ts
├── lib
│   ├── constant.ts
│   └── utils.ts
├── main.tsx
├── pages
│   ├── DashBoardPage.tsx
│   ├── LoginPage.tsx
│   ├── UserDetailsPage.tsx
│   └── UsersPage.tsx
├── services
│   └── index.ts
├── store
│   └── context
│       ├── AuthContext.tsx
│       └── Context.tsx
├── styles  // All SCSS Styles
├── types
│   └── types.d.ts
└── vite-env.d.ts
```
