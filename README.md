🎓 Koda Solution — Complementary Hours System
Capstone Project 2026 — SENAC

Developed by the Koda Solution team

📌 About the Project
The Complementary Hours System is a fullstack web application for managing extracurricular activity certificates. Students submit their certificates, coordinators validate and approve them, and administrators manage platform users.
The system includes PWA (Progressive Web App) support, allowing installation on mobile as a native app, and cloud file storage via Cloudinary.

🌐 Live Access
EnvironmentURL🖥️ Frontend (Production)https://senac-pi-frontend.onrender.com/html/login.html⚙️ Backend API (Production)https://senac-pi-backend.onrender.com

⚠️ Render's free plan may cause a ~30 second delay on the first access after periods of inactivity.


👥 User Profiles
ProfileDescription🎓 StudentSubmits certificates and tracks approval status📋 CoordinatorReviews and validates certificates submitted by students⚙️ AdministratorManages system users (registration and deletion)

🔑 Test Credentials
ProfileE-mailPasswordAdminadmin@senac.bradmin123Coordinatorcoordenador@senac.brcoord123Studentaluno@senac.brsenac123

⚠️ Change these passwords before any use in a real environment.


🛠️ Tech Stack
Backend
TechnologyVersionUsageNode.jsv22+JavaScript runtimeExpressv5.2.1Web frameworkPostgreSQL18Databasepg (node-postgres)v8.21.0PostgreSQL driverMulterv2.1.1File upload (memory)Cloudinaryv2+Cloud file storagedotenvv16.4.7Environment variablesCORSv2.8.6Cross-Origin Resource Sharing
Frontend
TechnologyUsageHTML5Page structureCSS3Styling and responsivenessJavaScript (Vanilla)Logic and API consumptionPWAProgressive Web App (installable)Service WorkerCache and offline functionalityWeb App ManifestPWA configuration

☁️ Hosting & Infrastructure
ServicePlatformPlanFrontendRender (Static Site)FreeBackend APIRender (Web Service)FreeDatabaseRender (PostgreSQL 18)FreeFile StorageCloudinaryFree (25 GB)RepositoryGitHubFree

🗄️ Database
Platform: Render PostgreSQL 18

Region: Oregon (US West)
Table: usuarios
FieldTypeDescriptionidSERIAL PKUnique identifiernomeVARCHAR(100)Full nameemailVARCHAR(150)E-mail (unique)senhaVARCHAR(255)PasswordperfilVARCHAR(20)aluno / coordenador / admincriado_emTIMESTAMPRegistration date
Table: certificados
FieldTypeDescriptionidSERIAL PKUnique identifierusuario_idINT FKReference to usernomeVARCHAR(200)Activity namecategoriaVARCHAR(50)Activity typehorasINTWorkload (hours)descricaoTEXTOptional descriptionarquivoVARCHAR(255)File URL on CloudinarystatusVARCHAR(20)pendente / aprovado / reprovadoobservacaoTEXTCoordinator's notecriado_emTIMESTAMPSubmission date

🌐 API Endpoints
MethodRouteDescriptionAuthPOST/loginUser authenticationPublicGET/meLogged-in user dataAllGET/usuariosList all usersAdminPOST/usuariosRegister new userAdminDELETE/usuarios/:idRemove a userAdminGET/certificadosList certificatesAllPOST/certificadosSubmit new certificateStudentPATCH/certificados/:id/statusApprove or rejectCoordinator/AdminGET/certificados/:id/arquivoRedirect to Cloudinary fileAllGET/statsGeneral statisticsAdmin/Coordinator

🗂️ Project Structure
ProjetoPiSenac2026/
├── backend/
│   ├── server.js           # Main server and API routes
│   ├── package.json        # Backend dependencies
│   ├── database.sql        # Database creation script
│   ├── .env                # Environment variables (do not commit)
│   ├── .gitignore
│   └── uploads/            # Temporary upload folder
│
├── frontend/
│   ├── html/
│   │   ├── login.html          # Login screen (all profiles)
│   │   ├── certificados.html   # My certificates (student)
│   │   ├── enviar.html         # Submit certificate (student)
│   │   ├── coordenador.html    # Validation panel (coordinator)
│   │   └── admin.html          # Admin panel (administrator)
│   ├── css/
│   │   ├── global.css
│   │   ├── login.css
│   │   ├── enviar.css
│   │   └── coordenador.css
│   ├── js/
│   │   ├── login.js
│   │   ├── certificados.js
│   │   ├── enviar.js
│   │   ├── coordenador.js
│   │   └── admin.js
│   ├── manifest.json       # PWA configuration
│   └── sw.js               # Service Worker
│
└── README.md

⚙️ Running Locally
Prerequisites

Node.js 18+
PostgreSQL 14+
npm
Cloudinary account (free)

1. Clone the repository
git clone https://github.com/hugopires2k/ProjetoPiSenac2026.1.git
cd ProjetoPiSenac2026.1
2. Set up the database
psql -U postgres -f backend/database.sql
3. Create the .env file
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/senac_pi
NODE_ENV=development
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
4. Install dependencies and start
npm install
npm start
5. Open the frontend
Open frontend/html/login.html in your browser, or use a local server:
npx serve frontend/

📱 PWA — Mobile Installation

Access the login screen from your mobile browser
Android: tap "Add to Home Screen"
iOS: tap "Share → Add to Home Screen"
The app will be installed with an icon and fullscreen mode


🔐 Security

Authentication via Base64 token
Routes protected by profile on the backend
Accepted file types: PDF, JPG and PNG (max. 10 MB)
File type validation on the backend (Multer)
Files securely stored on Cloudinary
The .env file is never committed


👥 Team

Hugo Pires
Isack Otavio
Israel Soares
Pedro Lucas
Rafael Barbosa
Zaion Kauan


teacher: Leonardo Trevas

Koda Solution — Capstone Project 2026 · SENAC
