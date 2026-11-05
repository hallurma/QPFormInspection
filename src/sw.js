const CACHE_NAME = 'jkt09-pwa-v1';
const APP_SHELL = new URL('./', self.registration.scope).href;
const PRECACHE_URLS = [
  './',
  './manifest.webmanifest',
  './assets/pwa-icon-180.png',
  './assets/pwa-icon-192.png',
  './assets/pwa-icon-512.png',
  './assets/stamp-obayashi.png',
  './assets/stamp-jaya-obayashi.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys
        .filter(key => key.startsWith('jkt09-pwa-') && key !== CACHE_NAME)
        .map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin ||
      !url.pathname.startsWith(new URL(self.registration.scope).pathname)) return;

  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      let response;
      try {
        response = await fetch(request);
      } catch (error) {
        const cached = await caches.match(request) || await caches.match(APP_SHELL);
        if (cached) return cached;
        throw error;
      }
      if (response.ok) {
        try {
          await (await caches.open(CACHE_NAME)).put(request, response.clone());
        } catch (error) {
          console.error('Gagal memperbarui cache halaman PWA:', error);
        }
      }
      return response;
    })());
    return;
  }

  if (/\.(?:webmanifest|png|svg|css|js)$/i.test(url.pathname)) {
    event.respondWith((async () => {
      const cached = await caches.match(request);
      if (cached) return cached;
      const response = await fetch(request);
      if (response.ok) {
        try {
          await (await caches.open(CACHE_NAME)).put(request, response.clone());
        } catch (error) {
          console.error('Gagal menyimpan aset PWA ke cache:', error);
        }
      }
      return response;
    })());
  }
});
