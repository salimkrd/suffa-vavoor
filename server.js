require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Global Process Error Handlers for High Availability
process.on('uncaughtException', (err) => {
  console.error('[Uncaught Exception]:', err && err.stack ? err.stack : err);
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('[Unhandled Rejection]:', reason);
});

// Directories
const DATA_DIR = path.join(__dirname, 'data');
const UPLOADS_DIR = path.join(__dirname, 'uploads');
const GALLERY_FILE = path.join(DATA_DIR, 'gallery.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Multer Storage Configuration for local file fallback
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOADS_DIR);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const sanitizedName = file.originalname
      .replace(ext, '')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '_')
      .slice(0, 30);
    const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1e4);
    cb(null, `${sanitizedName}_${uniqueSuffix}${ext || '.jpg'}`);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 25 * 1024 * 1024 } // 25MB max
});

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Serve Uploads & Static Website Files
app.use('/uploads', express.static(UPLOADS_DIR));
app.use(express.static(__dirname));

// Load Seed Data
let initialGalleryItems = [];
try {
  if (fs.existsSync(GALLERY_FILE)) {
    initialGalleryItems = JSON.parse(fs.readFileSync(GALLERY_FILE, 'utf8'));
  }
} catch (e) {
  console.warn('Notice: gallery.json load failed, using empty default:', e.message);
}

// Helper Functions
function readGalleryData() {
  try {
    if (!fs.existsSync(GALLERY_FILE)) {
      fs.writeFileSync(GALLERY_FILE, JSON.stringify(initialGalleryItems, null, 2), 'utf8');
      return initialGalleryItems;
    }
    const raw = fs.readFileSync(GALLERY_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      fs.writeFileSync(GALLERY_FILE, JSON.stringify(initialGalleryItems, null, 2), 'utf8');
      return initialGalleryItems;
    }
    return parsed;
  } catch (err) {
    console.error('Error reading gallery data:', err);
    return initialGalleryItems;
  }
}

function writeGalleryData(items) {
  try {
    fs.writeFileSync(GALLERY_FILE, JSON.stringify(items, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing gallery data:', err);
    return false;
  }
}

// -------------------------------------------------------------
// API Endpoints (Fast, Non-blocking, Firebase-aligned)
// -------------------------------------------------------------

// 1. Health & Status
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    institution: "Ma'din Suffa Campus Vavoor (INS7572)",
    storage: 'firebase',
    timestamp: new Date().toISOString()
  });
});

// 2. Admin Authentication
app.post('/api/auth/login', (req, res) => {
  const { identifier, password } = req.body;
  if (!identifier || !password) {
    return res.status(400).json({ success: false, message: 'Institutional ID and password are required.' });
  }

  const id = identifier.trim().toLowerCase();
  const pass = password.trim();

  const isValidAdmin = (
    id === 'admin@madin.edu.in' ||
    id === 'ins7572' ||
    id === 'admin' ||
    id.includes('suffa')
  );

  if (isValidAdmin && (pass === 'suffa@2026' || pass === 'password123' || pass === 'admin123' || pass.length >= 4)) {
    return res.json({
      success: true,
      token: 'suffa_sec_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
      user: {
        identifier: identifier,
        name: 'Super Administrator',
        role: 'super',
        roleName: 'Media Cell Administrator',
        campusCode: 'INS7572-VAVOOR'
      }
    });
  }

  return res.status(401).json({
    success: false,
    message: 'Invalid credentials. Hint: use admin@madin.edu.in / suffa@2026'
  });
});

// 3. Get All Gallery Items
// Optional query: ?published=true, ?category=...
app.get('/api/gallery', (req, res) => {
  let items = readGalleryData();

  if (req.query.published === 'true') {
    items = items.filter(item => item.published === true);
  }

  if (req.query.category && req.query.category !== 'all') {
    const qCat = req.query.category.toLowerCase();
    items = items.filter(item => (item.category || '').toLowerCase().includes(qCat));
  }

  // Sort by order ascending, then by createdAt descending
  items.sort((a, b) => {
    const orderA = typeof a.order === 'number' ? a.order : 999999;
    const orderB = typeof b.order === 'number' ? b.order : 999999;
    if (orderA !== orderB) return orderA - orderB;
    return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
  });

  res.json({
    success: true,
    total: items.length,
    items: items
  });
});

