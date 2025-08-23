const CACHE_NAME = 'cybercorrect-v2.0.0';
const OFFLINE_URLS = [
  '/',
  '/dashboard',
  '/assessment-intro',
  '/compliance/cmmc',
  '/manifest.json',
  '/cybercorrect.png'
];

// Core assessment data to cache
const ASSESSMENT_CACHE = 'assessment-data-v1';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(OFFLINE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME && cacheName !== ASSESSMENT_CACHE) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Handle assessment data requests
  if (event.request.url.includes('/api/assessments')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(ASSESSMENT_CACHE)
              .then(cache => cache.put(event.request, responseClone));
          }
          return response;
        })
        .catch(() => {
          return caches.match(event.request);
        })
    );
    return;
  }

  // Handle static resources
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

// Background sync for assessment data
self.addEventListener('sync', (event) => {
  if (event.tag === 'assessment-sync') {
    event.waitUntil(syncAssessmentData());
  }
});

async function syncAssessmentData() {
  // Sync pending assessment changes when online
  const pendingChanges = await getPendingChanges();
  for (const change of pendingChanges) {
    try {
      await syncChange(change);
      await removePendingChange(change.id);
    } catch (error) {
      console.error('Sync failed:', error);
    }
  }
}