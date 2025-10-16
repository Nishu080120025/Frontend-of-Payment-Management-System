## Payments Management System

A Vue 3 + Pinia web application designed to manage users and payments efficiently. This system provides a full-featured dashboard, detailed user and payment views, forms for adding/editing entries, and filtering functionality. It also includes comprehensive testing for both stores and components.

## Table of Contents

Features

Tech Stack

Project Structure

Setup & Installation

Usage

Testing

Dashboard Overview

Repository

## Features

User Management:
Add, edit, and view users with roles, creation dates, and details.

Payment Management:
Add, edit, view, and filter payments by status (Pending, Completed, Failed), type, amount, and date.

Dashboard Overview:
Summary cards display key metrics including total users, total payments, and a breakdown of payment statuses.

Responsive Design:
Fully responsive layout, tables, and forms for both desktop and mobile.

Testing:
Unit tests for Pinia stores and component tests for forms, tables, and detail views using Vitest and Vue Test Utils.

## Tech Stack

Frontend: Vue 3 with Composition API

State Management: Pinia

Routing: Vue Router 4

Testing: Vitest, Vue Test Utils, Pinia Testing Plugin

Styling: Scoped CSS with responsive design

## Project Structure
src/
 ├─ components/       # Reusable components like buttons or cards
 ├─ stores/           # Pinia stores for managing users and payments
 ├─ views/            # Main pages: Dashboard, Users, Payments
 ├─ App.vue           # Root component
 └─ main.js           # App entry point

tests/
 ├─ unit/             # Store tests for adding/updating users/payments
 ├─ components/       # Component tests for forms and lists


## Setup & Installation

Clone the repository:

git clone <repo-link>
cd <project-folder>


## Install dependencies:

npm install


Run the development server:

npm run dev


## Run tests:

npm run test

## Usage

Dashboard: View real-time metrics for users and payments.

Users Page: Add new users, edit existing users, and view detailed information.

Payments Page: Add new payments, edit payments, view details, and filter by status, type, amount, or date.

Navigation: Use the action buttons on the dashboard or the router links in lists for smooth page transitions.

## Testing

Store Tests:
Verify that users and payments can be added or updated correctly in Pinia stores.

Component Tests:
Ensure that forms, tables, and detail views render properly in both add and edit modes.

PaymentForm.vue, PaymentList.vue

UserForm.vue, UserList.vue

Tools: Vitest, Vue Test Utils, Pinia Testing Plugin

## Dashboard Overview

Summary Cards: Display metrics like total users, total payments, completed, pending, and failed payments.

Action Buttons: Quick navigation to Users and Payments pages.

Real-time Updates: All metrics update automatically as the underlying store changes.

Repository

GitHub:https://github.com/Nishu080120025/Frontend-of-Payment-Management-System
