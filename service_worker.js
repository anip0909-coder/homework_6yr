const CACHE_NAME = 'pintar-cilik-v1';
const ASSETS = [
  'index.html',
  'manifest.json',
  'image_35eaa8.png',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600;700&family=Nunito:wght@400;700&display=swap'
];

// Pasang Service Worker & Simpan Cache Utama
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Padam Cache Lama
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Ambil data luar talian (Offline support)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request);
    })
  );
});