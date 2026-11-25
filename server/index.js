import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { db, initDatabase, seedDefaultDataIfEmpty } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize database
initDatabase();

app.use(cors());
app.use(express.json());

// Serve static uploads
const uploadsDir = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(uploadsDir));

// Also serve client dist if built
const distDir = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
}

// Multer storage for uploads (images, PDFs, documents)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB
});

// Upload route
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const fileUrl = `/uploads/${req.file.filename}`;
  const isPdf = req.file.mimetype === 'application/pdf' || req.file.originalname.toLowerCase().endsWith('.pdf');
  res.json({
    url: fileUrl,
    filename: req.file.filename,
    originalName: req.file.originalname,
    mimetype: req.file.mimetype,
    size: req.file.size,
    isPdf,
  });
});

// Get full portfolio bundle
app.get('/api/portfolio', (req, res) => {
  try {
    const profile = db.prepare('SELECT * FROM profile WHERE id = 1').get() || {};
    const about = db.prepare('SELECT * FROM about WHERE id = 1').get() || {};
    const education = db.prepare('SELECT * FROM education ORDER BY order_index ASC, id ASC').all();
    const skills = db.prepare('SELECT * FROM skills ORDER BY category ASC, order_index ASC, id ASC').all();
    const events = db.prepare('SELECT * FROM events ORDER BY order_index ASC, id DESC').all();
    const certificates = db.prepare('SELECT * FROM certificates ORDER BY order_index ASC, id DESC').all();
    const achievements = db.prepare('SELECT * FROM achievements ORDER BY order_index ASC, id ASC').all();
    const projects = db.prepare('SELECT * FROM projects ORDER BY order_index ASC, id DESC').all();

    res.json({
      profile,
      about,
      education,
      skills,
      events,
      certificates,
      achievements,
      projects,
    });
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    res.status(500).json({ error: error.message });
  }
});

// Profile endpoints
app.get('/api/profile', (req, res) => {
  const profile = db.prepare('SELECT * FROM profile WHERE id = 1').get();
  res.json(profile || {});
});

app.put('/api/profile', (req, res) => {
  const { name, title, bio, college, department, location, resume_url, github_url, linkedin_url, instagram_url, email, avatar_url, bg_image_url } = req.body;
  const stmt = db.prepare(`
    UPDATE profile SET
      name = COALESCE(?, name),
      title = COALESCE(?, title),
      bio = COALESCE(?, bio),
      college = COALESCE(?, college),
      department = COALESCE(?, department),
      location = COALESCE(?, location),
      resume_url = COALESCE(?, resume_url),
      github_url = COALESCE(?, github_url),
      linkedin_url = COALESCE(?, linkedin_url),
      instagram_url = COALESCE(?, instagram_url),
      email = COALESCE(?, email),
      avatar_url = COALESCE(?, avatar_url),
      bg_image_url = COALESCE(?, bg_image_url)
    WHERE id = 1
  `);
  stmt.run(name, title, bio, college, department, location, resume_url, github_url, linkedin_url, instagram_url, email, avatar_url, bg_image_url);
  const updated = db.prepare('SELECT * FROM profile WHERE id = 1').get();
  res.json(updated);
});

// About endpoints
app.get('/api/about', (req, res) => {
  const about = db.prepare('SELECT * FROM about WHERE id = 1').get();
  res.json(about || {});
});

app.put('/api/about', (req, res) => {
  const { intro, career_interests, technical_interests, skills_summary, career_objective, strengths } = req.body;
  const stmt = db.prepare(`
    UPDATE about SET
      intro = COALESCE(?, intro),
      career_interests = COALESCE(?, career_interests),
      technical_interests = COALESCE(?, technical_interests),
      skills_summary = COALESCE(?, skills_summary),
      career_objective = COALESCE(?, career_objective),
      strengths = COALESCE(?, strengths)
    WHERE id = 1
  `);
  stmt.run(intro, career_interests, technical_interests, skills_summary, career_objective, strengths);
  const updated = db.prepare('SELECT * FROM about WHERE id = 1').get();
  res.json(updated);
});

// Education endpoints
app.get('/api/education', (req, res) => {
  const list = db.prepare('SELECT * FROM education ORDER BY order_index ASC, id ASC').all();
  res.json(list);
});

