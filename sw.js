self.addEventListener("install", event => {
    console.log("Installing service worker");
    self.skipWaiting();
});

self.addEventListener("activate", event => {
    console.log("Activating service worker");

    event.waitUntil(
        self.clients.claim()
    );
});

self.addEventListener("fetch", event => {
    console.log("Fetch:", event.request.url);

    // Just let the browser perform the request normally.
    event.respondWith(fetch(event.request));
});
