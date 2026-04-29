const CACHE = 'bahia-v1';

const ASSETS = [
  '/menu.html',
  '/image/bahia-logo.png',
  '/image/20251010195206_IMG_0918.jpg',
  '/image/20251010195206_IMG_0919.jpg',
  '/image/20251010195206_IMG_0920.jpg',
  '/image/20251010195206_IMG_0921.jpg',
  '/image/20251010195206_IMG_0922.jpg',
  '/image/20251020151439_IMG_0193.jpg',
  '/image/20251020151440_IMG_0192.jpg'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys
        .filter(k => k !== CACHE)
        .map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // API menu : Network first, cache fallback
  if (url.pathname === '/api/menu') {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
          return res;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  // Tout le reste : cache first
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (res && res.ok) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => {
        if (e.request.destination === 'image') {
          return new Response(
            `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
               <rect width="100" height="100" fill="#F5EFE4"/>
             </svg>`,
            { headers: { 'Content-Type': 'image/svg+xml' } }
          );
        }
      });
    })
  );
});
