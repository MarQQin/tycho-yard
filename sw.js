const cacheName = 'tycho-yard-v1';
self.addEventListener('install', event => event.waitUntil(caches.open(cacheName).then(cache => cache.addAll(['./','./index.html','./app.webmanifest','./icon.svg']))));
self.addEventListener('activate', event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('tycho-yard-') && key !== cacheName).map(key => caches.delete(key))))));
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET' || !request.url.startsWith(self.registration.scope)) return;
  if (request.mode === 'navigate') event.respondWith(fetch(request).catch(() => caches.match('./index.html')));
  else event.respondWith(caches.match(request).then(cached => cached || fetch(request)));
});