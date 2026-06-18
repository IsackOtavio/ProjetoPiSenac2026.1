# 🎓 Koda Solution — Complementary Hours System

> **Integrative Project 2026 — SENAC**
> Developed by the **Koda Solution** team

---

## 📌 About the Project

The **Complementary Hours System** is a fullstack web application built to simplify and automate the management of extracurricular activity certificates in educational institutions.

Currently, this process is often handled manually: students submit physical documents, coordinators validate them one by one, and administrators manage users without a centralized system. This project solves these problems by providing a digital platform with three distinct access profiles, each with its own set of features.

### What does the system do?
- **Students** submit digital certificates (PDF, JPG, or PNG) for validation
- **Coordinators** review, approve, or reject submitted certificates, and can leave written feedback
- **Administrators** manage platform users (registration and removal)

The system also supports **PWA (Progressive Web App)**, meaning it can be installed on a mobile device just like a native app — no App Store or Play Store required. Submitted files are securely stored in the cloud via **Cloudinary**.

---

## 🌐 System Access

| Environment | URL |
|---|---|
| 🖥️ Frontend (Production) | https://senac-pi-frontend.onrender.com/html/login.html |
| ⚙️ Backend API (Production) | https://senac-pi-backend.onrender.com |

> ⚠️ **Note:** The system is hosted on Render's free plan. After periods of inactivity, the server may take up to **30 seconds** to respond on the first request — this is expected behavior, not an error. Simply wait a moment and try again.

---

## 👥 Access Profiles

The system has three user profiles, each with specific permissions and features:

| Profile | Description |
|---|---|
| 🎓 **Student** | Submits extracurricular activity certificates and tracks the status of each submission in real time (pending, approved, or rejected) |
| 📋 **Coordinator** | Accesses the validation panel, reviews certificates submitted by students, and approves or rejects each one with the option to add written remarks |
| ⚙️ **Administrator** | Manages all platform users: can register new students, coordinators, and other administrators, as well as remove users from the system |

---

## 🔑 Test Credentials

Use the credentials below to explore the system under each profile:

| Profile | Email | Password |
|---|---|---|
| Admin | admin@senac.br | admin123 |
| Coordinator | coordenador@senac.br | coord123 |
| Student | aluno@senac.br | senac123 |

> ⚠️ **Important:** These credentials are for demonstration and testing purposes only. All passwords must be changed before using the system in any real or production environment.

---

## 🛠️ Technologies Used

### Backend

The server is built with **Node.js** and **Express**, connected to a **PostgreSQL** database and using **Cloudinary** for file storage.

| Technology | Version | Purpose |
|---|---|---|
| Node.js | v22+ | JavaScript runtime on the server |
| Express | v5.2.1 | Web framework for defining API routes |
| PostgreSQL | 18 | Primary relational database |
| pg (node-postgres) | v8.21.0 | PostgreSQL connection driver |
| Multer | v2.1.1 | Middleware for handling file uploads |
| Cloudinary | v2+ | Cloud-based file storage and delivery |
| dotenv | v16.4.7 | Loads environment variables from the `.env` file |
| CORS | v2.8.6 | Cross-Origin Resource Sharing configuration |

### Frontend

The frontend is built with plain web technologies — no frameworks — keeping it lightweight and broadly compatible.

| Technology | Purpose |
|---|---|
| HTML5 | Page structure and markup |
| CSS3 | Styling, layout, and mobile responsiveness |
| JavaScript (Vanilla) | Client-side business logic and REST API consumption |
| PWA | Enables the system to be installed on mobile as a native app |
| Service Worker | Manages caching and enables partial offline functionality |
| Web App Manifest | Defines the icon, name, and display behavior when installed as a PWA |

---

## ☁️ Hosting & Infrastructure

The entire infrastructure runs on free-tier services, making the project fully accessible for academic purposes at no cost.

| Service | Platform | Plan |
|---|---|---|
| Frontend | Render (Static Site) | Free |
| Backend API | Render (Web Service) | Free |
| Database | Render (PostgreSQL 18) | Free |
| File Storage | Cloudinary | Free (25 GB included) |
| Code Repository | GitHub | Free |

---

## 🗄️ Database

**Platform:** Render PostgreSQL 18
**Region:** Oregon (US West)

The database consists of two main tables:

### Table `usuarios` (Users)

Stores all registered users in the system, regardless of their profile.

| Field | Type | Description |
|---|---|---|
| id | SERIAL PK | Unique identifier, auto-generated |
| nome | VARCHAR(100) | User's full name |
| email | VARCHAR(150) | Email address (must be unique in the system) |
| senha | VARCHAR(255) | User's access password |
| perfil | VARCHAR(20) | Access type: `aluno` (student), `coordenador`, or `admin` |
| criado_em | TIMESTAMP | Date and time the account was created |

### Table `certificados` (Certificates)

Stores all certificates submitted by students, including their validation status.

| Field | Type | Description |
|---|---|---|
| id | SERIAL PK | Unique identifier, auto-generated |
| usuario_id | INT FK | Reference to the user who submitted the certificate |
| nome | VARCHAR(200) | Name of the activity described in the certificate |
| categoria | VARCHAR(50) | Activity type (e.g., course, event, lecture) |
| horas | INT | Number of hours stated in the certificate |
| descricao | TEXT | Additional description provided by the student (optional) |
| arquivo | VARCHAR(255) | Public URL of the file stored on Cloudinary |
| status | VARCHAR(20) | Current state: `pendente` (pending), `aprovado` (approved), or `reprovado` (rejected) |
| observacao | TEXT | Written feedback from the coordinator during evaluation |
| criado_em | TIMESTAMP | Date and time the certificate was submitted |

