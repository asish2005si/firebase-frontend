# Nexus Bank: A Modern Digital Banking Platform

Nexus Bank is a comprehensive, real-world digital banking application prototype built with a modern, secure, and scalable technology stack. It provides a complete banking experience, featuring separate, feature-rich portals for both **customers** and **administrators**, modeled after leading financial institutions.

The application is architected to be robust, secure, and ready for production, leveraging server-side logic, a centralized database, and a professional user interface.

---

## 🏗️ Technology Stack

- **Frontend**: **Next.js** (App Router) with **React** and **TypeScript**.
- **UI/UX**: **ShadCN UI** components, styled with **Tailwind CSS**, and enhanced with **Framer Motion** for animations.
- **Backend & Real-time Database**: **Firebase** (Firestore and Firebase Authentication).
- **Security & Authentication**: Secure, server-side authentication using **Next.js Server Actions** and **Firebase**.

---

## ✨ Core Features

### 👨‍💼 Customer Portal

A complete suite of features allows customers to manage their finances seamlessly:

- **Secure Authentication**: Robust login and registration flows.
- **Account Dashboard**: A central hub to view account summaries, balances, and recent activity.
- **Fund Transfers & Bill Payments**: Securely send money and pay bills, protected by a real-world OTP verification system.
- **Card Management**: View and manage debit, credit, and instantly-generated virtual cards. Set spending limits, block/unblock cards, and more.
- **Loan Services**: Explore different loan products and submit complete loan applications through a multi-step form.
- **Deposits**: Open and manage Fixed Deposits (FDs) with a real-time maturity calculator.
- **Statements**: View, filter, and download transaction history for any date range.
- **Account Opening**: A multi-step form for new customers to open a savings or current account, complete with document uploads.

### 🔐 Admin Panel

A secure, role-protected dashboard for bank administrators to manage the platform:

- **Secure Admin Login**: A separate, role-based login ensures only authorized personnel can access the admin panel.
- **Admin Registration**: A dedicated, secure signup page for creating new administrators.
- **Application Management**: View a list of all customer account applications. Approve or reject applications, with the system automatically updating the application status and user records.
- **Dashboard & Analytics**: At-a-glance statistics on total, pending, approved, and rejected applications.

---

## 🏛️ Architectural Highlights

- **Server-Centric Security**: Authentication and critical data mutations are handled through **Next.js Server Actions**, minimizing client-side exposure and creating a secure backend architecture. The client does not interact with the database directly for sensitive operations.

- **Centralized Database Management**: The application uses a **centralized Firebase Provider** pattern, ensuring a single, efficient, and reliable connection to Firestore across the entire application, which improves performance and maintainability.

- **Real-World OTP Verification System**: The project includes a robust OTP system that uses **Firestore** for persistent storage and verification of codes. This system is designed to be production-ready, with a clearly marked simulation layer that can be easily swapped for a real email/SMS API (like Twilio or SendGrid).

- **Role-Based Access Control (RBAC)**: The system is built on a clear distinction between `customer` and `admin` roles, stored securely in Firestore. The Admin Layout acts as a server-side guard, verifying the user's role before rendering any admin pages.

- **Professional UI/UX**: The entire application is built with **ShadCN UI** and **Tailwind CSS**, providing a polished, responsive, and modern user experience that feels like a real banking application.

---

This project serves as a strong foundation for a full-fledged digital banking platform, showcasing best practices in security, architecture, and user experience with a modern web stack.