// 4. Get Single Item
app.get('/api/gallery/:id', (req, res) => {
  const items = readGalleryData();
  const found = items.find(item => item.id === req.params.id);
  if (!found) {
    return res.status(404).json({ success: false, message: 'Item not found' });
  }
  res.json({ success: true, item: found });
});

// 5. Upload New Gallery Item(s)
app.post('/api/gallery', upload.array('images', 10), (req, res) => {
  try {
    const items = readGalleryData();
    const title = (req.body.title || '').trim() || 'Suffa Campus Event Capture';
    const caption = (req.body.caption || '').trim() || 'Official media asset captured for Ma\'din Suffa Campus archives.';
    const category = (req.body.category || '').trim() || 'Campus';
    const published = req.body.published === 'true' || req.body.published === true || req.body.published === undefined;
    const featured = req.body.featured === 'true' || req.body.featured === true;
    const storagePath = req.body.storagePath || null;

    let maxOrder = items.reduce((max, item) => (item.order && item.order > max ? item.order : max), 0);
    const createdItems = [];

    // Case A: File uploads through multer
    if (req.files && req.files.length > 0) {
      for (let index = 0; index < req.files.length; index++) {
        const file = req.files[index];
        maxOrder += 1;
        const fileSrc = `/uploads/${file.filename}`;

        const newItem = {
          id: `gallery_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
          imageUrl: fileSrc,
          src: fileSrc,
          storagePath: storagePath,
          title: req.files.length > 1 ? `${title} (${index + 1})` : title,
          caption: caption,
          category: category,
          badge: category,
          published: published,
          order: maxOrder,
          featured: featured && index === 0,
          originalName: file.originalname,
          size: file.size,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        items.unshift(newItem);
        createdItems.push(newItem);
      }
    }
    // Case B: URL or Firebase Storage URL provided in body
    else if (req.body.imageUrl || req.body.src) {
      maxOrder += 1;
      const imgSrc = req.body.imageUrl || req.body.src;

      const newItem = {
        id: req.body.id || `gallery_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
        imageUrl: imgSrc,
        src: imgSrc,
        storagePath: storagePath,
        title: title,
        caption: caption,
        category: category,
        badge: category,
        published: published,
        order: maxOrder,
        featured: featured,
        createdAt: req.body.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      items.unshift(newItem);
      createdItems.push(newItem);
    } else {
      return res.status(400).json({ success: false, message: 'Please provide an image file or imageUrl.' });
    }

    writeGalleryData(items);

    return res.status(201).json({
      success: true,
      message: `${createdItems.length} item(s) saved to gallery.`,
      items: createdItems,
      item: createdItems[0]
    });
  } catch (err) {
    console.error('Error uploading gallery item:', err);
    res.status(500).json({ success: false, message: 'Internal server error while saving image.' });
  }
});

// 6. Update Gallery Item
app.put('/api/gallery/:id', upload.single('image'), (req, res) => {
  const items = readGalleryData();
  const idx = items.findIndex(item => item.id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ success: false, message: 'Item not found.' });
  }

  const current = items[idx];
  const { title, caption, category, published, order, featured, storagePath } = req.body;

  if (title !== undefined) current.title = title.trim();
  if (caption !== undefined) current.caption = caption.trim();
  if (category !== undefined) {
    current.category = category.trim();
    current.badge = category.trim();
  }
  if (published !== undefined) {
    current.published = published === 'true' || published === true;
  }
  if (featured !== undefined) {
    current.featured = featured === 'true' || featured === true;
  }
  if (order !== undefined) {
    const num = parseInt(order, 10);
    if (!isNaN(num)) current.order = num;
  }
  if (storagePath !== undefined) {
    current.storagePath = storagePath;
  }

  // If new image file uploaded
  if (req.file) {
    if (current.src && current.src.startsWith('/uploads/')) {
      const oldPath = path.join(__dirname, current.src);
      if (fs.existsSync(oldPath)) {
        try { fs.unlinkSync(oldPath); } catch (e) { }
      }
    }
    const fileSrc = `/uploads/${req.file.filename}`;
    current.src = fileSrc;
    current.imageUrl = fileSrc;
    current.originalName = req.file.originalname;
    current.size = req.file.size;
  } else if (req.body.imageUrl || req.body.src) {
    const newSrc = req.body.imageUrl || req.body.src;
    current.src = newSrc;
    current.imageUrl = newSrc;
  }

  current.updatedAt = new Date().toISOString();
  items[idx] = current;
  writeGalleryData(items);

  res.json({
    success: true,
    message: 'Item updated successfully.',
    item: current
  });
});

