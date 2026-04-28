const express  = require('express');
const cors     = require('cors');
const bcrypt   = require('bcryptjs');
const jwt      = require('jsonwebtoken');
const multer   = require('multer');
const path     = require('path');
const fs       = require('fs');
const { v4: uuidv4 } = require('uuid');
const { PrismaClient } = require('@prisma/client');
const WebSocket = require('ws');

const app    = express();
const prisma = new PrismaClient();
const PORT   = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'bahia_super_secret_jwt_2025';

require('dotenv').config();

// ── MIDDLEWARE ──────────────────────────────────────────
app.use(cors({
  origin: ['http://localhost:3001', 'http://127.0.0.1:3001',
           'http://localhost:5500', 'http://127.0.0.1:5500'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ── FRONTEND STATIQUE ──────────────────────────────────
const frontendPath = path.join(__dirname, '../frontend');
if (require('fs').existsSync(frontendPath)) {
  app.use(express.static(frontendPath));
} else {
  app.use(express.static(path.join(__dirname, 'public')));
}

// ── DOSSIERS UPLOADS ───────────────────────────────────
fs.mkdirSync('uploads/models', { recursive: true });
fs.mkdirSync('uploads/images', { recursive: true });

// ── UPLOAD CONFIG ──────────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = file.fieldname === 'model' ? 'uploads/models' : 'uploads/images';
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${uuidv4()}${ext}`);
  }
});
const upload = multer({ storage, limits: { fileSize: 50 * 1024 * 1024 } });

// ── AUTH MIDDLEWARE ─────────────────────────────────────
function auth(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Token manquant' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Token invalide' });
  }
}

// ══════════════════════════════════════════════════════
// AUTH
// ══════════════════════════════════════════════════════

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: 'Email et mot de passe requis' });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !bcrypt.compareSync(password, user.password))
      return res.status(401).json({ error: 'Identifiants incorrects' });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ══════════════════════════════════════════════════════
// MENU — public (kiosque)
// ══════════════════════════════════════════════════════

app.get('/api/menu', async (req, res) => {
  try {
    const { cat, search } = req.query;
    const where = { available: true };
    if (cat && cat !== 'all') where.cat = cat;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { desc: { contains: search, mode: 'insensitive' } }
      ];
    }
    const items = await prisma.menuItem.findMany({ where, orderBy: { createdAt: 'asc' } });
    res.json(items);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ══════════════════════════════════════════════════════
// MENU — admin
// ══════════════════════════════════════════════════════

app.get('/api/admin/menu', auth, async (req, res) => {
  try {
    const items = await prisma.menuItem.findMany({ orderBy: { createdAt: 'asc' } });
    res.json(items);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/admin/menu', auth, async (req, res) => {
  try {
    const item = await prisma.menuItem.create({ data: req.body });
    res.status(201).json(item);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.put('/api/admin/menu/:id', auth, async (req, res) => {
  try {
    const item = await prisma.menuItem.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(item);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.delete('/api/admin/menu/:id', auth, async (req, res) => {
  try {
    await prisma.menuItem.delete({ where: { id: req.params.id } });
    res.json({ message: 'Supprimé' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.patch('/api/admin/menu/:id/toggle', auth, async (req, res) => {
  try {
    const item = await prisma.menuItem.findUnique({ where: { id: req.params.id } });
    const updated = await prisma.menuItem.update({
      where: { id: req.params.id },
      data: { available: !item.available }
    });
    res.json(updated);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/admin/menu/:id/upload-model', auth, upload.single('model'), async (req, res) => {
  try {
    const modelUrl = `/uploads/models/${req.file.filename}`;
    const item = await prisma.menuItem.update({
      where: { id: req.params.id },
      data: { modelUrl, ar: true }
    });
    res.json(item);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/admin/menu/:id/upload-image', auth, upload.single('image'), async (req, res) => {
  try {
    const imageUrl = `/uploads/images/${req.file.filename}`;
    const item = await prisma.menuItem.update({
      where: { id: req.params.id },
      data: { imageUrl }
    });
    res.json(item);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ══════════════════════════════════════════════════════
// COMMANDES
// ══════════════════════════════════════════════════════

app.post('/api/orders', async (req, res) => {
  try {
    const { tableNumber, items, note } = req.body;
    if (!tableNumber || !items?.length)
      return res.status(400).json({ error: 'Table et items requis' });

    const total = items.reduce((s, i) => s + i.price * i.qty, 0);

    const order = await prisma.order.create({
      data: {
        tableNumber,
        note: note || '',
        total,
        status: 'pending',
        items: {
          create: items.map(i => ({
            menuItemId: i.id,
            name: i.name,
            price: i.price,
            qty: i.qty
          }))
        }
      },
      include: { items: true }
    });

    // Mettre la table en occupée
    await prisma.table.update({
      where: { number: tableNumber },
      data: { active: true, currentOrderId: order.id }
    });

    // Notifier l'admin via WebSocket
    broadcast({ type: 'order:new', order });

    res.status(201).json(order);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/admin/orders', auth, async (req, res) => {
  try {
    const { status } = req.query;
    const where = {};
    if (status) where.status = status;
    const orders = await prisma.order.findMany({
      where,
      include: { items: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(orders);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.patch('/api/admin/orders/:id/status', auth, async (req, res) => {
  try {
    const order = await prisma.order.update({
      where: { id: req.params.id },
      data: { status: req.body.status },
      include: { items: true }
    });

    if (req.body.status === 'served') {
      await prisma.table.update({
        where: { number: order.tableNumber },
        data: { active: false, currentOrderId: '' }
      });
    }

    // Notifier via WebSocket
    broadcast({ type: 'order:updated', order });

    res.json(order);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ══════════════════════════════════════════════════════
// TABLES
// ══════════════════════════════════════════════════════

app.get('/api/admin/tables', auth, async (req, res) => {
  try {
    const tables = await prisma.table.findMany({ orderBy: { number: 'asc' } });
    res.json(tables);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ══════════════════════════════════════════════════════
// RESERVATIONS
// ══════════════════════════════════════════════════════

app.post('/api/reservations', async (req, res) => {
  try {
    const { name, phone, date, time, guests, message } = req.body;
    console.log('Nouvelle réservation reçue:', req.body);
    if (!name || !phone || !date || !time || !guests)
      return res.status(400).json({ error: 'Tous les champs sont requis' });

    const reservation = await prisma.reservation.create({
      data: { name, phone, date, time, guests: parseInt(guests), message: message || '', status: 'pending' }
    });
    console.log('Réservation créée:', reservation.id);
    res.status(201).json({ success: true, message: 'Réservation confirmée !', id: reservation.id });
  } catch (e) {
    console.error('Erreur réservation:', e);
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/admin/reservations', auth, async (req, res) => {
  try {
    const reservations = await prisma.reservation.findMany({
      orderBy: { createdAt: 'desc' }
    });
    console.log('Réservations trouvées:', reservations.length);
    res.json(reservations);
  } catch (e) {
    console.error('Erreur get reservations:', e);
    res.status(500).json({ error: e.message });
  }
});

app.patch('/api/admin/reservations/:id/status', auth, async (req, res) => {
  try {
    const r = await prisma.reservation.update({
      where: { id: req.params.id },
      data: { status: req.body.status }
    });
    res.json(r);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ══════════════════════════════════════════════════════
// AVIS
// ══════════════════════════════════════════════════════

app.get('/api/avis', async (req, res) => {
  try {
    const avis = await prisma.avis.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(avis);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/avis', async (req, res) => {
  try {
    const { nom, note, texte } = req.body;
    if (!nom || !note || !texte)
      return res.status(400).json({ error: 'Nom, note et texte requis' });
    if (note < 1 || note > 5)
      return res.status(400).json({ error: 'Note entre 1 et 5' });
    const avis = await prisma.avis.create({
      data: { nom: nom.trim(), note: parseInt(note), texte: texte.trim() }
    });
    res.status(201).json(avis);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ══════════════════════════════════════════════════════
// STATS
// ══════════════════════════════════════════════════════

app.get('/api/admin/stats', auth, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [todayOrders, allOrders, menuItems, activeTables, arItems] = await Promise.all([
      prisma.order.findMany({ where: { createdAt: { gte: today } } }),
      prisma.order.findMany(),
      prisma.menuItem.count(),
      prisma.table.count({ where: { active: true } }),
      prisma.menuItem.count({ where: { ar: true } })
    ]);

    const revenueToday = todayOrders.reduce((s, o) => s + o.total, 0);
    const revenueTotal = allOrders.reduce((s, o) => s + o.total, 0);

    // Top produits
    const orderItems = await prisma.orderItem.groupBy({
      by: ['name'],
      _sum: { qty: true },
      orderBy: { _sum: { qty: 'desc' } },
      take: 5
    });

    const topProducts = orderItems.map(i => ({
      name: i.name,
      qty: i._sum.qty
    }));

    // Par statut
    const statuses = ['pending','preparing','ready','served','cancelled'];
    const byStatus = {};
    for (const s of statuses) {
      byStatus[s] = await prisma.order.count({ where: { status: s } });
    }

    res.json({
      todayOrders: todayOrders.length,
      revenueToday,
      revenueTotal,
      totalOrders: allOrders.length,
      menuItems,
      activeTables,
      arItems,
      topProducts,
      byStatus
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ══════════════════════════════════════════════════════
// QR CODES
// ══════════════════════════════════════════════════════

app.get('/api/qrcode/:table', async (req, res) => {
  try {
    const QRCode = require('qrcode');
    const url = `${req.protocol}://${req.get('host')}/menu.html?table=${req.params.table}`;
    const svg = await QRCode.toString(url, {
      type: 'svg',
      width: 200,
      margin: 2,
      color: { dark: '#000000', light: '#ffffff' }
    });
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.send(svg);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ══════════════════════════════════════════════════════
// HEALTH CHECK
// ══════════════════════════════════════════════════════

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── APPEL SERVEUR ─────────────────────────────────────
app.post('/api/call-waiter', async (req, res) => {
  try {
    const { tableNumber } = req.body;
    console.log(`🔔 Appel serveur Table ${tableNumber}`);
    broadcast({ type: 'WAITER_CALL', tableNumber, time: new Date().toISOString() });
    res.json({ success: true, message: 'Serveur appelé !' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ══════════════════════════════════════════════════════
// WEBSOCKET — notifications temps réel
// ══════════════════════════════════════════════════════

const server = app.listen(PORT, () => {
  console.log(`
  ╔═══════════════════════════════════════╗
  ║   BAHIA BEACH CLUB — API Server       ║
  ║   http://localhost:${PORT}               ║
  ║   Admin : admin@bahia.sn              ║
  ║   Pass  : bahia2025                   ║
  ╚═══════════════════════════════════════╝
  `);
});

const wss = new WebSocket.Server({ server });

function broadcast(data) {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

wss.on('connection', ws => {
  console.log('📡 Admin connecté via WebSocket');
  ws.send(JSON.stringify({ type: 'connected', message: 'Bahia WebSocket OK' }));
});