---

## 🌐 API Endpoints

The API follows REST conventions. All protected routes require an authentication token in the request header.

| Method | Route | Description | Who can access |
|---|---|---|---|
| POST | `/login` | Authenticates the user and returns a session token | Public |
| GET | `/me` | Returns the data of the currently authenticated user | All profiles |
| GET | `/usuarios` | Lists all registered users in the system | Admin only |
| POST | `/usuarios` | Registers a new user in the system | Admin only |
| DELETE | `/usuarios/:id` | Removes a user by their ID | Admin only |
| GET | `/certificados` | Lists certificates (students see their own; coordinators/admins see all) | All profiles |
| POST | `/certificados` | Submits a new certificate with an attached file | Student only |
| PATCH | `/certificados/:id/status` | Approves or rejects a certificate, with an optional observation | Coordinator and Admin |
| GET | `/certificados/:id/arquivo` | Redirects to the file's URL on Cloudinary | All profiles |
| GET | `/stats` | Returns general system statistics (total users, certificates by status, etc.) | Admin and Coordinator |

---

## 🗂️ Project Structure

```
ProjetoPiSenac2026/
├── backend/
│   ├── server.js           # Main server: Express setup, middlewares, and all API routes
│   ├── package.json        # Backend dependencies and scripts
│   ├── database.sql        # SQL script to create tables in the database
│   ├── .env                # Sensitive environment variables (must not be committed)
│   ├── .gitignore          # Files and folders excluded from version control
│   └── uploads/            # Temporary folder used during file upload before sending to Cloudinary
│
├── frontend/
│   ├── html/
│   │   ├── login.html          # Login screen — entry point for all profiles
│   │   ├── certificados.html   # Student panel: lists their certificates and statuses
│   │   ├── enviar.html         # Form for the student to submit a new certificate
│   │   ├── coordenador.html    # Coordinator panel: lists and evaluates pending certificates
│   │   └── admin.html          # Admin panel: manages system users
│   ├── css/
│   │   ├── global.css          # Global styles applied to all pages
│   │   ├── login.css           # Styles specific to the login screen
│   │   ├── enviar.css          # Styles for the certificate submission form
│   │   └── coordenador.css     # Styles for the validation panel
│   ├── js/
│   │   ├── login.js            # Authentication logic and profile-based redirection
│   │   ├── certificados.js     # Fetches and displays the logged-in student's certificates
│   │   ├── enviar.js           # Controls the form and sends the certificate to the API
│   │   ├── coordenador.js      # Loads pending certificates and submits approval decisions
│   │   └── admin.js            # Handles user listing, registration, and removal
│   ├── manifest.json           # PWA config: name, icons, theme color, display mode
│   └── sw.js                   # Service Worker: caching strategies and offline support
│
└── README.md
```

---

## ⚙️ Running Locally

Follow the steps below to run the project on your development machine.

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) 18 or higher
- [PostgreSQL](https://www.postgresql.org/) 14 or higher
- npm (bundled with Node.js)
- A free account at [Cloudinary](https://cloudinary.com/)

### 1. Clone the repository

```bash
git clone https://github.com/hugopires2k/ProjetoPiSenac2026.1.git
cd ProjetoPiSenac2026.1
```

### 2. Set up the database

Run the SQL script to create the required tables:

```bash
psql -U postgres -f backend/database.sql
```

> This will create the database and the `usuarios` and `certificados` tables, along with some initial test data.

### 3. Configure environment variables

Navigate to the backend folder and create the `.env` file:

```bash
cd backend
```

Create the `.env` file with the following content (replace with your actual values):

```env
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/senac_pi
NODE_ENV=development
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

> Your Cloudinary credentials are available in your account dashboard at [cloudinary.com](https://cloudinary.com/).

### 4. Install dependencies and start the server

```bash
npm install
npm start
```

The server will be available at `http://localhost:3000`.

### 5. Open the frontend

Open the file directly in your browser:

```bash
open frontend/html/login.html
```

Or use a local server to avoid relative path issues:

```bash
npx serve frontend/
```

---

## 📱 PWA — Installing as a Mobile App

The system can be installed on your phone as a native app, without needing the App Store or Play Store:

1. Access the system URL using your phone's browser
2. **On Android (Chrome):** tap the ⋮ menu and select **"Add to Home Screen"**
3. **On iOS (Safari):** tap the share icon and select **"Add to Home Screen"**
4. The app will be installed with its own icon and will open in full screen, without the browser navigation bar

---

## 🔐 Security

The system implements the following security practices:

- **Base64 token authentication** — each session uses a unique token generated at login
- **Server-side profile-based access control** — the server validates the user's profile before executing any protected operation, preventing students from accessing coordinator or admin routes
- **Server-side file validation** — Multer checks the file type before accepting any upload; only PDF, JPG, and PNG files are allowed, with a maximum size of **10 MB** per file
- **Secure cloud storage via Cloudinary** — files are never stored on the server; they are sent directly to the cloud
- **Protected environment variables** — sensitive credentials (database, Cloudinary) are stored in the `.env` file, which is listed in `.gitignore` and never committed to version control

---

## 👥 Team

This project was collaboratively developed by the members of the **Koda Solution** team:

- Hugo Pires
- Isack Otavio
- Israel Soares
- Pedro Lucas
- Rafael Barbosa
- Zaion Kauan

---

**Koda Solution** — Integrative Project 2026 — SENAC
