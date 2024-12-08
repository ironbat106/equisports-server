# EquiSports (Server)

## Livelink: https://equisports-server-olive.vercel.app/

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
- [API Endpoints](#api-endpoints)
- [Author](#author)

## Overview

This project is a web application for managing sports equipment. It allows users to view, update, and delete equipment they own. It is built with a React frontend, and uses Firebase authentication and MongoDB as the backend database.

## Features

- **User Authentication:** Secure login and sign-up using Firebase.
- **User Equipment Management:**
  - View all equipment associated with the logged-in user.
  - Update equipment details.
  - Delete equipment with confirmation.
- **Dynamic Navigation:** A responsive navbar adapting to user roles.
- **Animations:** Interactive animations using AOS (Animate On Scroll).
- **Error Handling:** User-friendly error messages and fallback components.
- **Toast Notifications:** Feedback for user actions.

## Technologies Used

### Frontend:

- React.js (with React Router for navigation)
- Tailwind CSS for styling
- AOS (Animate On Scroll) for animations
- React Toastify for notifications

### Backend:

- Node.js with Express.js for the API
- MongoDB for database management

### Authentication:

- Firebase Authentication

### Additional Libraries:

- SweetAlert2 for confirmation dialogs
- React Awesome Reveal
- Lottie Animation