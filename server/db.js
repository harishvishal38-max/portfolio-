import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'portfolio.db');
const uploadsDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

export const db = new DatabaseSync(dbPath);

export function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS profile (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      name TEXT NOT NULL,
      title TEXT NOT NULL,
      bio TEXT NOT NULL,
      college TEXT NOT NULL,
      department TEXT NOT NULL,
      location TEXT NOT NULL,
      resume_url TEXT,
      github_url TEXT,
      linkedin_url TEXT,
      email TEXT,
      avatar_url TEXT,
      bg_image_url TEXT
    );

    CREATE TABLE IF NOT EXISTS about (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      intro TEXT NOT NULL,
      career_interests TEXT NOT NULL,
      technical_interests TEXT NOT NULL,
      skills_summary TEXT NOT NULL,
      career_objective TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS education (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      institution TEXT NOT NULL,
      degree TEXT NOT NULL,
      department TEXT,
      academic_year TEXT NOT NULL,
      cgpa TEXT NOT NULL,
      level TEXT NOT NULL,
      details TEXT,
      order_index INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS skills (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category TEXT NOT NULL,
      name TEXT NOT NULL,
      proficiency INTEGER NOT NULL,
      icon TEXT,
      order_index INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      event_type TEXT NOT NULL,
      organization TEXT NOT NULL,
      event_date TEXT NOT NULL,
      role TEXT,
      description TEXT,
      photo_url TEXT,
      certificate_url TEXT,
      order_index INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS certificates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      issuing_organization TEXT NOT NULL,
      date_completed TEXT NOT NULL,
      category TEXT NOT NULL,
      file_url TEXT NOT NULL,
      is_pdf INTEGER DEFAULT 0,
      description TEXT,
      order_index INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS achievements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      category TEXT,
      description TEXT,
      date TEXT,
      badge TEXT,
      order_index INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      technologies TEXT NOT NULL,
      image_url TEXT,
      github_url TEXT,
      live_demo_url TEXT,
      featured INTEGER DEFAULT 1,
      order_index INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT,
      message TEXT NOT NULL,
      created_at TEXT NOT NULL,
      is_read INTEGER DEFAULT 0
    );
  `);

  // Auto-migration for bg_image_url if profile table already existed
  try {
    db.exec(`ALTER TABLE profile ADD COLUMN bg_image_url TEXT;`);
  } catch (e) {
    // Column already exists
  }

  // Seed default data if empty
  seedDefaultDataIfEmpty();
}

export function seedDefaultDataIfEmpty(forceReset = false) {
  if (forceReset) {
    db.exec(`
      DELETE FROM profile;
      DELETE FROM about;
      DELETE FROM education;
      DELETE FROM skills;
      DELETE FROM events;
      DELETE FROM certificates;
      DELETE FROM achievements;
      DELETE FROM projects;
    `);
  }

  const profileCount = db.prepare('SELECT COUNT(*) as count FROM profile').get().count;
  if (profileCount === 0) {
    const insertProfile = db.prepare(`
      INSERT INTO profile (id, name, title, bio, college, department, location, resume_url, github_url, linkedin_url, email, avatar_url, bg_image_url)
      VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    insertProfile.run(
      'Vishal M',
      'Engineering Student | Aspiring Software Developer',
      'Passionate Computer Science engineering student dedicated to building scalable web applications, solving complex algorithmic problems, and exploring modern cloud architectures with an eye for futuristic design.',
      'Anna University Affiliated Engineering College',
      'Computer Science and Engineering',
      'Tamil Nadu, India',
      '/sample-resume.pdf',
      'https://github.com',
      'https://linkedin.com',
      'vishal.m.dev@example.com',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1920&q=80'
    );
  } else {
    // Ensure bg_image_url has default if null
    try {
      db.exec(`UPDATE profile SET bg_image_url = 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1920&q=80' WHERE bg_image_url IS NULL OR bg_image_url = ''`);
    } catch (e) {}
  }

  const aboutCount = db.prepare('SELECT COUNT(*) as count FROM about').get().count;
  if (aboutCount === 0) {
    const insertAbout = db.prepare(`
      INSERT INTO about (id, intro, career_interests, technical_interests, skills_summary, career_objective)
      VALUES (1, ?, ?, ?, ?, ?)
    `);
    insertAbout.run(
      'I am an enthusiastic Computer Science and Engineering student with a deep interest in software engineering, backend systems, and responsive modern web technologies. I enjoy decomposing difficult challenges into performant code.',
      'Full Stack Software Development, Distributed Backend Systems, Database Engineering, Cloud Technologies, and AI-powered Web Applications.',
      'Object-Oriented Programming (Java, C), Data Structures & Algorithms, Relational Database Modeling (MySQL), RESTful APIs, and Modern JavaScript Frameworks.',
      'Solid expertise across Java, Python, C, MySQL, HTML5, CSS3, JavaScript, VS Code, and collaborative Git/GitHub workflows.',
      'To launch my career as a Software Development Engineer at an innovative organization, contributing to scalable software systems while continuously learning and mastering cutting-edge technology stacks.'
    );
  }

  const educationCount = db.prepare('SELECT COUNT(*) as count FROM education').get().count;
  if (educationCount === 0) {
    const insertEdu = db.prepare(`
      INSERT INTO education (institution, degree, department, academic_year, cgpa, level, details, order_index)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    insertEdu.run(
      'College of Engineering & Technology',
      'Bachelor of Engineering (B.E.)',
      'Computer Science and Engineering',
      '2023 - 2027',
      '8.65 / 10.0 CGPA',
      'college',
      'Pursuing core curriculum including Data Structures, Design and Analysis of Algorithms, Object Oriented Programming with Java, and Database Management Systems. Actively competing in hackathons and coding symposiums.',
      1
    );
    insertEdu.run(
      'Higher Secondary School',
      'Higher Secondary Certificate (HSC - Class XII)',
      'Computer Science, Physics, Chemistry & Mathematics',
      '2021 - 2023',
      '92.4%',
      'hsc',
      'Mastered fundamentals of programming, differential calculus, and physical sciences with distinction. Ranked top 5 in school cohort.',
      2
    );
    insertEdu.run(
      'High School of Excellence',
      'Secondary School Leaving Certificate (SSLC - Class X)',
      'General Academic Curriculum',
      '2020 - 2021',
      '94.8%',
      'sslc',
      'Awarded academic excellence award in Mathematics and Science with high distinction.',
      3
    );
  }

  const skillsCount = db.prepare('SELECT COUNT(*) as count FROM skills').get().count;
  if (skillsCount === 0) {
    const insertSkill = db.prepare(`
      INSERT INTO skills (category, name, proficiency, icon, order_index)
      VALUES (?, ?, ?, ?, ?)
    `);
    // Programming Languages
    insertSkill.run('Programming Languages', 'Java', 90, 'Code2', 1);
    insertSkill.run('Programming Languages', 'Python', 82, 'Terminal', 2);
    insertSkill.run('Programming Languages', 'C', 85, 'Cpu', 3);

    // Database
    insertSkill.run('Database', 'MySQL', 86, 'Database', 4);

    // Web Technologies
    insertSkill.run('Web Technologies', 'HTML5', 94, 'Globe', 5);
    insertSkill.run('Web Technologies', 'CSS3 / Tailwind', 90, 'Palette', 6);
    insertSkill.run('Web Technologies', 'JavaScript (ES6+)', 85, 'FileCode2', 7);

    // Tools
    insertSkill.run('Tools', 'VS Code', 95, 'Laptop', 8);
    insertSkill.run('Tools', 'GitHub & Git', 88, 'GitBranch', 9);
    insertSkill.run('Tools', 'Google Colab', 84, 'Cloud', 10);

    // Other Skills
    insertSkill.run('Other Skills', 'Problem Solving', 92, 'Lightbulb', 11);
    insertSkill.run('Other Skills', 'Teamwork', 90, 'Users', 12);
    insertSkill.run('Other Skills', 'Communication', 88, 'MessageSquare', 13);
  }

  const eventsCount = db.prepare('SELECT COUNT(*) as count FROM events').get().count;
  if (eventsCount === 0) {
    const insertEvent = db.prepare(`
      INSERT INTO events (title, event_type, organization, event_date, role, description, photo_url, certificate_url, order_index)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    insertEvent.run(
      'National Smart India Hackathon',
      'Hackathon',
      'Ministry of Education & AICTE',
      'October 2025',
      'Full-Stack Developer & Team Lead',
      'Conceptualized and architected an intelligent student complaint tracking system with automated prioritization and audit logging.',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
      1
    );
    insertEvent.run(
      'TECHNOSTORM – National Level Technical Symposium',
      'Symposium',
      'Department of Computer Science & Engineering',
      'March 2025',
      'Participant & Finalist',
      'Presented technical research on modern fault-tolerant databases and secured 2nd place in the Speed Code Debugging challenge.',
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80',
      '',
      2
    );
    insertEvent.run(
      'Full-Stack Cloud & API Workshop',
      'Workshop',
      'IEEE Student Branch',
      'August 2024',
      'Hands-on Participant',
      'Mastered containerized microservice architectures, REST API optimization, and real-time client-server socket communication.',
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
      '',
      3
    );
    insertEvent.run(
      'Algorithmic Battle & Code Sprint',
      'Technical Event',
      'ACM Student Chapter & Coding Ninjas',
      'January 2025',
      'Competitive Programmer',
      'Competed across 5 algorithmic problem categories with time constraints in Java and C, achieving high percentile ranking.',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
      '',
      4
    );
  }

  const certsCount = db.prepare('SELECT COUNT(*) as count FROM certificates').get().count;
  if (certsCount === 0) {
    const insertCert = db.prepare(`
      INSERT INTO certificates (title, issuing_organization, date_completed, category, file_url, is_pdf, description, order_index)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    insertCert.run(
      'Java Programming & Data Structures',
      'Oracle Academy / Coursera',
      'November 2024',
      'Programming',
      'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
      0,
      'Certified in Core Java, Collections, Multithreading, Generics, and OOP Design Patterns.',
      1
    );
    insertCert.run(
      'Relational Database Design & MySQL Mastery',
      'Meta Professional Certification',
      'August 2024',
      'Technical',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
      0,
      'Comprehensive validation in schema design, normalization, complex SQL joins, indexing, and performance tuning.',
      2
    );
    insertCert.run(
      'Cloud & Web Architecture Bootcamp',
      'Google Developer Groups (GDG)',
      'February 2025',
      'Workshop',
      'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=1200&q=80',
      0,
      'Hands-on completion certificate covering server architecture, cloud storage, and responsive UI integration.',
      3
    );
    insertCert.run(
      'Software Engineering Virtual Internship',
      'Tech Innovation Labs',
      'May 2025',
      'Internship',
      'https://images.unsplash.com/photo-1534972195531-a756b1126f24?auto=format&fit=crop&w=1200&q=80',
      0,
      'Real-world software engineering internship simulation covering code reviews, bug fixes, and feature deployment.',
      4
    );
    insertCert.run(
      'Problem Solving (Intermediate) Certificate',
      'HackerRank',
      'July 2024',
      'Other',
      'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=1200&q=80',
      0,
      'Demonstrated proficiency in algorithmic problem solving, graph algorithms, and data structure manipulation.',
      5
    );
  }

  const achieveCount = db.prepare('SELECT COUNT(*) as count FROM achievements').get().count;
  if (achieveCount === 0) {
    const insertAchieve = db.prepare(`
      INSERT INTO achievements (title, category, description, date, badge, order_index)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    insertAchieve.run(
      'Top 10 Finalist – Regional Smart Tech Hackathon',
      'Hackathon',
      'Ranked in top 10 teams among 150+ colleges for our automated complaint tracking solution.',
      '2025',
      'Trophy',
      1
    );
    insertAchieve.run(
      'Winner – Intra-College Code Debugging Sprint',
      'Competition',
      'Finished 1st place identifying and fixing concurrency and memory bugs in Java & C programs.',
      '2025',
      'Award',
      2
    );
    insertAchieve.run(
      'Academic Excellence Honor Roll',
      'Academics',
      'Maintained consistent 8.6+ CGPA across all engineering semesters.',
      '2024',
      'Star',
      3
    );
    insertAchieve.run(
      '300+ Problems Solved on LeetCode & HackerRank',
      'Problem Solving',
      'Active daily problem solver covering arrays, trees, dynamic programming, and graphs.',
      '2025',
      'Zap',
      4
    );
  }

  const projectsCount = db.prepare('SELECT COUNT(*) as count FROM projects').get().count;
  if (projectsCount === 0) {
    const insertProj = db.prepare(`
      INSERT INTO projects (name, description, technologies, image_url, github_url, live_demo_url, featured, order_index)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    insertProj.run(
      'Complaint Registration and Tracking System',
      'An enterprise-grade complaint resolution web application with ticket lifecycle tracking, administrative escalations, priority matrix scoring, and full audit trails.',
      'Java, MySQL, REST API, HTML5, CSS3, JavaScript',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
      'https://github.com/vishal/complaint-tracking-system',
      '#',
      1,
      1
    );
    insertProj.run(
      'Cosmic Glassmorphism Portfolio & CMS',
      'A futuristic personal portfolio with a deep space glassmorphism aesthetic, 3D animated planets, interactive starfields, and real-time SQLite database synchronization.',
      'React, Node.js, SQLite, Tailwind CSS, Lucide Icons, Canvas API',
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80',
      'https://github.com/vishal/glassmorphism-space-portfolio',
      '#',
      1,
      2
    );
    insertProj.run(
      'Algorithmic Complexity & Trend Analyzer',
      'Interactive visualizer simulating algorithmic sorting, graph traversals, and execution metrics with responsive graphic animations and performance telemetry.',
      'Python, JavaScript, MySQL, HTML5 Canvas, Tailwind CSS',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
      'https://github.com/vishal/algo-complexity-analyzer',
      '#',
      1,
      3
    );
  }
}
