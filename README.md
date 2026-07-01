# SmartShelf - AI Powered Library Management System

SmartShelf is a modern full-stack Library Management System built using Spring Boot, React.js, and PostgreSQL. It provides secure role-based access, intelligent recommendations, and efficient management of library resources.

---

## Features

### Authentication and Security

* JWT-based authentication
* Secure login and registration
* Role-Based Access Control (RBAC)

---

## User Role

Users can:

* Browse and search books
* View book details
* Borrow books
* Return borrowed books
* Track borrowing history
* Add books to wishlist
* Receive personalized recommendations
* View profile information
* Access a personal dashboard
* Read PDF resources

---

## Admin Role

The admin panel handles both administrator and librarian operations:

* Manage books
* Manage categories
* Manage authors
* Manage publishers
* Manage users
* Manage borrow requests
* Process book returns
* Monitor overdue books
* View analytics and reports

---

## AI Integration

Implemented intelligent features:

* Personalized book recommendations
* Smart content discovery
* Recommendation engine based on user interests

---

## Dashboard and Analytics

### User Dashboard

* Borrowed books overview
* Wishlist count
* Reading history
* Personalized recommendations
* Profile information

### Admin Dashboard

* Total books
* Total users
* Borrow statistics
* Overdue books
* Category insights
* Library analytics

---

## System Workflow

### User Workflow

1. User Registration and Login
2. Browse and Search Books
3. Borrow Request
4. Book Issued
5. Return Book
6. Wishlist and Recommendations
7. Dashboard and Reading History

### Backend Workflow

```
React Frontend
       ↓
REST APIs
       ↓
Spring Boot Controllers
       ↓
Service Layer
       ↓
Repository Layer
       ↓
PostgreSQL Database
       ↓
JSON Response
```

---

## Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Framer Motion
* React Router
* Axios

### Backend

* Java
* Spring Boot
* Spring Security
* JWT Authentication
* JPA / Hibernate
* REST APIs

### Database

* PostgreSQL

---

## Modules

* Authentication Module
* User Management
* Book Management
* Author Management
* Category Management
* Publisher Management
* Borrow and Return Management
* Wishlist Module
* Recommendation Module
* Profile Module
* PDF Library Module
* Analytics Module

---

## Project Highlights

* Role-Based Access System
* Responsive and Professional UI
* JWT Authentication
* AI-Based Recommendations
* PostgreSQL Integration
* Layered Architecture
* Real-Time Dashboard
* Scalable Backend Design

---

## Folder Structure

```
Frontend
│
├── Components
├── Pages
├── Services
├── Routes
└── Assets

Backend
│
├── Controllers
├── Services
├── Service Implementations
├── Repositories
├── Entities
├── DTOs
└── Security
```

---

## Architecture

The project follows a layered architecture:

```
Controller
    ↓
Service
    ↓
Repository
    ↓
Database
```

This architecture improves maintainability, scalability, and separation of concerns.

---

## Author

Pratik Pokhrel

B.Tech Computer Science and Engineering

Java | Spring Boot | React.js | PostgreSQL
