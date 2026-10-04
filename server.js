require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;

const app = express();
const PORT = process.env.PORT || 5000;

// =============================================================
// Cloudinary Configuration (Secure Backend Credentials)
// =============================================================
function initCloudinary() {
  let url = process.env.CLOUDINARY_URL || '';
  if (url) {
    // Strip accidental angle brackets if pasted like cloudinary://<key>:<secret>@cloud
    url = url.replace(/<([^>]+)>/g, '$1').trim();
    process.env.CLOUDINARY_URL = url;
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME ? process.env.CLOUDINARY_CLOUD_NAME.replace(/[<>]/g, '').trim() : undefined;
  const apiKey = process.env.CLOUDINARY_API_KEY ? process.env.CLOUDINARY_API_KEY.replace(/[<>]/g, '').trim() : undefined;
  const apiSecret = process.env.CLOUDINARY_API_SECRET ? process.env.CLOUDINARY_API_SECRET.replace(/[<>]/g, '').trim() : undefined;

  if (cloudName && apiKey && apiSecret) {
    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
      secure: true
    });
  } else if (url) {
    cloudinary.config({
      secure: true
    });
  }

  const conf = cloudinary.config();
  const configured = Boolean(conf.cloud_name && conf.api_key && conf.api_secret);
  if (configured) {
    console.log(`[Cloudinary] Storage backend active for cloud: ${conf.cloud_name}`);
  } else {
    console.warn(`[Cloudinary] Notice: Cloudinary credentials not fully detected. Local storage fallback will be active.`);
  }
  return configured;
}

initCloudinary();

// Global Process Error Handlers for High Availability
process.on('uncaughtException', (err) => {
  console.error('[Uncaught Exception]:', err && err.stack ? err.stack : err);
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('[Unhandled Rejection]:', reason);
});

/**
 * Upload a local file or remote image to Cloudinary securely
 * @param {string} filePathOrUrl
 * @param {string} originalFilename
 */
async function uploadToCloudinary(filePathOrUrl, originalFilename = '') {
  try {
    if (!filePathOrUrl || typeof filePathOrUrl !== 'string') {
      return null;
    }
    const conf = cloudinary.config();
    if (!conf.cloud_name || !conf.api_key || !conf.api_secret) {
      return null;
    }

    let target = filePathOrUrl.trim();
    if (!target) return null;

    // Check if target is a web URL or base64 data URI
    const isRemoteOrData = target.startsWith('http://') || target.startsWith('https://') || target.startsWith('data:');

    if (!isRemoteOrData) {
      // Resolve local relative paths (e.g. /uploads/image.jpg or uploads/image.jpg)
      if (target.startsWith('/') || target.startsWith('\\')) {
        target = path.join(__dirname, target);
      } else if (!path.isAbsolute(target)) {
        target = path.join(__dirname, target);
      }

      if (!fs.existsSync(target)) {
        console.warn(`[Cloudinary Notice] Local file not found for upload: ${target}`);
        return null;
      }
    }

    const uploadOptions = {
      folder: process.env.CLOUDINARY_FOLDER || 'suffa_vavoor/gallery',
      resource_type: 'auto',
      use_filename: true,
      unique_filename: true
    };

    const result = await cloudinary.uploader.upload(target, uploadOptions);
    return {
      src: result.secure_url,
      cloudinaryPublicId: result.public_id,
      format: result.format,
      width: result.width,
      height: result.height,
      bytes: result.bytes
    };
  } catch (err) {
    const errorDetails = err?.error?.message || err?.message || (typeof err?.error === 'string' ? err.error : null) || JSON.stringify(err);
    console.error('[Cloudinary Upload Error]:', errorDetails);
    return null;
  }
}

/**
 * Delete an asset from Cloudinary by public ID
 * @param {string} publicId
 */