app.post('/api/education', (req, res) => {
  const { institution, degree, department, academic_year, cgpa, level, details, order_index } = req.body;
  const stmt = db.prepare(`
    INSERT INTO education (institution, degree, department, academic_year, cgpa, level, details, order_index)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const result = stmt.run(institution, degree, department, academic_year, cgpa, level || 'college', details || '', order_index || 0);
  const created = db.prepare('SELECT * FROM education WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(created);
});

app.put('/api/education/:id', (req, res) => {
  const { id } = req.params;
  const { institution, degree, department, academic_year, cgpa, level, details, order_index } = req.body;
  const stmt = db.prepare(`
    UPDATE education SET
      institution = ?,
      degree = ?,
      department = ?,
      academic_year = ?,
      cgpa = ?,
      level = ?,
      details = ?,
      order_index = ?
    WHERE id = ?
  `);
  stmt.run(institution, degree, department, academic_year, cgpa, level, details, order_index, id);
  const updated = db.prepare('SELECT * FROM education WHERE id = ?').get(id);
  res.json(updated);
});

app.delete('/api/education/:id', (req, res) => {
  const { id } = req.params;
  db.prepare('DELETE FROM education WHERE id = ?').run(id);
  res.json({ success: true, id: Number(id) });
});

// Skills endpoints
app.get('/api/skills', (req, res) => {
  const list = db.prepare('SELECT * FROM skills ORDER BY category ASC, order_index ASC').all();
  res.json(list);
});

app.post('/api/skills', (req, res) => {
  const { category, name, proficiency, icon, order_index } = req.body;
  const stmt = db.prepare(`
    INSERT INTO skills (category, name, proficiency, icon, order_index)
    VALUES (?, ?, ?, ?, ?)
  `);
  const result = stmt.run(category, name, Number(proficiency) || 75, icon || 'Code2', order_index || 0);
  const created = db.prepare('SELECT * FROM skills WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(created);
});

app.put('/api/skills/:id', (req, res) => {
  const { id } = req.params;
  const { category, name, proficiency, icon, order_index } = req.body;
  const stmt = db.prepare(`
    UPDATE skills SET
      category = ?,
      name = ?,
      proficiency = ?,
      icon = ?,
      order_index = ?
    WHERE id = ?
  `);
  stmt.run(category, name, Number(proficiency) || 75, icon, order_index || 0, id);
  const updated = db.prepare('SELECT * FROM skills WHERE id = ?').get(id);
  res.json(updated);
});

app.delete('/api/skills/:id', (req, res) => {
  const { id } = req.params;
  db.prepare('DELETE FROM skills WHERE id = ?').run(id);
  res.json({ success: true, id: Number(id) });
});

// Events endpoints
app.get('/api/events', (req, res) => {
  const list = db.prepare('SELECT * FROM events ORDER BY order_index ASC, id DESC').all();
  res.json(list);
});

app.post('/api/events', (req, res) => {
  const { title, event_type, organization, event_date, role, description, photo_url, certificate_url, order_index } = req.body;
  const stmt = db.prepare(`
    INSERT INTO events (title, event_type, organization, event_date, role, description, photo_url, certificate_url, order_index)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const result = stmt.run(title, event_type, organization, event_date, role || '', description || '', photo_url || '', certificate_url || '', order_index || 0);
  const created = db.prepare('SELECT * FROM events WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(created);
});

app.put('/api/events/:id', (req, res) => {
  const { id } = req.params;
  const { title, event_type, organization, event_date, role, description, photo_url, certificate_url, order_index } = req.body;
  const stmt = db.prepare(`
    UPDATE events SET
      title = ?,
      event_type = ?,
      organization = ?,
      event_date = ?,
      role = ?,
      description = ?,
      photo_url = ?,
      certificate_url = ?,
      order_index = ?
    WHERE id = ?
  `);
  stmt.run(title, event_type, organization, event_date, role, description, photo_url, certificate_url, order_index || 0, id);
  const updated = db.prepare('SELECT * FROM events WHERE id = ?').get(id);
  res.json(updated);
});

app.delete('/api/events/:id', (req, res) => {
  const { id } = req.params;
  db.prepare('DELETE FROM events WHERE id = ?').run(id);
  res.json({ success: true, id: Number(id) });
});

// Certificates endpoints
app.get('/api/certificates', (req, res) => {
  const list = db.prepare('SELECT * FROM certificates ORDER BY order_index ASC, id DESC').all();
  res.json(list);
});

app.post('/api/certificates', (req, res) => {
  const { title, issuing_organization, date_completed, category, file_url, is_pdf, description, order_index } = req.body;
  const stmt = db.prepare(`
    INSERT INTO certificates (title, issuing_organization, date_completed, category, file_url, is_pdf, description, order_index)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const result = stmt.run(title, issuing_organization, date_completed, category, file_url, is_pdf ? 1 : 0, description || '', order_index || 0);
  const created = db.prepare('SELECT * FROM certificates WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(created);
});

app.put('/api/certificates/:id', (req, res) => {
  const { id } = req.params;
  const { title, issuing_organization, date_completed, category, file_url, is_pdf, description, order_index } = req.body;
  const stmt = db.prepare(`
    UPDATE certificates SET
      title = ?,
      issuing_organization = ?,
      date_completed = ?,
      category = ?,
      file_url = ?,
      is_pdf = ?,
      description = ?,
      order_index = ?
    WHERE id = ?
  `);
  stmt.run(title, issuing_organization, date_completed, category, file_url, is_pdf ? 1 : 0, description, order_index || 0, id);
  const updated = db.prepare('SELECT * FROM certificates WHERE id = ?').get(id);
  res.json(updated);
});

app.delete('/api/certificates/:id', (req, res) => {
  const { id } = req.params;
  db.prepare('DELETE FROM certificates WHERE id = ?').run(id);
  res.json({ success: true, id: Number(id) });
});

// Achievements endpoints
app.get('/api/achievements', (req, res) => {
  const list = db.prepare('SELECT * FROM achievements ORDER BY order_index ASC, id ASC').all();
  res.json(list);
});

app.post('/api/achievements', (req, res) => {
  const { title, category, description, date, badge, order_index } = req.body;
  const stmt = db.prepare(`
    INSERT INTO achievements (title, category, description, date, badge, order_index)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  const result = stmt.run(title, category || 'Award', description || '', date || '', badge || 'Trophy', order_index || 0);
  const created = db.prepare('SELECT * FROM achievements WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(created);
});

app.delete('/api/achievements/:id', (req, res) => {
  const { id } = req.params;
  db.prepare('DELETE FROM achievements WHERE id = ?').run(id);
  res.json({ success: true, id: Number(id) });
});

// Projects endpoints
app.get('/api/projects', (req, res) => {
  const list = db.prepare('SELECT * FROM projects ORDER BY order_index ASC, id DESC').all();
  res.json(list);
});

app.post('/api/projects', (req, res) => {
  const { name, description, technologies, image_url, github_url, live_demo_url, featured, order_index } = req.body;
  const stmt = db.prepare(`
    INSERT INTO projects (name, description, technologies, image_url, github_url, live_demo_url, featured, order_index)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const result = stmt.run(name, description, technologies || '', image_url || '', github_url || '', live_demo_url || '', featured ? 1 : 0, order_index || 0);
  const created = db.prepare('SELECT * FROM projects WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(created);
});

app.put('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, technologies, image_url, github_url, live_demo_url, featured, order_index } = req.body;
  const stmt = db.prepare(`
    UPDATE projects SET
      name = ?,
      description = ?,
      technologies = ?,
      image_url = ?,
      github_url = ?,
      live_demo_url = ?,
      featured = ?,
      order_index = ?
    WHERE id = ?
  `);
  stmt.run(name, description, technologies, image_url, github_url, live_demo_url, featured ? 1 : 0, order_index || 0, id);
  const updated = db.prepare('SELECT * FROM projects WHERE id = ?').get(id);
  res.json(updated);
});

app.delete('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  db.prepare('DELETE FROM projects WHERE id = ?').run(id);
  res.json({ success: true, id: Number(id) });
});

// Messages (Contact Form)
app.get('/api/messages', (req, res) => {
  const list = db.prepare('SELECT * FROM messages ORDER BY id DESC').all();
  res.json(list);
});

app.post('/api/messages', (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }
  const createdAt = new Date().toISOString();
  const stmt = db.prepare(`
    INSERT INTO messages (name, email, subject, message, created_at, is_read)
    VALUES (?, ?, ?, ?, ?, 0)
  `);
  const result = stmt.run(name, email, subject || 'Portfolio Inquiry', message, createdAt);
  const created = db.prepare('SELECT * FROM messages WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json({ success: true, message: 'Message sent successfully!', data: created });
});

app.delete('/api/messages/:id', (req, res) => {
  const { id } = req.params;
  db.prepare('DELETE FROM messages WHERE id = ?').run(id);
  res.json({ success: true, id: Number(id) });
});

// Reset database to default seed
app.post('/api/reset', (req, res) => {
  seedDefaultDataIfEmpty(true);
  res.json({ success: true, message: 'Database reset to default seed data.' });
});

// Fallback for SPA routing if dist exists
if (fs.existsSync(distDir)) {
  app.get('*', (req, res) => {
    res.sendFile(path.join(distDir, 'index.html'));
  });
}

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Cosmic Space Portfolio Server running at http://localhost:${PORT}`);
  });
}

export default app;
