/**
 * Ma'din Suffa Campus - Shared Gallery API Client
 *
 * Architecture:
 * - Firebase = Database / Gallery Data Store
 * - Cloudinary = Image Storage (URL and public_id only)
 *
 * Seamless communication between Admin Portal and Public Site.
 */
(function (global) {
  // Determine backend base URL
  const DEFAULT_BACKEND_PORT = 5000;
  let backendOrigin = '';

  if (global.location) {
    if (global.location.port === String(DEFAULT_BACKEND_PORT)) {
      backendOrigin = ''; // Relative path when served directly from backend
    } else {
      const hostname = global.location.hostname || '127.0.0.1';
      backendOrigin = `${global.location.protocol}//${hostname}:${DEFAULT_BACKEND_PORT}`;
    }
  } else {
    backendOrigin = `http://127.0.0.1:${DEFAULT_BACKEND_PORT}`;
  }

  const BASE_API = (global.GALLERY_API_URL || backendOrigin) + '/api';

  // Broadcast Channel for live cross-tab/cross-port communication
  let syncChannel = null;
  try {
    syncChannel = new BroadcastChannel('suffa_gallery_sync');
  } catch (e) {
    // Fallback if BroadcastChannel not supported
  }

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
     * Resolves an image path to full URL if it is a local upload and accessed from another port
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
     * Fetch gallery items - prioritized from Firebase Firestore with backend API fallback
     * @param {Object} options { publishedOnly: boolean, category: string }
     */
    getAll: async function (options = {}) {
      // 1. Primary: Try Firebase Firestore
      if (global.SuffaFirebase && typeof global.SuffaFirebase.getGalleryItems === 'function') {
        try {
          const fbItems = await global.SuffaFirebase.getGalleryItems(options);
          if (fbItems && fbItems.length > 0) {
            return fbItems;
          }
        } catch (fbErr) {
          console.warn('SuffaFirebase.getGalleryItems warning (falling back to backend API):', fbErr.message);
        }
      }

      // 2. Secondary / Fallback: Backend REST API
      try {
        const params = new URLSearchParams();
        if (options.publishedOnly) params.append('published', 'true');
        if (options.category && options.category !== 'all' && options.category !== 'All') {
          params.append('category', options.category);
        }

        const url = `${BASE_API}/gallery${params.toString() ? '?' + params.toString() : ''}`;
        const res = await fetch(url, { method: 'GET', headers: { 'Accept': 'application/json' } });
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        const data = await res.json();
        return data.items || [];
      } catch (err) {
        console.warn('GalleryAPI.getAll warning (fallback to local cache):', err.message);
        if (global.SuffaFirebase && typeof global.SuffaFirebase.getLocalGallery === 'function') {
          return global.SuffaFirebase.getLocalGallery(options);
        }
        return [];
      }
    },

    /**
     * Fetch a single item by ID
     */
    getById: async function (id) {
      const items = await this.getAll();
      const found = items.find(i => i.id === id);
      if (found) return found;

      const res = await fetch(`${BASE_API}/gallery/${encodeURIComponent(id)}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return data.item;
    },

    /**
     * Upload an image file to Cloudinary & save record to Firebase
     * @param {FormData|Object} data
     */
    upload: async function (data) {
      let options = { method: 'POST' };

      if (data instanceof FormData) {
        options.body = data;
      } else {
        options.headers = { 'Content-Type': 'application/json' };
        options.body = JSON.stringify(data);
      }

      // Upload image via backend (which uploads to Cloudinary using secret credentials)
      const res = await fetch(`${BASE_API}/gallery`, options);
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `Upload failed with HTTP ${res.status}`);
      }
      const result = await res.json();

      // Synchronize with Firebase Firestore
      if (result.items && Array.isArray(result.items) && global.SuffaFirebase) {
        for (const item of result.items) {
          try {
            await global.SuffaFirebase.saveGalleryItem({
              id: item.id,
              imageUrl: item.imageUrl || item.src,
              public_id: item.public_id || item.cloudinaryPublicId,
              title: item.title,
              caption: item.caption,
              category: item.category,
              badge: item.badge,
              published: item.published,
              order: item.order,
              featured: item.featured
            });
          } catch (e) {
            console.warn('Sync to Firebase after upload note:', e.message);
          }
        }
      } else if (result.item && global.SuffaFirebase) {
        try {
          await global.SuffaFirebase.saveGalleryItem({
            id: result.item.id,
            imageUrl: result.item.imageUrl || result.item.src,
            public_id: result.item.public_id || result.item.cloudinaryPublicId,
            title: result.item.title,
            caption: result.item.caption,
            category: result.item.category,
            badge: result.item.badge,
            published: result.item.published,
            order: result.item.order,
            featured: result.item.featured
          });
        } catch (e) {
          console.warn('Sync to Firebase after upload note:', e.message);
        }
      }

      broadcastChange('upload', result.item);
      return result;
    },

    /**
     * Update an item's metadata or image in Cloudinary & Firebase
     * @param {string} id
     * @param {FormData|Object} data
     */
    update: async function (id, data) {
      let options = { method: 'PUT' };

      if (data instanceof FormData) {
        options.body = data;
      } else {
        options.headers = { 'Content-Type': 'application/json' };
        options.body = JSON.stringify(data);
      }

      const res = await fetch(`${BASE_API}/gallery/${encodeURIComponent(id)}`, options);
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `Update failed with HTTP ${res.status}`);
      }
      const result = await res.json();

      // Update Firebase Firestore
      if (global.SuffaFirebase && result.item) {
        try {
          await global.SuffaFirebase.updateGalleryItem(id, {
            imageUrl: result.item.imageUrl || result.item.src,
            public_id: result.item.public_id || result.item.cloudinaryPublicId,
            title: result.item.title,
            caption: result.item.caption,
            category: result.item.category,
            badge: result.item.badge,
            published: result.item.published,
            order: result.item.order,
            featured: result.item.featured
          });
        } catch (e) {
          console.warn('Sync update to Firebase note:', e.message);
        }
      }

      broadcastChange('update', result.item);
      return result;
    },

    /**
     * Toggle or set publish status in Firebase & backend
     */
    togglePublish: async function (id, publishedStatus) {
      const body = publishedStatus !== undefined ? { published: publishedStatus } : {};
      const res = await fetch(`${BASE_API}/gallery/${encodeURIComponent(id)}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const result = await res.json();

      // Update in Firebase Firestore
      if (global.SuffaFirebase) {
        try {
          await global.SuffaFirebase.toggleGalleryPublish(id, result.item && result.item.published);
        } catch (e) {
          console.warn('Sync togglePublish to Firebase note:', e.message);
        }
      }

      broadcastChange('toggle_publish', result.item);
      return result;
    },

    /**
     * Reorder gallery items in Firebase & backend
     * @param {Array<string>|Array<Object>} idsOrOrderList
     */
    reorder: async function (idsOrOrderList) {
      let payload = {};
      if (Array.isArray(idsOrOrderList) && typeof idsOrOrderList[0] === 'string') {
        payload = { ids: idsOrOrderList };
      } else {
        payload = { orderList: idsOrOrderList };
      }

      const res = await fetch(`${BASE_API}/gallery/reorder`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const result = await res.json();

      // Update in Firebase Firestore
      if (global.SuffaFirebase) {
        try {
          await global.SuffaFirebase.reorderGalleryItems(idsOrOrderList);
        } catch (e) {
          console.warn('Sync reorder to Firebase note:', e.message);
        }
      }

      broadcastChange('reorder', result);
      return result;
    },

    /**
     * Delete an item: Deletes image asset from Cloudinary and removes record from Firebase
     */
    delete: async function (id) {
      // 1. Delete image from Cloudinary (via backend delete endpoint)
      const res = await fetch(`${BASE_API}/gallery/${encodeURIComponent(id)}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const result = await res.json();

      // 2. Remove document from Firebase Firestore
      if (global.SuffaFirebase) {
        try {
          await global.SuffaFirebase.deleteGalleryItem(id);
        } catch (e) {
          console.warn('Sync delete to Firebase note:', e.message);
        }
      }

      broadcastChange('delete', { id });
      return result;
    },

    /**
     * Authenticate Admin
     */
    login: async function (identifier, password) {
      const res = await fetch(`${BASE_API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Authentication failed');
      }
      return data;
    },

    /**
     * Register a callback for live updates from admin actions & Firebase
     */
    subscribe: function (callback) {
      if (typeof callback !== 'function') return;

      // 1. Firebase live snapshot listener
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

      // 4. Focus refresh
      window.addEventListener('focus', () => {
        callback({ action: 'focus_refresh' });
      });
    }
  };

  global.GalleryAPI = GalleryAPI;
})(window);
