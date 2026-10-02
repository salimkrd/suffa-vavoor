/**
 * Ma'din Suffa Campus Vavoor - Firebase Configuration & Services
 * Project ID: suffa-vavoor-5d3cd
 * Affiliation: Jamiathul Hind Al Islamiyya (Centre Code: INS7572)
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

// Global container for Suffa Firebase services
window.SuffaFirebase = {
  config: firebaseConfig,
  app: null,
  analytics: null,
  db: null,
  isInitialized: false,

  init: function() {
    if (this.isInitialized) return;
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
