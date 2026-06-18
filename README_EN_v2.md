# 🩺 Koda Solution — Complementary Hours System

> A web platform for the digital management of extracurricular activity certificates,
> connecting students, coordinators, and administrators through a centralized validation workflow.
> Developed as a Capstone Project (*Projeto Integrador*) for the **Systems Analysis and Development Program** at **SENAC College**.

[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![SENAC](https://img.shields.io/badge/Institution-SENAC%20College-blue)](https://www.senac.br/)
[![PWA](https://img.shields.io/badge/PWA-Supported-blueviolet)](https://senac-pi-frontend.onrender.com/html/login.html)
[![Status](https://img.shields.io/badge/status-Live-brightgreen)](https://senac-pi-frontend.onrender.com/html/login.html)

---

## Project Overview

The **Complementary Hours System** is a digital ecosystem built to eliminate the manual process of delivering and validating extracurricular certificates. The platform allows students to submit documents digitally, coordinators to review them in a dedicated dashboard, and administrators to manage all system users from a single centralized interface.

### Key Features

* **Digital Certificate Submission:** Students upload PDF, JPG, or PNG files directly through the platform — no physical delivery required.
* **Real-Time Validation Dashboard:** Coordinators view, approve, or reject pending certificates and can leave written remarks for the student.
* **Role-Based Access Control:** Three distinct profiles (Student, Coordinator, Admin), each with its own permissions and dedicated screens.
* **Cloud File Storage:** All uploaded files are stored and served via Cloudinary, keeping the application server stateless and lightweight.
* **Installable as a Native App (PWA):** The system can be added to the phone's home screen and behaves like a native mobile application.

---

## System Access

| Environment | URL |
|---|---|
| 🖥️ Frontend (Production) | https://senac-pi-frontend.onrender.com/html/login.html |
| ⚙️ Backend API (Production) | https://senac-pi-backend.onrender.com |

> ⚠️ The system is hosted on Render's free plan. After periods of inactivity, the server may take up to **30 seconds** to respond on the first request — this is expected behavior. Simply wait and try again.

---

## Test Credentials

| Profile | Email | Password |
|---|---|---|
| Admin | admin@senac.br | admin123 |
| Coordinator | coordenador@senac.br | coord123 |
| Student | aluno@senac.br | senac123 |

> ⚠️ These credentials are for demonstration purposes only. All passwords must be changed before any use in a real or production environment.

---

## Security & Data Privacy

Because this application processes user data (name, email, academic activity history), security and privacy were core requirements of this project.

### Implemented Security Standards

* **Token-Based Authentication:** Each session uses a unique token generated at login, required on all protected routes.
* **Server-Side Access Control:** The server validates the user's profile before executing any operation. A student cannot access coordinator or admin routes, even by making direct API requests.
* **Server-Side File Validation:** Multer checks the MIME type and file size before accepting any upload. Only **PDF, JPG, and PNG** files are allowed, with a maximum size of **10 MB** per file.
* **Secure Cloud Storage via Cloudinary:** Files are never stored on the application server. They are immediately forwarded to the cloud and served through a controlled public URL.
* **Protected Environment Variables:** All sensitive credentials (database, Cloudinary keys, etc.) are stored in the `.env` file, which is listed in `.gitignore` and **is never committed** to the repository.

---

## Tech Stack

* **Frontend:** HTML5, CSS3, JavaScript (Vanilla), PWA, Service Worker
* **Backend:** Node.js (v22+), Express (v5.2.1)
* **Database:** PostgreSQL 18, pg/node-postgres (v8.21.0)
* **File Storage:** Cloudinary (v2+), Multer (v2.1.1)
* **Infrastructure:** Render (Frontend + Backend + DB), GitHub

---

## Getting Started (Local Development)

### 1. Prerequisites

Ensure you have installed:

* [Git](https://git-scm.com)
* [Node.js](https://nodejs.org/) v18.0.0 or higher
* [PostgreSQL](https://www.postgresql.org/) 14 or higher running locally
* A free account at [Cloudinary](https://cloudinary.com/)

### 2. Configuration (`.env`)

Create a `.env` file inside the `/backend` folder and configure the environment variables as shown below:

```env
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/senac_pi
NODE_ENV=development
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

> Your Cloudinary credentials are available in your account dashboard at [cloudinary.com](https://cloudinary.com/).

### 3. Setup and Execution

```bash
# 1. Clone the repository
git clone https://github.com/hugopires2k/ProjetoPiSenac2026.1.git
cd ProjetoPiSenac2026.1

# 2. Set up the database
psql -U postgres -f backend/database.sql

# 3. Run the backend
cd backend
npm install
npm start

# 4. Run the frontend (open a new terminal window)
npx serve frontend/
# or open directly: frontend/html/login.html
```

The server will be available at `http://localhost:3000`.

---

## Core API Endpoints

| Method | Route | Description | Access Scope |
|---|---|---|---|
| POST | `/login` | Authenticates the user and returns a session token | Public |
| GET | `/me` | Returns the data of the currently authenticated user | All profiles |
| GET | `/usuarios` | Lists all registered users in the system | Admin only |
| POST | `/usuarios` | Registers a new user in the system | Admin only |
| DELETE | `/usuarios/:id` | Removes a user by their ID | Admin only |
| GET | `/certificados` | Lists certificates (students see their own; coord/admin sees all) | All profiles |
| POST | `/certificados` | Submits a new certificate with an attached file | Student only |
| PATCH | `/certificados/:id/status` | Approves or rejects a certificate, with optional remarks | Coordinator & Admin |
| GET | `/certificados/:id/arquivo` | Redirects to the file's URL on Cloudinary | All profiles |
| GET | `/stats` | Returns general system statistics | Admin & Coordinator |

---

## Future Improvements (What We'd Do Next)

If we had another semester, we plan to implement:

* **JWT Authentication:** Replace the current Base64 token with JSON Web Tokens featuring expiration and refresh token support, significantly improving session security.
* **Real-Time Push Notifications:** Alert students via push notifications (leveraging the PWA's Service Worker) when a certificate is approved or rejected.
* **PDF Report Export:** Allow coordinators and administrators to export consolidated reports of hours per student or per class group.
* **Audit Log:** Record all sensitive actions (approvals, user deletions) with timestamp and the responsible user's identity.
* **Password Recovery:** Implement a full password reset flow via email verification.

---

## Authors & Project Team

This project was collaboratively developed by the members of the **Koda Solution** team:

* **Hugo Pires** — [GitHub](https://github.com/hugopires2k)
* **Isack Otavio** — GitHub
* **Israel Soares** — GitHub
* **Pedro Lucas** — GitHub
* **Rafael Barbosa** — GitHub
* **Zaion Kauan** — GitHub

**Academic Advisor / Professor:** Prof. ____________
**Tech English Course Professor:** Prof. ____________

---

**Koda Solution** — Capstone Project 2026 — SENAC College
