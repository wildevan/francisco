const CACHE_NAME = 'meu-pwa-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/app.js',
    '/service-worker.js',
    '/manifest.json',
    '/assets/icon-192x192.png',
    '/assets/icon-512x512.png',
];

// Durante a instalação, cache os arquivos
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Abrindo o cache e armazenando arquivos');
            return cache.addAll(urlsToCache);
        })
    );
});

// Durante a ativação, remova caches antigos
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Para os pedidos de rede, sempre tente responder com o cache primeiro
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // Retorne a resposta em cache se existir, ou faça o fetch da rede
            return response || fetch(event.request);
        })
    );
});
