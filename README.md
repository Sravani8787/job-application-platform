# Job Application Management Platform

A responsive full-stack-style job application management platform built with React and TypeScript. The application allows users to securely access their account, manage job applications, track application statuses, and view application details through a clean and accessible dashboard.

## 🚀 Live Project

GitHub Repository:

https://github.com/Sravani8787/job-application-platform

---

## 📌 Project Overview

The Job Application Management Platform helps users organise and track their job applications from a single interface.

Users can:

- Register and log in
- Access protected application pages
- View application statistics
- Add new job applications
- Edit existing applications
- View detailed application information
- Delete applications
- Search applications
- Filter applications by status
- Track recruiters and interview information
- Manage account settings
- Log out securely from the application

The project was developed with a focus on **TypeScript, reusable React components, state management, API separation, accessibility, testing, responsive design, and performance optimisation**.

---

## ✨ Features

### 🔐 Authentication

- User registration
- User login
- Logout functionality
- Protected application routes
- Authentication state stored locally for the current demo implementation
- Duplicate email validation during registration

### 📊 Dashboard

The dashboard provides an overview of job application activity, including:

- Total applications
- Interview count
- Offers
- Rejected applications
- Applications submitted this month
- Offer conversion information

### 💼 Application Management

Users can:

- Create job applications
- View applications
- Edit applications
- Delete applications
- View individual application details

Application information includes:

- Company
- Job title
- Location
- Job posting URL
- Salary
- Date applied
- Application status
- Recruiter name
- Recruiter email
- Interview date
- Notes

### 🔎 Search & Filtering

- Search applications by relevant text
- Filter applications by status
- View application data in a responsive table

### ⚙️ Settings

The settings page provides:

- Account information
- Logged-in email
- Logout functionality
- Application workspace navigation
- Application information

### 📱 Responsive Design

The interface is designed for:

- Desktop
- Tablet
- Mobile

Responsive layouts are provided for the dashboard, applications table, forms, navigation, and application details.

### ♿ Accessibility

Accessibility considerations include:

- Keyboard navigation
- Visible keyboard focus indicators
- Semantic navigation
- Accessible form labels
- Validation error associations
- `aria-invalid`
- `aria-describedby`
- `aria-live`
- Accessible buttons and navigation
- Decorative icons hidden from screen readers where appropriate

### ⚡ Performance

Performance improvements include:

- Route-based lazy loading
- React `lazy()`
- `Suspense`
- Code splitting
- Reduced initial JavaScript bundle size

The initial JavaScript bundle was reduced from approximately **453.91 kB to 311.77 kB** through route-based code splitting.

### 🧪 Testing

The project uses:

- Vitest
- React Testing Library
- Jest DOM

Current automated test coverage includes:

- Login page
- Registration page
- Dashboard
- Applications page
- Application search
- Application filtering
- Add Application form
- Form validation
- Edit Application page

Current test result:

**18 / 18 tests passing**

---

## 🛠️ Technology Stack

### Frontend

- React
- TypeScript
- React Router
- React Hook Form
- Zod
- HTML
- CSS

### State Management

- Redux Toolkit
- React Redux

### API & Data

- Axios
- JSON Server

### Testing

- Vitest
- React Testing Library
- Jest DOM

### Development Tools

- Vite
- TypeScript
- Oxlint
- Git
- GitHub

---

## 🏗️ Project Architecture

```text
src/
│
├── components/
│   └── forms/
│       └── ApplicationForm.tsx
│
├── layouts/
│   └── MainLayout.tsx
│
├── pages/
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── Dashboard.tsx
│   ├── Applications.tsx
│   ├── AddApplication.tsx
│   ├── EditApplication.tsx
│   ├── ApplicationDetails.tsx
│   └── Settings.tsx
│
├── services/
│   ├── api.ts
│   ├── applicationService.ts
│   └── authService.ts
│
├── store/
│   ├── applicationsSlice.ts
│   ├── hooks.ts
│   └── store.ts
│
├── types/
│   └── Application.ts
│
├── styles/
│   └── styling.css
│
├── test/
│   └── pages.test.tsx
│
├── App.tsx
├── App.css
├── index.css
└── main.tsx
