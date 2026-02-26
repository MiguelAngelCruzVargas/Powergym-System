import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 3000;

// allow CORS for development (if needed)
import cors from 'cors';
app.use(cors());

// database connection (mysql2 pool)
import db from './db.js';
import bcrypt from 'bcrypt';

// ensure admin user exists
async function ensureAdmin() {
  try {
    const passwordHash = await bcrypt.hash('admin123', 10);
    // use INSERT IGNORE in case it already exists (by nombre or role)
    await db.query(
      `INSERT IGNORE INTO users (nombre,email,role,password) VALUES (?,?,?,?)`,
      ['Administrador','admin@powergym.local','admin',passwordHash]
    );
    console.log('Admin user ensured');
  } catch (err) {
    console.error('Failed to ensure admin user', err);
  }
}

// simple example API endpoint
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

// login endpoint
app.use(express.json());
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'missing fields' });
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) return res.status(401).json({ error: 'invalid credentials' });
    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'invalid credentials' });
    // for now return basic user info
    res.json({ id: user.id, nombre: user.nombre, role: user.role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// helper to generate unique member id
async function generateMemberId() {
  let id;
  while (true) {
    id = Math.floor(Math.random() * (999999 - 100 + 1)) + 100;
    id = id.toString().padStart(3, '0');
    const [rows] = await db.query('SELECT id FROM members WHERE id = ?', [id]);
    if (rows.length === 0) break;
  }
  return id;
}

// registration endpoint for new miembros
app.post('/api/auth/register', async (req, res) => {
  const { nombre, apellido, email, telefono, fechaNacimiento, password, tipoMembresia, precio } = req.body;
  if (!nombre || !email || !password || !tipoMembresia || !precio) {
    return res.status(400).json({ error: 'missing fields' });
  }
  try {
    const memberId = await generateMemberId();
    const passwordHash = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO members(id,nombre,email,telefono) VALUES (?,?,?,?)', [memberId, nombre + (apellido ? ' ' + apellido : ''), email, telefono]);
    const fechaInicio = new Date().toISOString().split('T')[0];
    // simple expiration: mensual = +1 month, semanal = +7 days, diaria = +1 day
    let vencimiento = new Date();
    if (tipoMembresia === 'mensual') vencimiento.setMonth(vencimiento.getMonth() + 1);
    else if (tipoMembresia === 'semanal') vencimiento.setDate(vencimiento.getDate() + 7);
    else if (tipoMembresia === 'diaria') vencimiento.setDate(vencimiento.getDate() + 1);
    const fechaVencimiento = vencimiento.toISOString().split('T')[0];
    await db.query('INSERT INTO memberships(member_id,tipoMembresia,precio,fechaInicio,fechaVencimiento,estado) VALUES (?,?,?,?,?,?)',
      [memberId, tipoMembresia, precio, fechaInicio, fechaVencimiento, 'activo']);
    await db.query('INSERT INTO users(nombre,email,role,password) VALUES (?,?,?,?)',
      [nombre + (apellido ? ' ' + apellido : ''), email, 'miembro', passwordHash]);
    res.json({ memberId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// attendance endpoints
app.post('/api/attendance', async (req, res) => {
  const { memberId } = req.body;
  if (!memberId) return res.status(400).json({ error: 'missing memberId' });
  try {
    // check member exists
    const [mem] = await db.query('SELECT * FROM members WHERE id = ?', [memberId]);
    if (mem.length === 0) return res.status(404).json({ error: 'member not found' });
    const now = new Date();
    const fecha = now.toISOString().split('T')[0];
    const hora = now.toTimeString().split(' ')[0];
    // insert attendance with only entry time
    await db.query('INSERT INTO attendances(member_id,fecha,horaEntrada) VALUES (?,?,?)', [memberId, fecha, hora]);
    res.json({ success: true, fecha, hora });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

app.get('/api/attendance', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT a.*, m.nombre FROM attendances a
      LEFT JOIN members m ON m.id = a.member_id
      ORDER BY a.fecha DESC, a.horaEntrada DESC
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'db error' });
  }
});

// example route that reads members from MariaDB/MySQL
app.get('/api/members', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM members');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'db error' });
  }
});

// serve static files from the Vite build directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '../dist')));

// all other requests should return the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

app.listen(port, async () => {
  console.log(`Server running on http://localhost:${port}`);
  await ensureAdmin();
});