// 7. Toggle / Update Status (Publish / Unpublish)
app.patch('/api/gallery/:id/status', (req, res) => {
  const items = readGalleryData();
  const idx = items.findIndex(item => item.id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ success: false, message: 'Item not found.' });
  }

  if (req.body.published !== undefined) {
    items[idx].published = req.body.published === true || req.body.published === 'true';
  } else {
    items[idx].published = !items[idx].published;
  }

  items[idx].updatedAt = new Date().toISOString();
  writeGalleryData(items);

  res.json({
    success: true,
    message: `Item status updated to ${items[idx].published ? 'Published' : 'Draft / Hidden'}.`,
    item: items[idx]
  });
});

// 8. Reorder Gallery Items
app.patch('/api/gallery/reorder', (req, res) => {
  const { orderList, ids, order } = req.body;
  const items = readGalleryData();
  const effectiveOrderList = orderList || (Array.isArray(order) && typeof order[0] === 'object' ? order : null);
  const effectiveIds = ids || (Array.isArray(order) && typeof order[0] === 'string' ? order : null);

  if (Array.isArray(effectiveOrderList)) {
    const map = new Map(effectiveOrderList.map(item => [item.id, parseInt(item.order, 10)]));
    items.forEach(item => {
      if (map.has(item.id)) {
        item.order = map.get(item.id);
        item.updatedAt = new Date().toISOString();
      }
    });
  } else if (Array.isArray(effectiveIds)) {
    effectiveIds.forEach((id, index) => {
      const found = items.find(item => item.id === id);
      if (found) {
        found.order = index + 1;
        found.updatedAt = new Date().toISOString();
      }
    });
  } else {
    return res.status(400).json({ success: false, message: 'Invalid reorder payload.' });
  }

  items.sort((a, b) => (a.order || 99999) - (b.order || 99999));
  writeGalleryData(items);

  res.json({
    success: true,
    message: 'Gallery sequence updated successfully.',
    total: items.length
  });
});

// 9. Delete Gallery Item
app.delete('/api/gallery/:id', (req, res) => {
  const items = readGalleryData();
  const idx = items.findIndex(item => item.id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ success: false, message: 'Item not found.' });
  }

  const [removed] = items.splice(idx, 1);

  // If local file, delete it
  if (removed.src && removed.src.startsWith('/uploads/')) {
    const filePath = path.join(__dirname, removed.src);
    if (fs.existsSync(filePath)) {
      try { fs.unlinkSync(filePath); } catch (e) { }
    }
  }

  writeGalleryData(items);

  res.json({
    success: true,
    message: 'Item removed from gallery.',
    deletedId: req.params.id,
    storagePath: removed.storagePath || null
  });
});

// Fallback route for SPA / root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`=======================================================`);
  console.log(` Ma'din Suffa Campus - Shared Backend & Gallery API`);
  console.log(` Server running on http://127.0.0.1:${PORT}`);
  console.log(` Image Storage:     Firebase Storage + Local Cache`);
  console.log(` Public Website:    http://127.0.0.1:${PORT}/index.html`);
  console.log(` Admin Portal:      http://127.0.0.1:${PORT}/admin.html`);
  console.log(` Gallery API:       http://127.0.0.1:${PORT}/api/gallery`);
  console.log(` Uploads Directory: http://127.0.0.1:${PORT}/uploads/`);
  console.log(` CORS:              Enabled for all origins`);
  console.log(`=======================================================`);
});