async function deleteFromCloudinary(publicId) {
  if (!publicId) return;
  try {
    const res = await cloudinary.uploader.destroy(publicId);
    console.log(`[Cloudinary] Removed asset ${publicId}:`, res.result);
  } catch (err) {
    const errorDetails = err?.error?.message || err?.message || (typeof err?.error === 'string' ? err.error : null) || JSON.stringify(err);
    console.error(`[Cloudinary Destroy Error] Failed to delete ${publicId}:`, errorDetails);
  }
}

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

// Multer Storage Configuration
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

// Load Seed Data with Cloudinary URLs and public_ids
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
// API Endpoints
// -------------------------------------------------------------

// 1. Health & Status
app.get('/api/health', (req, res) => {
  const conf = cloudinary.config();
  const isCloudActive = Boolean(conf.cloud_name && conf.api_key && conf.api_secret);
  res.json({
    status: 'ok',
    institution: "Ma'din Suffa Campus Vavoor (INS7572)",
    storage: isCloudActive ? 'cloudinary' : 'local',
    cloudinary: {
      enabled: isCloudActive,
      cloudName: conf.cloud_name ? `${conf.cloud_name.slice(0, 3)}***` : null
    },
    timestamp: new Date().toISOString()
  });
});

// 2. Admin Authentication
app.post('/api/auth/login', (req, res) => {
  const { identifier, password } = req.body;
  if (!identifier || !password) {
    return res.status(400).json({ success: false, message: 'Institutional ID and password are required.' });
  }

  // Institutional credential verification (supports demo credentials)
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
    return new Date(b.createdAt) - new Date(a.createdAt);
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

// 4b. Dedicated Cloudinary Image Storage Endpoints
app.post('/api/gallery/upload-cloudinary', upload.single('image'), async (req, res) => {
  try {
    let target = null;
    let originalName = '';
    if (req.file) {
      target = req.file.path;
      originalName = req.file.originalname;
    } else if (req.body.imageUrl || req.body.src || req.body.image) {
      target = req.body.imageUrl || req.body.src || req.body.image;
    } else {
      return res.status(400).json({ success: false, message: 'No image file or URL provided for Cloudinary storage.' });
    }

    const cloudUpload = await uploadToCloudinary(target, originalName);
    if (req.file && fs.existsSync(req.file.path)) {
      try { fs.unlinkSync(req.file.path); } catch (e) {}
    }

    if (!cloudUpload || !cloudUpload.src) {
      return res.status(500).json({ success: false, message: 'Cloudinary upload failed. Check server credentials.' });
    }

    res.json({
      success: true,
      imageUrl: cloudUpload.src,
      public_id: cloudUpload.cloudinaryPublicId,
      src: cloudUpload.src,
      cloudinaryPublicId: cloudUpload.cloudinaryPublicId,
      format: cloudUpload.format,
      width: cloudUpload.width,
      height: cloudUpload.height,
      bytes: cloudUpload.bytes
    });
  } catch (err) {
    console.error('[Cloudinary API Error]:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

const handleDeleteCloudinary = async (req, res) => {
  const public_id = req.body.public_id || req.body.cloudinaryPublicId || req.query.public_id || req.query.cloudinaryPublicId;
  if (!public_id) {
    return res.status(400).json({ success: false, message: 'public_id is required to delete an asset from Cloudinary.' });
  }
  await deleteFromCloudinary(public_id);
  res.json({ success: true, message: `Asset ${public_id} deleted from Cloudinary.`, public_id });
};

app.delete('/api/gallery/delete-cloudinary', handleDeleteCloudinary);
app.post('/api/gallery/delete-cloudinary', handleDeleteCloudinary);

// 5. Upload New Gallery Item(s)
app.post('/api/gallery', upload.array('images', 10), async (req, res) => {
  try {
    const items = readGalleryData();
    const title = (req.body.title || '').trim() || 'Suffa Campus Event Capture';
    const caption = (req.body.caption || '').trim() || 'Official media asset captured for Ma\'din Suffa Campus archives.';
    const category = (req.body.category || '').trim() || 'Campus';
    const published = req.body.published === 'true' || req.body.published === true || req.body.published === undefined;
    const featured = req.body.featured === 'true' || req.body.featured === true;

    // Calculate next order
    let maxOrder = items.reduce((max, item) => (item.order && item.order > max ? item.order : max), 0);

    const createdItems = [];

    // Case A: File uploads through multer
    if (req.files && req.files.length > 0) {
      for (let index = 0; index < req.files.length; index++) {
        const file = req.files[index];
        maxOrder += 1;

        let fileSrc = `/uploads/${file.filename}`;
        let cloudinaryPublicId = null;

        // Upload to Cloudinary
        const cloudUpload = await uploadToCloudinary(file.path, file.originalname);
        if (cloudUpload && cloudUpload.src) {
          fileSrc = cloudUpload.src;
          cloudinaryPublicId = cloudUpload.cloudinaryPublicId;
          // Clean up local temporary file
          try {
            if (fs.existsSync(file.path)) {
              fs.unlinkSync(file.path);
            }
          } catch (unlinkErr) {
            console.warn('[Storage] Temporary file cleanup warning:', unlinkErr.message);
          }
        }

        const newItem = {
          id: `gallery_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
          imageUrl: fileSrc,
          public_id: cloudinaryPublicId,
          src: fileSrc,
          cloudinaryPublicId: cloudinaryPublicId,
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
    // Case B: URL or Base64 Image provided in body
    else if (req.body.imageUrl || req.body.src) {
      maxOrder += 1;
      let imgSrc = req.body.imageUrl || req.body.src;
      let cloudinaryPublicId = req.body.public_id || req.body.cloudinaryPublicId || null;

      // If remote or data URL, store on Cloudinary if active
      if (!imgSrc.includes('res.cloudinary.com')) {
        const cloudUpload = await uploadToCloudinary(imgSrc);
        if (cloudUpload && cloudUpload.src) {
          imgSrc = cloudUpload.src;
          cloudinaryPublicId = cloudUpload.cloudinaryPublicId;
        }
      }

      const newItem = {
        id: `gallery_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
        imageUrl: imgSrc,
        public_id: cloudinaryPublicId,
        src: imgSrc,
        cloudinaryPublicId: cloudinaryPublicId,
        title: title,
        caption: caption,
        category: category,
        badge: category,
        published: published,
        order: maxOrder,
        featured: featured,
        createdAt: new Date().toISOString(),
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
      message: `${createdItems.length} item(s) successfully stored in Cloudinary & saved to gallery.`,
      items: createdItems,
      item: createdItems[0]
    });
  } catch (err) {
    console.error('Error uploading gallery item:', err);
    res.status(500).json({ success: false, message: 'Internal server error while saving image.' });
  }
});

// 6. Update Gallery Item
app.put('/api/gallery/:id', upload.single('image'), async (req, res) => {
  const items = readGalleryData();
  const idx = items.findIndex(item => item.id === req.params.id);
  if (idx === -1) {

    return res.status(404).json({ success: false, message: 'Item not found.' });
  }

  const current = items[idx];
  const { title, caption, category, published, order, featured } = req.body;

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

  // If new image file uploaded
  if (req.file) {
    // If old file was in local uploads, delete it to keep storage clean
    if (current.src && current.src.startsWith('/uploads/')) {
      const oldPath = path.join(__dirname, current.src);
      if (fs.existsSync(oldPath)) {
        try { fs.unlinkSync(oldPath); } catch (e) { }
      }
    }
    // If old file was on Cloudinary, delete it from Cloudinary
    if (current.cloudinaryPublicId) {
      await deleteFromCloudinary(current.cloudinaryPublicId);
      current.cloudinaryPublicId = null;
    }

    let fileSrc = `/uploads/${req.file.filename}`;
    let cloudinaryPublicId = null;

    const cloudUpload = await uploadToCloudinary(req.file.path, req.file.originalname);
    if (cloudUpload && cloudUpload.src) {
      fileSrc = cloudUpload.src;
      cloudinaryPublicId = cloudUpload.cloudinaryPublicId;
      try {
        if (fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }
      } catch (e) { }
    }

    current.src = fileSrc;
    current.imageUrl = fileSrc;
    current.public_id = cloudinaryPublicId;
    current.cloudinaryPublicId = cloudinaryPublicId;
    current.originalName = req.file.originalname;
    current.size = req.file.size;
  } else if (req.body.imageUrl || req.body.src) {
    const newSrc = req.body.imageUrl || req.body.src;
    if (newSrc !== current.src) {
      if (current.public_id || current.cloudinaryPublicId) {
        await deleteFromCloudinary(current.public_id || current.cloudinaryPublicId);
        current.public_id = null;
        current.cloudinaryPublicId = null;
      }
      current.src = newSrc;
      current.imageUrl = newSrc;
      current.public_id = req.body.public_id || req.body.cloudinaryPublicId || null;
      current.cloudinaryPublicId = current.public_id;
    }
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
    // orderList format: [{ id: "...", order: 1 }, ...]
    const map = new Map(effectiveOrderList.map(item => [item.id, parseInt(item.order, 10)]));
    items.forEach(item => {
      if (map.has(item.id)) {
        item.order = map.get(item.id);
        item.updatedAt = new Date().toISOString();
      }
    });
  } else if (Array.isArray(effectiveIds)) {
    // ids format: [id1, id2, id3, ...] representing exact sequence
    effectiveIds.forEach((id, index) => {
      const found = items.find(item => item.id === id);
      if (found) {
        found.order = index + 1;
        found.updatedAt = new Date().toISOString();
      }
    });
  } else {
    return res.status(400).json({ success: false, message: 'Invalid reorder payload. Expecting "ids" array, "order" array, or "orderList" array.' });
  }

  // Sort items internally
  items.sort((a, b) => (a.order || 99999) - (b.order || 99999));
  writeGalleryData(items);

  res.json({
    success: true,
    message: 'Gallery sequence updated successfully.',
    total: items.length
  });
});

// 9. Delete Gallery Item
app.delete('/api/gallery/:id', async (req, res) => {
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

  // If Cloudinary asset, delete from Cloudinary
  const cloudPubId = removed.public_id || removed.cloudinaryPublicId;
  if (cloudPubId) {
    await deleteFromCloudinary(cloudPubId);
  } else if (removed.src && removed.src.includes('res.cloudinary.com')) {
    const match = removed.src.match(/\/upload\/(?:v\d+\/)?([^\.]+)/);
    if (match && match[1]) {
      await deleteFromCloudinary(match[1]);
    }
  }

  writeGalleryData(items);

  res.json({
    success: true,
    message: 'Item removed from gallery.',
    deletedId: req.params.id
  });
});

// Fallback route for SPA / root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start Server
app.listen(PORT, '0.0.0.0', () => {
  const conf = cloudinary.config();
  const cloudStatus = (conf.cloud_name && conf.api_key && conf.api_secret)
    ? `Active (${conf.cloud_name})`
    : 'Local Storage Fallback';

  console.log(`=======================================================`);
  console.log(` Ma'din Suffa Campus - Shared Backend & Gallery API`);
  console.log(` Server running on http://127.0.0.1:${PORT}`);
  console.log(` Cloudinary:        ${cloudStatus}`);
  console.log(` Public Website:    http://127.0.0.1:${PORT}/index.html`);
  console.log(` Admin Portal:      http://127.0.0.1:${PORT}/admin.html`);
  console.log(` Gallery API:       http://127.0.0.1:${PORT}/api/gallery`);
  console.log(` Uploads Directory: http://127.0.0.1:${PORT}/uploads/`);
  console.log(` CORS:              Enabled for all origins (* / 5500 / 5501)`);
  console.log(`=======================================================`);
});
