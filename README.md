# Modern Personal Portfolio Website – Vishal M

A modern, responsive personal portfolio website engineered for **Vishal M** (Engineering Student & Full-Stack Developer), featuring a clean high-contrast dark design, interactive typing roles, an integrated **SQLite database** (`node:sqlite`) for real-time content management, and dedicated showcases for technical skills, projects, hackathon events, and resume documents.

---

## ✨ Key Highlights & Features

### 1. Clean, Modern High-Contrast Design
- **Theme & Colors:** Dark slate background (`#0b0f19`), solid modern card surfaces (`#111827`, border `#1f2937`), with indigo (`#6366F1`), purple (`#A855F7`), and cyan (`#38BDF8`) accent lighting.
- **Micro-Grid Background:** Subtle developer tech grid pattern with soft ambient radial gradients — clean, high-contrast, and distraction-free.
- **High Readability:** Crisp typography using Google Fonts (Outfit & Inter) with zero blurry distortion.

### 2. Complete Section Showcase
- **Hero Section:**
  - Clean empty avatar frame (ready for personalized photo upload via Edit Mode).
  - **Dynamic Animated Typing Roles:** Cycles continuously through *Engineering Student*, *Full-Stack Developer*, *Tech Enthusiast*, *Competitive Programmer*, and *AI & ML Explorer*.
  - Professional bio, academic badges (*Anna University Affiliated Engineering College, Computer Science & Engineering, Tamil Nadu, India*).
  - Quick action buttons: **View My Projects** and **Download Resume**.
  - Social media links: **LinkedIn**, **GitHub**, **Instagram**, and **Email**.
- **About Me & Personal Strengths:**
  - Academic summary: Degree (B.E.), CGPA (8.65), Batch (2026).
  - Career objectives and technical focus areas.
  - **4 Dedicated Personal Strengths:**
    1. *Algorithmic Problem Solving*
    2. *Full-Stack System Architecture*
    3. *Rapid Adaptability & Fast Learning*
    4. *Cross-Functional Teamwork*
- **Education Timeline:**
  - Vertical connection timeline for **B.E. Computer Science and Engineering** (8.65 CGPA), **Higher Secondary (HSC - 94.2%)**, and **Secondary School (SSLC - 92.8%)**.
- **Technical Skills:**
  - Categorized into:
    - **Programming Languages:** Python (92%), Java (90%), C (85%), C++ (86%)
    - **Web Development:** HTML (94%), CSS (90%), JavaScript (88%)
    - **Database:** MySQL (86%), Firebase (82%)
    - **Tools:** VS Code (95%), GitHub (90%), Google Colab (85%)
    - **Other Technical Skills:** Data Science (80%), AI (84%), Machine Learning (82%)
  - Interactive category filters with animated proficiency progress bars.
- **Featured Projects:**
  - High-impact project showcase cards with screenshots, tech stack badges, GitHub repository links, and Live Demo buttons.
  - Direct **Add / Edit Projects** database button.
- **Events & Participation:**
  - Showcases **Hackathons**, **Technical Symposiums**, **Workshops**, **Paper Presentations**, and **Competitions** with dates, organizer details, role descriptions, and certificate preview links.
- **Certificates & Achievements Gallery:**
  - Category filters: *All, Programming, Technical, Workshop, Internship, Other*.
  - Interactive preview modal with full support for **both high-resolution images and multi-page PDF documents**.
  - Achievements section highlighting hackathon ranks and academic honors.
- **Dedicated Resume Section:**
  - Professional executive summary and core qualification chips.
  - Interactive PDF document preview card.
  - **Download Resume (PDF)** button.
  - **1-Click Upload / Replace PDF** button: Upload your resume directly to update it in the database with instant celebratory confetti.
- **Contact Hub & Form:**
  - Direct contact cards for Email (with 1-click clipboard copy), LinkedIn, GitHub, and Instagram.
  - Working contact form (*Name, Email, Subject, Message, Submit*) that stores inquiries directly into the SQLite database `messages` table.
- **Navigation Bar:**
  - Sticky glass-effect top navigation bar with quick anchor scrolling, mobile dropdown menu, and one-click access to **Edit Mode** and **Resume**.

### 3. Integrated SQLite Database & Live CMS ("Edit Mode")
- Powered by Node.js native `node:sqlite` (`portfolio.db`) with zero external native compilation requirements.
- Click **"Edit Mode"** in the top navigation bar to open the built-in Content Manager:
  - **Profile & Hero:** Edit Name, Title, Bio, College, Department, Location, Resume URL, Social URLs (LinkedIn, GitHub, Instagram, Email), and upload your profile picture.
  - **About:** Edit introduction, career interests, and technical strengths.
  - **Education:** Add, update, or remove academic records.
  - **Skills:** Add new technical skills or adjust proficiency sliders.
  - **Projects:** Add, edit, or delete featured projects.
  - **Events:** Add or remove hackathons, symposiums, and workshops.
  - **Certificates:** Upload and manage image/PDF certificates.
  - **Inbox:** Read, review, and delete messages sent through the contact form.

---

## 🛠️ Tech Stack

- **Frontend:** React 19, Tailwind CSS v3.4, Lucide React Icons, Canvas Confetti, Vite 6
- **Backend:** Node.js v24 (`node:sqlite` native DatabaseSync), Express 4.21, Multer (file & PDF uploads), CORS
- **Database:** SQLite (`server/portfolio.db`)

---

## 🚀 How to Run the Application Locally

### Option 1: Run Full-Stack Server (API + Production Frontend)
Runs the unified server serving both the SQLite REST API and the React frontend on port `5000`:

```bash
npm start
```
Visit **[http://localhost:5000](http://localhost:5000)** in your browser.

### Option 2: Run in Development Mode with Hot Reloading
Runs both the backend API and Vite development server concurrently with Hot Module Replacement:

```bash
npm run dev
```
- **Frontend (Vite UI):** [http://localhost:3000](http://localhost:3000)
- **Backend (API & Database):** [http://localhost:5000](http://localhost:5000)

### Option 3: Build for Production
```bash
npm run build
```
Generates optimized static assets into the `dist/` directory.

---

## 📁 Database Schema (`server/portfolio.db`)

- `profile`: Identity, title, bio, college, department, location, resume URL, GitHub, LinkedIn, Instagram, email, avatar URL.
- `about`: Introduction, career interests, technical interests, skills summary, career objective, strengths.
- `education`: Institution, degree, department, academic year, CGPA, level, details.
- `skills`: Category, skill name, proficiency (0-100), icon name.
- `events`: Event title, event type, organization, date, role, description, photo URL, certificate URL.
- `certificates`: Title, issuing organization, completion date, category, file URL, is_pdf flag, description.
- `achievements`: Title, category, description, date, badge icon.
- `projects`: Project name, description, technologies, screenshot, GitHub URL, live demo URL, featured flag.
- `messages`: Visitor contact submissions with name, email, subject, message, and timestamp.

---

## 🌐 Deploying to Vercel

The project includes a pre-configured `vercel.json`:
1. Go to [vercel.com](https://vercel.com) and import `harishvishal38-max/portfolio-`.
2. Framework Preset: **Vite**
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Click **Deploy**.
