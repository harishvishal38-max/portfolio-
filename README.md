# Cosmic Glassmorphism Personal Portfolio Website

A futuristic, responsive personal portfolio website engineered with a **Glassmorphism Space Theme**, 3D animated floating planets, interactive starfields, and a full-stack **SQLite database** system for real-time content management.

---

## 🌌 Key Highlights & Features

### 1. Futuristic Space Glassmorphism Design
- **Theme & Colors:** Deep Space Black (`#050711`), Cosmic Purple (`#8B5CF6`), Radiant Pink (`#EC4899`), and Stellar Cyan (`#38BDF8`).
- **Glassmorphism UI:** Translucent frosted-glass panels (`backdrop-blur-xl`, `backdrop-blur-2xl`), subtle semi-transparent borders (`rgba(255, 255, 255, 0.12)`), and glowing atmospheric rim highlights.
- **Dynamic 3D Planetary Physics & Starfield:**
  - Layered HTML5 Canvas generating 200+ twinkling stars and shooting meteors with luminous trails.
  - Multi-tier 3D floating planets with gradient shaders (purple-pink gas giant with rings, cyan ice giant, magenta dwarf, violet moon) with interactive mouse parallax movement.
  - Cosmic nebulae dust clouds with smooth harmonic oscillations.

### 2. Complete Section Showcase
- **Hero Section:** Large central translucent glass panel, elegant typography (`Vishal M`), profile picture with circular glass frame & rotating orbital ring, quick academic chips (College, Department, Location), Download Resume button, View My Work button, and social link pills.
- **About Me:** Clean 2-column glass layout showcasing personal introduction, career interests, technical interests, skills & areas of learning, and overarching career objective.
- **Education Timeline:** Vertical glowing timeline with planetary nodes connecting undergraduate engineering, Higher Secondary (HSC), and Secondary (SSLC) milestones with CGPA/percentage badges.
- **Technical Skills:** Categorized into Programming Languages (Java, Python, C), Database (MySQL), Web Technologies (HTML5, CSS3, JavaScript), Tools (VS Code, GitHub, Google Colab), and Other Skills (Problem Solving, Teamwork, Communication) with animated glowing progress bars and category filter tabs.
- **Events & Participation:** Showcase for Hackathons, Workshops, Symposia, and Technical Events featuring event photographs, roles, descriptions, dates, and certificate links with dynamic "Add Event" capabilities.
- **Certificates & Achievements Gallery:**
  - Category filters: *All, Programming, Technical, Workshop, Internship, Other*.
  - Full-resolution preview modal with support for **both high-res images and embedded PDF documents**.
  - Achievements subsection featuring honors, hackathon finalists, and coding badges.
- **Featured Projects:** Modern glass showcase cards with tech tags, screenshots, GitHub repository links, and live demo buttons.
- **Contact Hub & Transmission Form:** Direct cards for Email (with 1-click clipboard copy), LinkedIn, GitHub, and an interactive contact form that writes directly to the SQLite database with celebratory confetti.
- **Professional Footer:** Copyright, credits, and "Back to Orbit" smooth scroll button.

### 3. Integrated SQLite Database & Live CMS ("Edit Mode")
- Powered by Node.js native `node:sqlite` (`portfolio.db`) with zero external native compilation requirements.
- Click **"Edit Mode"** in the top navigation bar to open the built-in Content Manager:
  - Edit Profile & Hero details (Name, Title, Bio, College, Department, Location, Resume, Socials).
  - Edit About Me details.
  - Add, edit, or delete Education milestones.
  - Add, edit, or delete Technical Skills and adjust percentage proficiency sliders.
  - Add, edit, or delete Events (with image/certificate uploads or URLs).
  - Add, edit, or delete Certificates & Achievements (with PDF or image file uploads).
  - Add, edit, or delete Projects.
  - **Inbox:** View, review, and manage visitor messages submitted via the contact form!
  - **Reset Defaults:** 1-click button to reset the database to the default seed template.

---

## 🛠️ Tech Stack

- **Frontend:** React 19, Tailwind CSS v3.4, Lucide React Icons, Canvas Confetti, HTML5 Canvas API
- **Backend:** Node.js v24 (`node:sqlite` DatabaseSync), Express 4.21, Multer (file & PDF uploads), CORS
- **Build Tool:** Vite 6

---

## 🚀 How to Run the Application

### Option A: Run Full-Stack Server (API + Built Frontend)
To run the server serving both the SQLite REST API and the production React frontend on port `5000`:

\`\`\`bash
npm start
\`\`\`
Visit **`http://localhost:5000`** in your browser.

### Option B: Run in Development Mode with Hot Reloading
To run both backend API and Vite dev server with Hot Module Replacement (HMR):

\`\`\`bash
npm run dev
\`\`\`
- Frontend (Vite with proxy): **`http://localhost:3000`**
- Backend (Express + SQLite): **`http://localhost:5000`**

### Option C: Build Frontend
\`\`\`bash
npm run build
\`\`\`
Outputs optimized static assets to `dist/`.

---

## 📁 Database Schema (`server/portfolio.db`)

- `profile`: Personal identity, title, bio, college, department, location, links, avatar.
- `about`: Introductions, career/technical interests, skills summary, career objective.
- `education`: Academic institutions, degree, department, year, CGPA, level, details.
- `skills`: Category, skill name, proficiency (0-100), icon name.
- `events`: Event title, event type, organization, date, role, description, photo URL, certificate URL.
- `certificates`: Title, issuing organization, completion date, category, file URL, is_pdf flag, description.
- `achievements`: Title, category, description, date, badge icon.
- `projects`: Project name, description, technologies, screenshot, GitHub URL, live demo URL, featured flag.
- `messages`: Visitor contact submissions with name, email, subject, message, and timestamp.
