const CACHE_NAME = "hollyblood-v1";
const FILES_TO_CACHE = [
  "index.html",
  "creer.html",
  "rejoindre.html",
  "page2-joueur.html",
  "page3-joueur.html",
  "choix-mobile.html",
  "code.html",
  "page2-joueur2.html",
  "page3-joueur2.html",
  "choix-mobile2.html",
  "suivi.html",
  "style.css",
  "manifest.json",
  "img/logo.png",
  "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=Inter&display=swap"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("✅ Pré-cache des fichiers");
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME) {
            console.log("🧹 Suppression de l'ancien cache :", key);
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).catch(() =>
        caches.match("index.html")
      );
    })
  );
});
