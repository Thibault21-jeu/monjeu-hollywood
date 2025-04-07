const CACHE_NAME = 'hollyblood-cache-v1';
const urlsToCache = [
  '/',
  '/monjeu-hollywood/index.html',
  '/monjeu-hollywood/page2.html',
  '/monjeu-hollywood/page3.html',
  '/monjeu-hollywood/page4.html',
  '/monjeu-hollywood/rejoindre-personnage.html',
  '/monjeu-hollywood/rejoindre-role.html',
  '/monjeu-hollywood/suivi.html',
  '/monjeu-hollywood/suivi-joueur.html',
  '/monjeu-hollywood/debut.html',
  '/monjeu-hollywood/manifest.json',
  '/monjeu-hollywood/img/logo.png',
  // ajoute ici les images nécessaires
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
