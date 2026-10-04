/**
 * Ma'din Suffa Campus Vavoor - Firebase Configuration & Services
 * Project ID: suffa-vavoor-5d3cd
 * Affiliation: Jamiathul Hind Al Islamiyya (Centre Code: INS7572)
 *
 * Firebase = Database / Gallery Data Store
 * Cloudinary = Image Storage (URL & public_id stored in Firebase)
 */

const firebaseConfig = {
  apiKey: "AIzaSyDomNjt24RfBrwO0wPw7JVOyDA8gFse8y0",
  authDomain: "suffa-vavoor-5d3cd.firebaseapp.com",
  projectId: "suffa-vavoor-5d3cd",
  storageBucket: "suffa-vavoor-5d3cd.firebasestorage.app",
  messagingSenderId: "350648551215",
  appId: "1:350648551215:web:fad1ed0d1f57190f9683da",
  measurementId: "G-FB38GGC91M"
};

// Seed gallery items with Cloudinary storage URLs and public_ids
const defaultCloudinaryGallery = [
  {
    id: "gallery_01",
    imageUrl: "https://res.cloudinary.com/pnuenefp/image/upload/v1791086294/suffa_vavoor/gallery/gallery_01.jpg",
    public_id: "suffa_vavoor/gallery/gallery_01",
    src: "https://res.cloudinary.com/pnuenefp/image/upload/v1791086294/suffa_vavoor/gallery/gallery_01.jpg",
    cloudinaryPublicId: "suffa_vavoor/gallery/gallery_01",
    title: "Campus Administrative Quadrangle - Main Pavilions",
    caption: "Student delivers eloquent oratory during Inspiraath Art Festival at Ma'din Suffa Campus.",
    category: "Inspiraath '25",
    badge: "Inspiraath '25",
    published: true,
    order: 1,
    featured: true,
    createdAt: "2026-09-15T08:00:00.000Z",
    updatedAt: "2026-10-04T03:58:48.534Z"
  },
  {
    id: "gallery_02",
    imageUrl: "https://res.cloudinary.com/pnuenefp/image/upload/v1791086329/suffa_vavoor/gallery/gallery_02.jpg",
    public_id: "suffa_vavoor/gallery/gallery_02",
    src: "https://res.cloudinary.com/pnuenefp/image/upload/v1791086329/suffa_vavoor/gallery/gallery_02.jpg",
    cloudinaryPublicId: "suffa_vavoor/gallery/gallery_02",
    title: "Holy Qur'an Tilawa Recitation",
    caption: "Classical Qur'anic recitation presentation in melodious maqaamat.",
    category: "Qur'an & Tajweed",
    badge: "Qur'an & Tajweed",
    published: true,
    order: 2,
    featured: false,
    createdAt: "2026-09-16T08:00:00.000Z",
    updatedAt: "2026-10-04T03:58:49.717Z"
  },
  {
    id: "gallery_03",
    imageUrl: "https://res.cloudinary.com/pnuenefp/image/upload/v1791086330/suffa_vavoor/gallery/gallery_03.jpg",
    public_id: "suffa_vavoor/gallery/gallery_03",
    src: "https://res.cloudinary.com/pnuenefp/image/upload/v1791086330/suffa_vavoor/gallery/gallery_03.jpg",
    cloudinaryPublicId: "suffa_vavoor/gallery/gallery_03",
    title: "Na'at & Nasheed Circle",
    caption: "Harmonious Islamic choral ensemble presented by campus scholars.",
    category: "Events",
    badge: "Vocal Arts",
    published: true,
    order: 3,
    featured: false,
    createdAt: "2026-09-17T08:00:00.000Z",
    updatedAt: "2026-10-04T03:58:51.211Z"
  },
  {
    id: "gallery_04",
    imageUrl: "https://res.cloudinary.com/pnuenefp/image/upload/v1791086335/suffa_vavoor/gallery/gallery_04.jpg",
    public_id: "suffa_vavoor/gallery/gallery_04",
    src: "https://res.cloudinary.com/pnuenefp/image/upload/v1791086335/suffa_vavoor/gallery/gallery_04.jpg",
    cloudinaryPublicId: "suffa_vavoor/gallery/gallery_04",
    title: "Scholarly Dialogue & Stage Orators",
    caption: "Interactive discussion on moral values, contemporary Islamic thought, and leadership.",
    category: "Oratory & Stage",
    badge: "Oratory & Stage",
    published: true,
    order: 4,
    featured: false,
    createdAt: "2026-09-18T08:00:00.000Z",
    updatedAt: "2026-10-04T03:58:55.810Z"
  },
  {
    id: "gallery_05",
    imageUrl: "https://res.cloudinary.com/pnuenefp/image/upload/v1791086336/suffa_vavoor/gallery/gallery_05.jpg",
    public_id: "suffa_vavoor/gallery/gallery_05",
    src: "https://res.cloudinary.com/pnuenefp/image/upload/v1791086336/suffa_vavoor/gallery/gallery_05.jpg",
    cloudinaryPublicId: "suffa_vavoor/gallery/gallery_05",
    title: "Inspiraath Youth Orator on Dais",
    caption: "Articulate young Hafiz delivering speech on leadership and society.",
    category: "Oratory & Stage",
    badge: "Student Oratory",
    published: true,
    order: 5,
    featured: false,
    createdAt: "2026-09-19T08:00:00.000Z",
    updatedAt: "2026-10-04T03:58:56.918Z"
  },
  {
    id: "gallery_06",
    imageUrl: "https://res.cloudinary.com/pnuenefp/image/upload/v1791086338/suffa_vavoor/gallery/gallery_06.jpg",
    public_id: "suffa_vavoor/gallery/gallery_06",
    src: "https://res.cloudinary.com/pnuenefp/image/upload/v1791086338/suffa_vavoor/gallery/gallery_06.jpg",
    cloudinaryPublicId: "suffa_vavoor/gallery/gallery_06",
    title: "Campus Anthem Showcase",
    caption: "Group presentation conveying institutional values and Islamic heritage.",
    category: "Events",
    badge: "Campus Ensemble",
    published: true,
    order: 6,
    featured: false,
    createdAt: "2026-09-20T08:00:00.000Z",
    updatedAt: "2026-10-04T03:58:57.918Z"
  },
  {
    id: "gallery_07",
    imageUrl: "https://res.cloudinary.com/pnuenefp/image/upload/v1791086339/suffa_vavoor/gallery/gallery_07.jpg",
    public_id: "suffa_vavoor/gallery/gallery_07",
    src: "https://res.cloudinary.com/pnuenefp/image/upload/v1791086339/suffa_vavoor/gallery/gallery_07.jpg",
    cloudinaryPublicId: "suffa_vavoor/gallery/gallery_07",
    title: "Colloquium Panel Discussion",
    caption: "Faculty panel and academic guests exchanging insights on education.",
    category: "Scholars & Colloquium",
    badge: "Colloquium",
    published: true,
    order: 7,
    featured: false,
    createdAt: "2026-09-21T08:00:00.000Z",
    updatedAt: "2026-10-04T03:58:59.011Z"
  },
  {
    id: "gallery_08",
    imageUrl: "https://res.cloudinary.com/pnuenefp/image/upload/v1791086341/suffa_vavoor/gallery/gallery_08.jpg",
    public_id: "suffa_vavoor/gallery/gallery_08",
    src: "https://res.cloudinary.com/pnuenefp/image/upload/v1791086341/suffa_vavoor/gallery/gallery_08.jpg",
    cloudinaryPublicId: "suffa_vavoor/gallery/gallery_08",
    title: "Expressing Humanity Colloquium",
    caption: "Keynote address delivered by distinguished scholar on humanitarian ethics.",
    category: "Scholars & Colloquium",
    badge: "Keynote",
    published: true,
    order: 8,
    featured: false,
    createdAt: "2026-09-22T08:00:00.000Z",
    updatedAt: "2026-10-04T03:59:00.124Z"
  },
  {
    id: "gallery_09",
    imageUrl: "https://res.cloudinary.com/pnuenefp/image/upload/v1791086342/suffa_vavoor/gallery/gallery_09.jpg",
    public_id: "suffa_vavoor/gallery/gallery_09",
    src: "https://res.cloudinary.com/pnuenefp/image/upload/v1791086342/suffa_vavoor/gallery/gallery_09.jpg",
    cloudinaryPublicId: "suffa_vavoor/gallery/gallery_09",
    title: "Scholars in Assembly",
    caption: "Eminent dignitaries participating in the annual symposium.",
    category: "Scholars & Colloquium",
    badge: "Symposium",
    published: true,
    order: 9,
    featured: false,
    createdAt: "2026-09-23T08:00:00.000Z",
    updatedAt: "2026-10-04T03:59:01.321Z"
  },
  {
    id: "gallery_10",
    imageUrl: "https://res.cloudinary.com/pnuenefp/image/upload/v1791086343/suffa_vavoor/gallery/gallery_10.jpg",
    public_id: "suffa_vavoor/gallery/gallery_10",
    src: "https://res.cloudinary.com/pnuenefp/image/upload/v1791086343/suffa_vavoor/gallery/gallery_10.jpg",
    cloudinaryPublicId: "suffa_vavoor/gallery/gallery_10",
    title: "Multilingual Public Speaking",
    caption: "Students practicing eloquence and communication in Arabic and English.",
    category: "Oratory & Stage",
    badge: "Communication",
    published: true,
    order: 10,
    featured: false,
    createdAt: "2026-09-24T08:00:00.000Z",
    updatedAt: "2026-10-04T03:59:02.518Z"
  },
  {
    id: "gallery_11",
    imageUrl: "https://res.cloudinary.com/pnuenefp/image/upload/v1791086344/suffa_vavoor/gallery/gallery_11.jpg",
    public_id: "suffa_vavoor/gallery/gallery_11",
    src: "https://res.cloudinary.com/pnuenefp/image/upload/v1791086344/suffa_vavoor/gallery/gallery_11.jpg",
    cloudinaryPublicId: "suffa_vavoor/gallery/gallery_11",
    title: "Inspiraath Public Lecture",
    caption: "Scholastic address during the academic festival at Vavoor.",
    category: "Inspiraath '25",
    badge: "Inspiraath '25",
    published: true,
    order: 11,
    featured: false,
    createdAt: "2026-09-25T08:00:00.000Z",
    updatedAt: "2026-10-04T03:59:03.621Z"
  },
  {
    id: "gallery_12",
    imageUrl: "https://res.cloudinary.com/pnuenefp/image/upload/v1791086345/suffa_vavoor/gallery/gallery_12.jpg",
    public_id: "suffa_vavoor/gallery/gallery_12",
    src: "https://res.cloudinary.com/pnuenefp/image/upload/v1791086345/suffa_vavoor/gallery/gallery_12.jpg",
    cloudinaryPublicId: "suffa_vavoor/gallery/gallery_12",
    title: "Inspiraath Youth Oratory",
    caption: "Student elocution demonstrating persuasive speaking technique.",
    category: "Oratory & Stage",
    badge: "Elocution",
    published: true,
    order: 12,
    featured: false,
    createdAt: "2026-09-26T08:00:00.000Z",
    updatedAt: "2026-10-04T03:59:04.718Z"
  },
  {
    id: "gallery_13",
    imageUrl: "https://res.cloudinary.com/pnuenefp/image/upload/v1791086347/suffa_vavoor/gallery/gallery_13.jpg",
    public_id: "suffa_vavoor/gallery/gallery_13",
    src: "https://res.cloudinary.com/pnuenefp/image/upload/v1791086347/suffa_vavoor/gallery/gallery_13.jpg",
    cloudinaryPublicId: "suffa_vavoor/gallery/gallery_13",
    title: "Dignitaries & Faculty",
    caption: "Esteemed mentors and educational leaders in assembly.",
    category: "Scholars & Colloquium",
    badge: "Faculty & Dignitaries",
    published: true,
    order: 13,
    featured: false,
    createdAt: "2026-09-27T08:00:00.000Z",
    updatedAt: "2026-10-04T03:59:05.819Z"
  },
  {
    id: "gallery_14",
    imageUrl: "https://res.cloudinary.com/pnuenefp/image/upload/v1791086348/suffa_vavoor/gallery/gallery_14.jpg",
    public_id: "suffa_vavoor/gallery/gallery_14",
    src: "https://res.cloudinary.com/pnuenefp/image/upload/v1791086348/suffa_vavoor/gallery/gallery_14.jpg",
    cloudinaryPublicId: "suffa_vavoor/gallery/gallery_14",
    title: "Melodious Qur'an Tilawa",
    caption: "A solemn recitation session of the Holy Qur'an.",
    category: "Qur'an & Tajweed",
    badge: "Qur'an Recitation",
    published: true,
    order: 14,
    featured: false,
    createdAt: "2026-09-28T08:00:00.000Z",
    updatedAt: "2026-10-04T03:59:06.918Z"
  },
  {
    id: "gallery_15",
    imageUrl: "https://res.cloudinary.com/pnuenefp/image/upload/v1791086349/suffa_vavoor/gallery/gallery_15.jpg",
    public_id: "suffa_vavoor/gallery/gallery_15",
    src: "https://res.cloudinary.com/pnuenefp/image/upload/v1791086349/suffa_vavoor/gallery/gallery_15.jpg",
    cloudinaryPublicId: "suffa_vavoor/gallery/gallery_15",
    title: "Sacred Scripture Recitation",
    caption: "Mastery of Tajweed and precise phonetic articulation.",
    category: "Qur'an & Tajweed",
    badge: "Tajweed Mastery",
    published: true,
    order: 15,
    featured: false,
    createdAt: "2026-09-29T08:00:00.000Z",
    updatedAt: "2026-10-04T03:59:08.019Z"
  },
  {
    id: "gallery_16",
    imageUrl: "https://res.cloudinary.com/pnuenefp/image/upload/v1791086351/suffa_vavoor/gallery/gallery_16.jpg",
    public_id: "suffa_vavoor/gallery/gallery_16",
    src: "https://res.cloudinary.com/pnuenefp/image/upload/v1791086351/suffa_vavoor/gallery/gallery_16.jpg",
    cloudinaryPublicId: "suffa_vavoor/gallery/gallery_16",
    title: "Trio Vocal Ensemble",
    caption: "Students performing traditional devotional anthems in unison.",
    category: "Events",
    badge: "Nasheed",
    published: true,
    order: 16,
    featured: false,
    createdAt: "2026-09-30T08:00:00.000Z",
    updatedAt: "2026-10-04T03:59:09.117Z"
  },
  {
    id: "gallery_17",
    imageUrl: "https://res.cloudinary.com/pnuenefp/image/upload/v1791086352/suffa_vavoor/gallery/gallery_17.jpg",
    public_id: "suffa_vavoor/gallery/gallery_17",
    src: "https://res.cloudinary.com/pnuenefp/image/upload/v1791086352/suffa_vavoor/gallery/gallery_17.jpg",
    cloudinaryPublicId: "suffa_vavoor/gallery/gallery_17",
    title: "Scholarly Keynote Address",
    caption: "Guest scholar emphasizing character building and scholarly excellence.",
    category: "Scholars & Colloquium",
    badge: "Keynote",
    published: true,
    order: 17,
    featured: false,
    createdAt: "2026-10-01T08:00:00.000Z",
    updatedAt: "2026-10-04T03:59:10.218Z"
  },
  {
    id: "gallery_18",
    imageUrl: "https://res.cloudinary.com/pnuenefp/image/upload/v1791086353/suffa_vavoor/gallery/gallery_18.jpg",
    public_id: "suffa_vavoor/gallery/gallery_18",
    src: "https://res.cloudinary.com/pnuenefp/image/upload/v1791086353/suffa_vavoor/gallery/gallery_18.jpg",
    cloudinaryPublicId: "suffa_vavoor/gallery/gallery_18",
    title: "Campus Mentorship Talk",
    caption: "Faculty lecture inspiring future leaders for global service.",
    category: "Scholars & Colloquium",
    badge: "Mentorship",
    published: true,
    order: 18,
    featured: false,
    createdAt: "2026-10-01T09:00:00.000Z",
    updatedAt: "2026-10-04T03:59:11.319Z"
  },
  {
    id: "gallery_19",
    imageUrl: "https://res.cloudinary.com/pnuenefp/image/upload/v1791086355/suffa_vavoor/gallery/gallery_19.jpg",
    public_id: "suffa_vavoor/gallery/gallery_19",
    src: "https://res.cloudinary.com/pnuenefp/image/upload/v1791086355/suffa_vavoor/gallery/gallery_19.jpg",
    cloudinaryPublicId: "suffa_vavoor/gallery/gallery_19",
    title: "Distinguished Patron Address",
    caption: "Inaugural words from academic patrons at the campus gathering.",
    category: "Scholars & Colloquium",
    badge: "Inaugural",
    published: true,
    order: 19,
    featured: false,
    createdAt: "2026-10-01T10:00:00.000Z",
    updatedAt: "2026-10-04T03:59:12.418Z"
  },
  {
    id: "gallery_20",
    imageUrl: "https://res.cloudinary.com/pnuenefp/image/upload/v1791086356/suffa_vavoor/gallery/gallery_20.jpg",
    public_id: "suffa_vavoor/gallery/gallery_20",
    src: "https://res.cloudinary.com/pnuenefp/image/upload/v1791086356/suffa_vavoor/gallery/gallery_20.jpg",
    cloudinaryPublicId: "suffa_vavoor/gallery/gallery_20",
    title: "Academic Inaugural Address",
    caption: "Valedictory commencement ceremonies celebrating student achievement.",
    category: "Scholars & Colloquium",
    badge: "Valedictory",
    published: true,
    order: 20,
    featured: false,
    createdAt: "2026-10-01T11:00:00.000Z",
    updatedAt: "2026-10-04T03:59:13.518Z"
  }
];

