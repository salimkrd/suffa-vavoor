/**
 * Ma'din Suffa Campus - Shared Gallery API Client
 * Seamless communication between Admin Panel (port 5501) and Public Site (port 5500/5000)
 */
(function (global) {
  // Determine backend base URL
  const DEFAULT_BACKEND_PORT = 5000;
  let backendOrigin = '';

  if (global.location) {
    if (global.location.port === String(DEFAULT_BACKEND_PORT)) {
      backendOrigin = ''; // Relative path when served directly from backend
    } else {
      // Running from Live Server (5500, 5501) or other port
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
     * Fetch gallery items
     * @param {Object} options { publishedOnly: boolean, category: string }
     */
    getAll: async function (options = {}) {
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
        console.warn('GalleryAPI.getAll warning (fallback to local if offline):', err);
        throw err;
      }
    },

    /**
     * Fetch a single item by ID
     */
    getById: async function (id) {
      const res = await fetch(`${BASE_API}/gallery/${encodeURIComponent(id)}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return data.item;
    },

    /**
     * Upload one or more image files or create with imageUrl
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

      const res = await fetch(`${BASE_API}/gallery`, options);
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `Upload failed with HTTP ${res.status}`);
      }
      const result = await res.json();
      broadcastChange('upload', result.item);
      return result;
    },

    /**
     * Update an item's metadata or image
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
      broadcastChange('update', result.item);
      return result;
    },

    /**
     * Toggle or set publish status
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
      broadcastChange('toggle_publish', result.item);
      return result;
    },

    /**
     * Reorder gallery items
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
      broadcastChange('reorder', result);
      return result;
    },

    /**
     * Delete an item
     */
    delete: async function (id) {
      const res = await fetch(`${BASE_API}/gallery/${encodeURIComponent(id)}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const result = await res.json();
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
     * Register a callback for live updates from admin actions
     */
    subscribe: function (callback) {
      if (typeof callback !== 'function') return;

      if (syncChannel) {
        syncChannel.addEventListener('message', (event) => {
          callback(event.data);
        });
      }

      window.addEventListener('storage', (event) => {
        if (event.key === 'suffa_gallery_last_update' && event.newValue) {
          try {
            const data = JSON.parse(event.newValue);
            callback(data);
          } catch (e) { }
        }
      });

      // Also trigger refresh when window/tab regains focus
      window.addEventListener('focus', () => {
        callback({ action: 'focus_refresh' });
      });
    }
  };

  global.GalleryAPI = GalleryAPI;
})(window);
