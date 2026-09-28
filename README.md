JobTrack – Job Application Tracker

JobTrack is a web-based job application tracking platform designed to help users manage and monitor their job applications from one place.

The application provides authentication, a dashboard with application statistics, application search and filtering, application creation and editing, detailed application views, and account settings.

📌 Project Overview

Job searching often involves applying to multiple companies and keeping track of different stages such as Applied, Screening, Interview, Offer, and Rejected.

JobTrack provides a centralized workspace where users can:

Create and manage job applications

Search and filter applications

Sort applications by date or company

View detailed application information

Edit existing applications

Delete applications

Track application statuses

View application statistics on the dashboard

Monitor upcoming interviews

Calculate monthly application activity

View offer conversion rate

Manage account settings

✨ Features

🔐 Authentication

User Login

User Registration

Email and password validation

Password confirmation during registration

Login error handling

Registration success/error messages

Logout functionality

Protected application workflow

📊 Dashboard

The dashboard provides an overview of job application activity.

It displays:

Total Applications

Applied

Interviews

Offers

Rejected

Applications This Month

Offer Conversion

Applications by Status

Upcoming Interviews

The dashboard calculates application statistics from the application's stored data.

📋 Application Management

Users can:

Add a new application

View an application

Edit an application

Delete an application

Search applications

Filter by status

Filter by company

Filter by location

Filter by date applied

Sort by newest

Sort by oldest

Sort by company A–Z

Sort by company Z–A

🏢 Application Information

Applications can contain information such as:

Company

Job Title

Location

Salary

Date Applied

Application Status

Job Posting URL

Recruiter Name

Recruiter Email

Interview Date

Notes

⚙️ Settings

The Settings page provides:

Account information

Logged-in email

Authentication status

Logout functionality

Application tracking navigation

Application information

🖥️ Application Pages

Page

Description

Login

User authentication

Register

New account registration

Dashboard

Application statistics and overview

Applications

Search, filter, sort and manage applications

Add Application

Create a new job application

Edit Application

Update an existing application

Application Details

View complete application information

Settings

Account and application settings

🛠️ Technology Stack

Frontend

React

TypeScript

React Router

CSS

State Management

Redux

Redux Toolkit

React Redux

Application Structure

The project separates pages, components, services, state management and type definitions to keep the application organized and maintainable.

🏗️ Application Architecture

┌─────────────────────────────────────────────┐
│                  JobTrack                   │
│                                             │
│              React + TypeScript             │
└──────────────────────┬──────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────┐
│               React Router                 │
│                                             │
│ Login / Register / Dashboard / Applications│
│ Add / Edit / Details / Settings            │
└──────────────────────┬──────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────┐
│              Redux Store                   │
│                                             │
│          Applications State                │
│          Loading / Error / Items           │
└──────────────────────┬──────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────┐
│              Service Layer                │
│                                             │
│              authService                  │
│                                             │
│       Authentication / API Operations      │
└─────────────────────────────────────────────┘

🔄 Application Management Flow

                     User
                       │
                       ▼
              ┌─────────────────┐
              │    Dashboard    │
              └────────┬────────┘
                       │
                       ▼
              ┌─────────────────┐
              │  Applications   │
              └───────┬─────────┘
                      │
        ┌─────────────┼─────────────┐
        ▼             ▼             ▼
      Add           View          Search /
   Application     Details        Filter
        │             │
        ▼             ▼
      Save          Edit /
      Data         Delete
        │             │
        └──────┬──────┘
               ▼
        Application State
               │
               ▼
           Dashboard

🔐 Authentication Flow

                    Start
                      │
                      ▼
              ┌───────────────┐
              │ Login/Register│
              └───────┬───────┘
                      │
             ┌────────┴────────┐
             ▼                 ▼
          Register            Login
             │                 │
             ▼                 ▼
       Validate Fields    Validate Credentials
             │                 │
             ▼            ┌────┴────┐
        Create Account    ▼         ▼
                       Valid     Invalid
                         │          │
                         ▼          ▼
                     Dashboard    Error

📈 Dashboard Data Flow

                Application Data
                       │
                       ▼
                Redux Store
                       │
          ┌────────────┼────────────┐
          ▼            ▼            ▼
       Status         Dates        Offers
          │            │            │
          ▼            ▼            ▼
     Status Count   Monthly      Conversion
                     Count          Rate
          │            │            │
          └────────────┼────────────┘
                       ▼
                   Dashboard

