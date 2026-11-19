import { fallbackPortfolioData } from '../data/initialData';

const API_BASE = '/api';

export async function fetchPortfolioData() {
  try {
    const res = await fetch(`${API_BASE}/portfolio`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn('API unavailable, falling back to local dataset:', err);
    return fallbackPortfolioData;
  }
}

export async function updateProfile(data) {
  const res = await fetch(`${API_BASE}/profile`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update profile');
  return res.json();
}

export async function updateAbout(data) {
  const res = await fetch(`${API_BASE}/about`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update about');
  return res.json();
}

export async function saveEducation(item) {
  const isUpdate = Boolean(item.id);
  const url = isUpdate ? `${API_BASE}/education/${item.id}` : `${API_BASE}/education`;
  const method = isUpdate ? 'PUT' : 'POST';

  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error('Failed to save education entry');
  return res.json();
}

export async function deleteEducation(id) {
  const res = await fetch(`${API_BASE}/education/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete education entry');
  return res.json();
}

export async function saveSkill(item) {
  const isUpdate = Boolean(item.id);
  const url = isUpdate ? `${API_BASE}/skills/${item.id}` : `${API_BASE}/skills`;
  const method = isUpdate ? 'PUT' : 'POST';

  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error('Failed to save skill');
  return res.json();
}

export async function deleteSkill(id) {
  const res = await fetch(`${API_BASE}/skills/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete skill');
  return res.json();
}

export async function saveEvent(item) {
  const isUpdate = Boolean(item.id);
  const url = isUpdate ? `${API_BASE}/events/${item.id}` : `${API_BASE}/events`;
  const method = isUpdate ? 'PUT' : 'POST';

  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error('Failed to save event');
  return res.json();
}

export async function deleteEvent(id) {
  const res = await fetch(`${API_BASE}/events/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete event');
  return res.json();
}

export async function saveCertificate(item) {
  const isUpdate = Boolean(item.id);
  const url = isUpdate ? `${API_BASE}/certificates/${item.id}` : `${API_BASE}/certificates`;
  const method = isUpdate ? 'PUT' : 'POST';

  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error('Failed to save certificate');
  return res.json();
}

export async function deleteCertificate(id) {
  const res = await fetch(`${API_BASE}/certificates/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete certificate');
  return res.json();
}

export async function saveAchievement(item) {
  const res = await fetch(`${API_BASE}/achievements`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error('Failed to save achievement');
  return res.json();
}

export async function deleteAchievement(id) {
  const res = await fetch(`${API_BASE}/achievements/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete achievement');
  return res.json();
}

export async function saveProject(item) {
  const isUpdate = Boolean(item.id);
  const url = isUpdate ? `${API_BASE}/projects/${item.id}` : `${API_BASE}/projects`;
  const method = isUpdate ? 'PUT' : 'POST';

  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error('Failed to save project');
  return res.json();
}

export async function deleteProject(id) {
  const res = await fetch(`${API_BASE}/projects/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete project');
  return res.json();
}

export async function sendContactMessage(msg) {
  const res = await fetch(`${API_BASE}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(msg),
  });
  if (!res.ok) throw new Error('Failed to send message');
  return res.json();
}

export async function fetchMessages() {
  const res = await fetch(`${API_BASE}/messages`);
  if (!res.ok) throw new Error('Failed to fetch messages');
  return res.json();
}

export async function deleteMessage(id) {
  const res = await fetch(`${API_BASE}/messages/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete message');
  return res.json();
}

export async function uploadMediaFile(file) {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch(`${API_BASE}/upload`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) throw new Error('File upload failed');
  return res.json();
}

export async function resetDatabaseToDefault() {
  const res = await fetch(`${API_BASE}/reset`, { method: 'POST' });
  if (!res.ok) throw new Error('Reset failed');
  return res.json();
}
