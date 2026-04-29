const CACHE = 'bahia-menu-v2';

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // Ne pas intercepter les requêtes cross-origin
  if (url.origin !== self.location.origin) return;

  // Ne jamais intercepter la navigation (menu.html lui-même)
  if (e.request.mode === 'navigate') return;

  // API menu : Network first, fallback cache
  if (url.pathname === '/api/menu') {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          if (res.ok) {
            const clone = res.clone();
            caches.open(CACHE).then(c => c.put(e.request, clone));
          }
          return res;
        })
        .catch(() =>
          caches.match(e.request).then(cached =>
            cached || new Response('[]', { headers: { 'Content-Type': 'application/json' } })
          )
        )
    );
    return;
  }

  // Images locales : cache first
  if (url.pathname.startsWith('/image/')) {
    e.respondWith(
      caches.match(e.request).then(cached => {
        if (cached) return cached;
        return fetch(e.request).then(res => {
          if (res && res.ok) {
            const clone = res.clone();
            caches.open(CACHE).then(c => c.put(e.request, clone));
          }
          return res;
        });
      })
    );
    return;
  }

  // Tout le reste : laisser passer sans interception
});
