require('dotenv').config();
const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

const GALLERY_FILE = path.join(__dirname, '..', 'data', 'gallery.json');
const raw = fs.readFileSync(GALLERY_FILE, 'utf8');
const items = JSON.parse(raw);

async function run() {
  console.log(`Starting Cloudinary migration for ${items.length} items...`);
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item.src && item.src.includes('res.cloudinary.com') && item.public_id) {
      console.log(`[${i+1}/${items.length}] ${item.id} already on Cloudinary: ${item.public_id}`);
      continue;
    }

    let target = item.src;
    if (target.startsWith('/uploads/') || target.startsWith('uploads/')) {
      target = path.join(__dirname, '..', target);
      if (!fs.existsSync(target)) {
        console.warn(`File not found: ${target}`);
        continue;
      }
    }

    const publicId = `suffa_vavoor/gallery/${item.id}`;
    console.log(`[${i+1}/${items.length}] Uploading ${item.id} to Cloudinary...`);
    try {
      const res = await cloudinary.uploader.upload(target, {
        folder: 'suffa_vavoor/gallery',
        public_id: item.id,
        overwrite: true
      });
      console.log(`  -> Uploaded! ${res.secure_url}`);
      item.imageUrl = res.secure_url;
      item.src = res.secure_url;
      item.public_id = res.public_id;
      item.cloudinaryPublicId = res.public_id;
      item.updatedAt = new Date().toISOString();
    } catch (err) {
      console.error(`  -> Failed for ${item.id}:`, err.message);
    }
  }

  fs.writeFileSync(GALLERY_FILE, JSON.stringify(items, null, 2), 'utf8');
  console.log('Saved updated gallery.json with Cloudinary URLs and public_ids!');
}

run();
