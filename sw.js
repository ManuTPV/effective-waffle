self.addEventListener('install', event => {
    console.log('Service Worker installing...');
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    console.log('Service Worker activating...');

    event.waitUntil(
        self.clients.claim()
    );
});

self.addEventListener('fetch', event => {
    console.log('Intercepted:', event.request.url);

    // Simply forward the request to the network
    event.respondWith(fetch(event.request));
});