// Global container for Suffa Firebase services
window.SuffaFirebase = {
  config: firebaseConfig,
  app: null,
  analytics: null,
  db: null,
  isInitialized: false,
  initialGallery: defaultCloudinaryGallery,

  init: function() {
    if (this.isInitialized && this.db) return;
    if (typeof firebase === 'undefined') {
      console.warn("Firebase SDK not loaded. Proceeding with local offline fallback.");
      return;
    }

    try {
      if (!firebase.apps.length) {
        this.app = firebase.initializeApp(firebaseConfig);
      } else {
        this.app = firebase.app();
      }

      // Initialize Analytics if supported
      if (typeof firebase.analytics === 'function') {
        try {
          this.analytics = firebase.analytics();
          console.log("Firebase Analytics initialized (G-FB38GGC91M)");
        } catch (e) {
          console.log("Analytics initialization note:", e.message);
        }
      }

      // Initialize Firestore
      if (typeof firebase.firestore === 'function') {
        this.db = firebase.firestore();
        console.log("Firebase Firestore connected (suffa-vavoor-5d3cd)");
      }

      this.isInitialized = true;
    } catch (err) {
      console.error("Firebase init error:", err);
    }
  },

  // Log analytics event
  logEvent: function(eventName, params = {}) {
    if (this.analytics) {
      try {
        this.analytics.logEvent(eventName, params);
      } catch (e) {
        console.warn("Analytics event error:", e);
      }
    }
  },

  // =========================================================================
  // GALLERY MANAGEMENT IN FIREBASE FIRESTORE (Image Storage in Cloudinary)
  // =========================================================================

  /**
   * Seed Firestore 'gallery' collection if empty
   */
  seedFirestoreGallery: async function() {
    if (!this.db) return;
    try {
      const snap = await this.db.collection('gallery').limit(1).get();
      if (snap.empty) {
        console.log("[Firebase] Seeding initial Cloudinary gallery items into Firestore...");
        const batch = this.db.batch();
        defaultCloudinaryGallery.forEach(item => {
          const docRef = this.db.collection('gallery').doc(item.id);
          batch.set(docRef, {
            imageUrl: item.imageUrl,
            public_id: item.public_id,
            src: item.imageUrl,
            cloudinaryPublicId: item.public_id,
            title: item.title,
            caption: item.caption,
            category: item.category,
            badge: item.badge,
            published: item.published,
            order: item.order,
            featured: item.featured,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt
          });
        });
        await batch.commit();
        console.log("[Firebase] Successfully seeded 20 Cloudinary gallery records to Firestore.");
      }
    } catch (e) {
      console.warn("[Firebase] Seeding Firestore gallery skipped or note:", e.message);
    }
  },

  /**
   * Fetch all gallery items from Firebase Firestore
   * @param {Object} options { publishedOnly: boolean, category: string }
   */
  getGalleryItems: async function(options = {}) {
    this.init();

    // 1. Try Firebase Firestore
    if (this.db) {
      try {
        let query = this.db.collection('gallery');
        if (options.publishedOnly) {
          query = query.where('published', '==', true);
        }

        const snapshot = await query.get();
        if (!snapshot.empty) {
          const items = [];
          snapshot.forEach(doc => {
            const d = doc.data();
            items.push({
              id: doc.id,
              ...d,
              imageUrl: d.imageUrl || d.src || '',
              public_id: d.public_id || d.cloudinaryPublicId || '',
              src: d.imageUrl || d.src || '',
              cloudinaryPublicId: d.public_id || d.cloudinaryPublicId || ''
            });
          });

          // Sort by order ascending, then createdAt descending
          items.sort((a, b) => {
            const ordA = typeof a.order === 'number' ? a.order : 9999;
            const ordB = typeof b.order === 'number' ? b.order : 9999;
            if (ordA !== ordB) return ordA - ordB;
            return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
          });

          // Update local cache
          this.saveLocalGallery(items);
          return items;
        } else {
          // If Firestore is empty, seed it asynchronously
          this.seedFirestoreGallery();
        }
      } catch (err) {
        console.warn("Firestore gallery query note (falling back to cache):", err.message);
      }
    }

    // 2. Fallback to LocalStorage or default Cloudinary seed items
    return this.getLocalGallery(options);
  },

  /**
   * Real-time listener for gallery updates in Firebase Firestore
   * @param {Function} callback
   * @param {Object} options
   */
  onGalleryUpdate: function(callback, options = {}) {
    this.init();
    if (this.db) {
      try {
        let query = this.db.collection('gallery');
        if (options.publishedOnly) {
          query = query.where('published', '==', true);
        }

        return query.onSnapshot(snapshot => {
          const items = [];
          snapshot.forEach(doc => {
            const d = doc.data();
            items.push({
              id: doc.id,
              ...d,
              imageUrl: d.imageUrl || d.src || '',
              public_id: d.public_id || d.cloudinaryPublicId || '',
              src: d.imageUrl || d.src || '',
              cloudinaryPublicId: d.public_id || d.cloudinaryPublicId || ''
            });
          });

          if (items.length > 0) {
            items.sort((a, b) => {
              const ordA = typeof a.order === 'number' ? a.order : 9999;
              const ordB = typeof b.order === 'number' ? b.order : 9999;
              if (ordA !== ordB) return ordA - ordB;
              return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
            });
            this.saveLocalGallery(items);
            callback(items);
          } else {
            callback(this.getLocalGallery(options));
          }
        }, error => {
          console.warn("Firestore onGalleryUpdate listener warning:", error.message);
          callback(this.getLocalGallery(options));
        });
      } catch (e) {
        console.warn("Live gallery listener setup failed:", e.message);
        callback(this.getLocalGallery(options));
      }
    } else {
      callback(this.getLocalGallery(options));
    }
  },

  /**
   * Save a gallery record into Firebase Firestore
   * Stores the Cloudinary image URL and public_id as image references
   */
  saveGalleryItem: async function(itemData) {
    this.init();
    const id = itemData.id || `gallery_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    const imageUrl = itemData.imageUrl || itemData.src || '';
    const publicId = itemData.public_id || itemData.cloudinaryPublicId || '';

    const payload = {
      imageUrl: imageUrl,
      public_id: publicId,
      src: imageUrl,
      cloudinaryPublicId: publicId,
      title: (itemData.title || 'Suffa Campus Event Capture').trim(),
      caption: (itemData.caption || 'Official event capture for Ma\'din Suffa Campus.').trim(),
      category: (itemData.category || 'Campus').trim(),
      badge: (itemData.badge || itemData.category || 'Campus').trim(),
      published: itemData.published !== undefined ? Boolean(itemData.published) : true,
      order: typeof itemData.order === 'number' ? itemData.order : 999,
      featured: Boolean(itemData.featured),
      createdAt: itemData.createdAt || (firebase && firebase.firestore ? firebase.firestore.FieldValue.serverTimestamp() : new Date().toISOString()),
      updatedAt: firebase && firebase.firestore ? firebase.firestore.FieldValue.serverTimestamp() : new Date().toISOString()
    };

    // 1. Try Firebase Firestore
    if (this.db) {
      try {
        await this.db.collection('gallery').doc(id).set(payload, { merge: true });
        console.log(`[Firebase Firestore] Gallery item saved (ID: ${id}) with Cloudinary URL: ${imageUrl}`);
        this.logEvent('gallery_item_saved', { id, category: payload.category });
      } catch (err) {
        console.warn("Firestore gallery write warning:", err.message);
      }
    }

    // 2. Always update local storage cache
    const current = this.getLocalGallery();
    const fullItem = { id, ...payload, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    const idx = current.findIndex(x => x.id === id);
    if (idx !== -1) {
      current[idx] = fullItem;
    } else {
      current.unshift(fullItem);
    }
    this.saveLocalGallery(current);

    return { success: true, id, item: fullItem };
  },

  /**
   * Update gallery metadata or Cloudinary image in Firebase Firestore
   */
  updateGalleryItem: async function(id, updateData) {
    this.init();
    const payload = { ...updateData };
    if (payload.imageUrl) payload.src = payload.imageUrl;
    if (payload.public_id) payload.cloudinaryPublicId = payload.public_id;
    payload.updatedAt = firebase && firebase.firestore ? firebase.firestore.FieldValue.serverTimestamp() : new Date().toISOString();

    if (this.db) {
      try {
        await this.db.collection('gallery').doc(id).set(payload, { merge: true });
        console.log(`[Firebase Firestore] Gallery item updated (ID: ${id})`);
      } catch (err) {
        console.warn("Firestore gallery update error:", err.message);
      }
    }

    const current = this.getLocalGallery();
    const idx = current.findIndex(x => x.id === id);
    if (idx !== -1) {
      current[idx] = { ...current[idx], ...payload, updatedAt: new Date().toISOString() };
      this.saveLocalGallery(current);
      return { success: true, item: current[idx] };
    }
    return { success: true };
  },

  /**
   * Delete gallery record from Firebase Firestore
   */
  deleteGalleryItem: async function(id) {
    this.init();
    if (this.db) {
      try {
        await this.db.collection('gallery').doc(id).delete();
        console.log(`[Firebase Firestore] Gallery item removed (ID: ${id})`);
        this.logEvent('gallery_item_deleted', { id });
      } catch (err) {
        console.warn("Firestore gallery delete error:", err.message);
      }
    }

    const current = this.getLocalGallery();
    const filtered = current.filter(x => x.id !== id);
    this.saveLocalGallery(filtered);
    return { success: true, id };
  },

  /**
   * Toggle published visibility status in Firebase Firestore
   */
  toggleGalleryPublish: async function(id, publishedStatus) {
    const current = this.getLocalGallery();
    const item = current.find(x => x.id === id);
    const newStatus = publishedStatus !== undefined ? Boolean(publishedStatus) : !(item && item.published);
    return this.updateGalleryItem(id, { published: newStatus });
  },

  /**
   * Reorder gallery sequence in Firebase Firestore
   */
  reorderGalleryItems: async function(idsOrOrderList) {
    this.init();
    const current = this.getLocalGallery();

    if (Array.isArray(idsOrOrderList)) {
      if (typeof idsOrOrderList[0] === 'string') {
        idsOrOrderList.forEach((id, index) => {
          const item = current.find(x => x.id === id);
          if (item) {
            item.order = index + 1;
            this.updateGalleryItem(id, { order: index + 1 });
          }
        });
      } else if (typeof idsOrOrderList[0] === 'object') {
        idsOrOrderList.forEach(entry => {
          if (entry.id && entry.order !== undefined) {
            const num = parseInt(entry.order, 10);
            this.updateGalleryItem(entry.id, { order: num });
          }
        });
      }
    }

    current.sort((a, b) => (a.order || 9999) - (b.order || 9999));
    this.saveLocalGallery(current);
    return { success: true };
  },

  /**
   * Local cached gallery retrieval with filtering
   */
  getLocalGallery: function(options = {}) {
    let items = [];
    try {
      const stored = localStorage.getItem('suffa_firebase_gallery_cache');
      if (stored) {
        items = JSON.parse(stored);
      }
    } catch (e) {}

    if (!items || items.length === 0) {
      items = [...defaultCloudinaryGallery];
    }

    if (options.publishedOnly) {
      items = items.filter(x => x.published === true);
    }
    if (options.category && options.category !== 'all' && options.category !== 'All') {
      const q = options.category.toLowerCase();
      items = items.filter(x => (x.category || '').toLowerCase().includes(q));
    }

    items.sort((a, b) => (a.order || 9999) - (b.order || 9999));
    return items;
  },

  saveLocalGallery: function(items) {
    try {
      localStorage.setItem('suffa_firebase_gallery_cache', JSON.stringify(items));
    } catch (e) {}
  },

  // =========================================================================
  // ADMISSIONS ENQUIRIES (Existing Service Preserved Exactly)
  // =========================================================================

  // Save student admission enquiry to Firestore
  saveEnquiry: async function(enquiryData) {
    const payload = {
      name: enquiryData.name || '',
      phone: enquiryData.phone || '',
      track: enquiryData.track || 'Integrated Islamic Sciences',
      message: enquiryData.message || '',
      channel: enquiryData.channel || 'Public Web Form',
      status: enquiryData.status || 'New Enquiry',
      centreCode: 'INS7572',
      campus: 'Ma\'din Suffa Campus Vavoor',
      createdAt: firebase && firebase.firestore ? firebase.firestore.FieldValue.serverTimestamp() : new Date().toISOString(),
      timestampStr: new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
    };

    // 1. Try Firebase Firestore
    if (this.db) {
      try {
        const docRef = await this.db.collection('admissions_enquiries').add(payload);
        console.log("Enquiry saved to Firestore with ID:", docRef.id);
        this.logEvent('admission_enquiry_recorded', { track: payload.track });
        return { success: true, id: docRef.id };
      } catch (err) {
        console.warn("Firestore write error, saving to local fallback:", err);
      }
    }

    // 2. Fallback to LocalStorage so data is never lost
    try {
      const local = JSON.parse(localStorage.getItem('suffa_local_enquiries') || '[]');
      local.unshift(payload);
      localStorage.setItem('suffa_local_enquiries', JSON.stringify(local.slice(0, 100)));
      return { success: true, isLocal: true };
    } catch (e) {
      return { success: false, error: e };
    }
  },

  // Fetch real-time inquiries for Admissions desk
  onEnquiriesUpdate: function(callback) {
    if (this.db) {
      try {
        return this.db.collection('admissions_enquiries')
          .orderBy('createdAt', 'desc')
          .limit(50)
          .onSnapshot(snapshot => {
            const list = [];
            snapshot.forEach(doc => {
              list.push({ id: doc.id, ...doc.data() });
            });
            callback(list);
          }, error => {
            console.warn("Firestore snapshot listener error:", error);
            this.loadLocalEnquiries(callback);
          });
      } catch (e) {
        console.warn("Live listener setup failed:", e);
        this.loadLocalEnquiries(callback);
      }
    } else {
      this.loadLocalEnquiries(callback);
    }
  },

  loadLocalEnquiries: function(callback) {
    try {
      const local = JSON.parse(localStorage.getItem('suffa_local_enquiries') || '[]');
      callback(local);
    } catch (e) {
      callback([]);
    }
  }
};

// Auto-initialize when script loads
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    window.SuffaFirebase.init();
  });
}