📁 Project Structure

job-application-platform/
│
├── src/
│   ├── components/
│   │   └── forms/
│   │       └── ApplicationForm.tsx
│   │
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Applications.tsx
│   │   ├── AddApplication.tsx
│   │   ├── EditApplication.tsx
│   │   ├── ApplicationDetails.tsx
│   │   └── Settings.tsx
│   │
│   ├── services/
│   │   └── authService.ts
│   │
│   ├── store/
│   │   ├── applicationsSlice.ts
│   │   └── hooks.ts
│   │
│   ├── types/
│   │   └── Application.ts
│   │
│   └── styles/
│       └── styling.css
│
├── public/
├── README.md
├── package.json
└── ...

🚀 Getting Started

Prerequisites

Make sure the following are installed:

Node.js

npm

Git

Clone the Repository

git clone <YOUR_GITHUB_REPOSITORY_URL>

Navigate into the project:

cd job-application-platform

Install Dependencies

npm install

Run the Development Server

npm run dev

Open the local URL shown in the terminal.

🔄 Typical User Workflow

1. Register an account
        ↓
2. Login
        ↓
3. Open Dashboard
        ↓
4. Add a job application
        ↓
5. Select/update application status
        ↓
6. View applications
        ↓
7. Search / Filter / Sort
        ↓
8. Open application details
        ↓
9. Edit application when required
        ↓
10. Track interviews and offers

📊 Application Statuses

JobTrack supports application stages including:

Saved

Applied

Screening

Interview

Technical Interview

Final Interview

Offer

Rejected

Withdrawn

These statuses are used by the application list and dashboard statistics.

🧮 Dashboard Metrics

Applications This Month

The dashboard checks application dates and counts applications submitted during the current month and year.

Offer Conversion

The offer conversion rate is calculated using:

Offer Conversion Rate =
(Offers / Total Applications) × 100

The displayed percentage is rounded to the nearest whole number.

Interviews

Interview statistics include:

Interview

Technical Interview

Final Interview

Upcoming interviews are identified using the scheduled interview date.

🔎 Application Search and Filtering

The Applications page supports searching across:

Company

Job Title

Location

Status

Additional filters include:

Status

Company

Location

Date Applied

Applications can also be sorted by:

Newest First

Oldest First

Company A–Z

Company Z–A

🎨 UI Design

The application uses a modern JobTrack visual theme with:

Purple and blue gradients

Glassmorphism-inspired cards

Rounded components

Compact dashboard cards

Status badges

Responsive layouts

Hover and focus states

Responsive tables

Mobile-friendly forms

Consistent navigation

📱 Responsive Design

The interface is designed to adapt to:

Desktop

Laptop

Tablet

Mobile

The dashboard, filters, forms, tables and settings sections adjust their layout at smaller screen sizes.

🧪 Error and Loading States

The application includes user feedback for:

Loading applications

Failed application requests

Invalid login

Registration validation errors

Password mismatch

Missing application records

Delete operations

Empty application results

🔒 Authentication

Authentication functionality is handled through the application's authentication service.

The login page validates the email and password fields before attempting authentication.

Successful login redirects the user to the Dashboard.

Registration validates:

Required fields

Minimum password length

Password confirmation

After successful registration, the user is redirected to Login.

🔧 Future Improvements

Possible future enhancements include:

Application reminders

Email notifications

Calendar integration

Interview reminders

Advanced analytics

Application activity history

Resume management

Job description storage

Export applications to CSV/PDF

Dark mode

Pagination

Advanced dashboard charts

Role-based authentication

📚 Learning Outcomes

This project demonstrates practical experience with:

React component development

TypeScript

React Router

Redux state management

CRUD application workflows

Form handling

Client-side validation

Search and filtering

Sorting

Data-driven dashboard components

Responsive CSS

Authentication workflows

Application state management

UI/UX design

👨‍💻 Project

Project Name: JobTrack – Job Application Tracker

Type: Web Application

Frontend: React + TypeScript

State Management: Redux / Redux Toolkit

Routing: React Router

Styling: CSS
