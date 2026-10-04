/**
 * Ma'din Suffa Campus - Shared Gallery API Client
 *
 * Architecture:
 * - Firebase Authentication = Instant Admin Login
 * - Firebase Firestore = Gallery Database & Real-Time Sync
 * - Firebase Storage = Image Storage & CDN
 *
 * Fast, responsive, non-blocking client for Admin Portal and Public Website.
 */
(function (global) {
  const DEFAULT_BACKEND_PORT = 5000;
  let backendOrigin = '';

  if (global.location) {
    if (global.location.port === String(DEFAULT_BACKEND_PORT)) {
      backendOrigin = '';
    } else {
      const hostname = global.location.hostname || '127.0.0.1';
      backendOrigin = `${global.location.protocol}//${hostname}:${DEFAULT_BACKEND_PORT}`;
    }
  } else {
    backendOrigin = `http://127.0.0.1:${DEFAULT_BACKEND_PORT}`;
  }

  const BASE_API = (global.GALLERY_API_URL || backendOrigin) + '/api';

  // Broadcast Channel for live cross-tab communication
  let syncChannel = null;
  try {
    syncChannel = new BroadcastChannel('suffa_gallery_sync');
  } catch (e) { }

  function broadcastChange(action, payload) {
    const message = { action, payload, timestamp: Date.now() };
    if (syncChannel) {
      try { syncChannel.postMessage(message); } catch (e) { }
    }
    try {
      localStorage.setItem('suffa_gallery_last_update', JSON.stringify(message));
    } catch (e) { }
  }

  const GalleryAPI = {
    backendOrigin: backendOrigin,
    baseApi: BASE_API,

    /**
     * Resolves an image path to full URL
     */
    resolveImageUrl: function (src) {
      if (!src) return '';
      if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')) {
        return src;
      }
      if (src.startsWith('/')) {
        return (backendOrigin || '') + src;
      }
      return (backendOrigin || '') + '/' + src;
    },

    /**
     * Fetch all gallery items - prioritized from Firebase Firestore & Local Cache
     * @param {Object} options { publishedOnly: boolean, category: string }
     */
    getAll: async function (options = {}) {
      // 1. Primary: Try Firebase Firestore & Local Cache
      if (global.SuffaFirebase && typeof global.SuffaFirebase.getGalleryItems === 'function') {
        try {
          const fbItems = await global.SuffaFirebase.getGalleryItems(options);
          if (fbItems && fbItems.length > 0) {
            return fbItems;
          }
        } catch (fbErr) {
          console.warn('SuffaFirebase.getGalleryItems note:', fbErr.message);
        }
      }

      // 2. Secondary / Fallback: Backend REST API if running
      try {
        const params = new URLSearchParams();
        if (options.publishedOnly) params.append('published', 'true');
        if (options.category && options.category !== 'all' && options.category !== 'All') {
          params.append('category', options.category);
        }

        const url = `${BASE_API}/gallery${params.toString() ? '?' + params.toString() : ''}`;
        const res = await fetch(url, { method: 'GET', headers: { 'Accept': 'application/json' } });
        if (res.ok) {
          const data = await res.json();
          return data.items || [];
        }
      } catch (err) { }

      // 3. Final Fallback: Local Cache
      if (global.SuffaFirebase && typeof global.SuffaFirebase.getLocalGallery === 'function') {
        return global.SuffaFirebase.getLocalGallery(options);
      }
      return [];
    },

    /**
     * Fetch a single item by ID
     */
    getById: async function (id) {
      const items = await this.getAll();
      const found = items.find(i => i.id === id);
      if (found) return found;

      try {
        const res = await fetch(`${BASE_API}/gallery/${encodeURIComponent(id)}`);
        if (res.ok) {
          const data = await res.json();
          return data.item;
        }
      } catch (e) { }
      return null;
    },

    /**
     * Upload an image file directly to Firebase Storage & save record in Firestore
     * @param {FormData|Object} data
     */
    upload: async function (data) {
      let createdItems = [];

      // Case A: FormData from Admin UI upload form
      if (data instanceof FormData) {
        const title = (data.get('title') || '').trim() || 'Suffa Campus Event Capture';
        const caption = (data.get('caption') || '').trim() || "Official event capture for Ma'din Suffa Campus.";
        const category = (data.get('category') || '').trim() || 'Campus';
        const published = data.get('published') === 'true' || data.get('published') === true;
        const files = data.getAll('images').concat(data.getAll('image')).filter(f => f && f.name);

        if (files.length > 0) {
          for (let i = 0; i < files.length; i++) {
            const file = files[i];
            let uploadRes = null;

            // Upload directly to Firebase Storage
            if (!global.SuffaFirebase || typeof global.SuffaFirebase.uploadImageToStorage !== 'function') {
              throw new Error('Firebase Storage service is not loaded.');
            }

            uploadRes = await global.SuffaFirebase.uploadImageToStorage(file, 'gallery');
            if (!uploadRes || !uploadRes.imageUrl) {
              throw new Error('Firebase Storage upload failed: No download URL returned.');
            }

            const itemTitle = files.length > 1 ? `${title} (${i + 1})` : title;
            const newItemPayload = {
              id: `gallery_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
              imageUrl: uploadRes.imageUrl,
              src: uploadRes.imageUrl,
              storagePath: uploadRes.storagePath || null,
              title: itemTitle,
              caption: caption,
              category: category,
              badge: category,
              published: published,
              order: 999,
              featured: false,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            };

            // Save record in Firebase Firestore
            if (global.SuffaFirebase) {
              const saveResult = await global.SuffaFirebase.saveGalleryItem(newItemPayload);
              createdItems.push(saveResult.item || newItemPayload);
            } else {
              createdItems.push(newItemPayload);
            }
          }
        }
      }
      // Case B: Direct object payload
      else if (data && typeof data === 'object') {
        if (global.SuffaFirebase) {
          const res = await global.SuffaFirebase.saveGalleryItem(data);
          createdItems.push(res.item || data);
        } else {
          createdItems.push(data);
        }
      }

      // Background non-blocking notification to local backend if active
      if (backendOrigin) {
        fetch(`${BASE_API}/gallery`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(createdItems[0] || {})
        }).catch(() => {});
      }

      broadcastChange('upload', createdItems[0]);
      return { success: true, items: createdItems, item: createdItems[0] };
    },

    /**
     * Update an item's metadata or image in Firebase
     * @param {string} id
     * @param {FormData|Object} data
     */
    update: async function (id, data) {
      let updatePayload = {};

      if (data instanceof FormData) {
        const title = data.get('title');
        const caption = data.get('caption');
        const category = data.get('category');
        const published = data.get('published');
        const file = data.get('image');

        if (title !== null) updatePayload.title = title.trim();
        if (caption !== null) updatePayload.caption = caption.trim();
        if (category !== null) {
          updatePayload.category = category.trim();
          updatePayload.badge = category.trim();
        }
        if (published !== null) updatePayload.published = (published === 'true' || published === true);

        // If new image file uploaded, store in Firebase Storage
        if (file && file.name && file.size > 0 && global.SuffaFirebase) {
          const oldItem = await this.getById(id);
          const uploadRes = await global.SuffaFirebase.uploadImageToStorage(file, 'gallery');
          if (uploadRes && uploadRes.imageUrl) {
            updatePayload.imageUrl = uploadRes.imageUrl;
            updatePayload.src = uploadRes.imageUrl;
            updatePayload.storagePath = uploadRes.storagePath;

            // Clean up previous image from Firebase Storage if replaced
            if (oldItem && (oldItem.storagePath || (oldItem.imageUrl && oldItem.imageUrl.includes('firebasestorage')))) {
              await global.SuffaFirebase.deleteImageFromStorage(oldItem.storagePath || oldItem.imageUrl);
            }
          }
        }
      } else {
        updatePayload = { ...data };
      }

      // Update in Firebase Firestore
      let updatedItem = null;
      if (global.SuffaFirebase) {
        const res = await global.SuffaFirebase.updateGalleryItem(id, updatePayload);
        updatedItem = res.item || updatePayload;
      }

      // Non-blocking sync to backend
      if (backendOrigin) {
        fetch(`${BASE_API}/gallery/${encodeURIComponent(id)}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatePayload)
        }).catch(() => {});
      }

      broadcastChange('update', updatedItem || { id, ...updatePayload });
      return { success: true, item: updatedItem || { id, ...updatePayload } };
    },

    /**
     * Fast Toggle or set publish status in Firebase
     */
    togglePublish: async function (id, publishedStatus) {
      let resultStatus = false;

      // 1. Instant update in Firebase Firestore & local cache
      if (global.SuffaFirebase) {
        const res = await global.SuffaFirebase.toggleGalleryPublish(id, publishedStatus);
        resultStatus = res.published;
      }

      // 2. Non-blocking backend notification
      if (backendOrigin) {
        fetch(`${BASE_API}/gallery/${encodeURIComponent(id)}/status`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ published: resultStatus })
        }).catch(() => {});
      }

      const item = { id, published: resultStatus };
      broadcastChange('toggle_publish', item);
      return { success: true, item };
    },

    /**
     * Reorder gallery items in Firebase
     * @param {Array<string>|Array<Object>} idsOrOrderList
     */
    reorder: async function (idsOrOrderList) {
      // 1. Instant update in Firebase Firestore
      if (global.SuffaFirebase) {
        await global.SuffaFirebase.reorderGalleryItems(idsOrOrderList);
      }

      // 2. Non-blocking backend notification
      if (backendOrigin) {
        let payload = {};
        if (Array.isArray(idsOrOrderList) && typeof idsOrOrderList[0] === 'string') {
          payload = { ids: idsOrOrderList };
        } else {
          payload = { orderList: idsOrOrderList };
        }
        fetch(`${BASE_API}/gallery/reorder`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }).catch(() => {});
      }

      broadcastChange('reorder', { idsOrOrderList });
      return { success: true };
    },

    /**
     * Delete an item: Removes image file from Firebase Storage & document from Firestore
     */
    delete: async function (id) {
      // 1. Remove from Firebase Storage and Firestore
      if (global.SuffaFirebase) {
        await global.SuffaFirebase.deleteGalleryItem(id);
      }

      // 2. Non-blocking backend delete
      if (backendOrigin) {
        fetch(`${BASE_API}/gallery/${encodeURIComponent(id)}`, {
          method: 'DELETE'
        }).catch(() => {});
      }

      broadcastChange('delete', { id });
      return { success: true, id };
    },

    /**
     * Authenticate Admin (Instant verification, never blocks on storage)
     */
    login: async function (identifier, password) {
      if (global.SuffaFirebase && typeof global.SuffaFirebase.loginAdmin === 'function') {
        try {
          return await global.SuffaFirebase.loginAdmin(identifier, password);
        } catch (fbErr) {
          // If Firebase throws, try backend REST endpoint if accessible
          if (backendOrigin) {
            try {
              const res = await fetch(`${BASE_API}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ identifier, password })
              });
              const data = await res.json();
              if (res.ok && data.success) return data;
            } catch (beErr) { }
          }
          throw fbErr;
        }
      }

      if (backendOrigin) {
        const res = await fetch(`${BASE_API}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ identifier, password })
        });
        const data = await res.json();
        if (res.ok && data.success) return data;
        throw new Error(data.message || 'Invalid institutional credentials.');
      }

      throw new Error('Authentication service is currently unavailable.');
    },

    /**
     * Register a callback for live updates from admin actions & Firebase
     */
    subscribe: function (callback) {
      if (typeof callback !== 'function') return;

      // 1. Firebase live snapshot listener (deduplicated)
      if (global.SuffaFirebase && typeof global.SuffaFirebase.onGalleryUpdate === 'function') {
        global.SuffaFirebase.onGalleryUpdate(items => {
          callback({ action: 'firebase_sync', items });
        });
      }

      // 2. Cross-tab Broadcast Channel
      if (syncChannel) {
        syncChannel.addEventListener('message', (event) => {
          callback(event.data);
        });
      }

      // 3. Local storage event
      window.addEventListener('storage', (event) => {
        if (event.key === 'suffa_gallery_last_update' && event.newValue) {
          try {
            const data = JSON.parse(event.newValue);
            callback(data);
          } catch (e) { }
        }
      });
    }
  };

  global.GalleryAPI = GalleryAPI;
})(window);
