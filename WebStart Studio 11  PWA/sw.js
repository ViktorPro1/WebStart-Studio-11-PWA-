const CACHE_NAME = "webstart-v1";
const urlsToCache = [
    "/",
    "/index.html",
    "/style.css",
    "/main.js",
    "icons/icon-192x192.png",
    "icons/icon-512x512.png"
];

// Встановлення Service Worker і кешування основних ресурсів
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
            .catch(err => console.error("Помилка при кешуванні:", err))
    );
});

// Перехоплення fetch-запитів
self.addEventListener("fetch", event => {
    const url = new URL(event.request.url);

    // Ігноруємо сторонні домени
    if (url.origin !== location.origin) return;

    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            if (cachedResponse) {
                return cachedResponse;
            }

            return fetch(event.request).catch(error => {
                console.error("Fetch помилка:", error);
                return new Response("⚠️ Сталася помилка. Перевірте інтернет або повторіть пізніше.", {
                    status: 503,
                    statusText: "Offline або fetch помилка",
                    headers: { "Content-Type": "text/plain; charset=utf-8" }
                });
            });
        })
    );
});

// Очищення старого кешу (опціонально)
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(name => name !== CACHE_NAME)
                    .map(name => caches.delete(name))
            );
        })
    );
});
