self.assetsManifest = {
    "version": "2.0.0",
    "assets": [
        "index.html",
        "styles/site.css",
        "scripts/app.js",
        "scripts/conversion.js",
        "scripts/conversion-data.js",
        "images/card.png",
        "images/favicon-16.png",
        "images/favicon-32.png",
        "images/favicon.svg",
        "images/icon-180.png",
        "images/icon-192.png",
        "images/icon-512.png",
        "images/icon.svg"
    ]
};

self.addEventListener('install', event => event.waitUntil(onInstall(event)));
self.addEventListener('activate', event => event.waitUntil(onActivate(event)));
self.addEventListener('fetch', event => event.respondWith(onFetch(event)));

const cacheNamePrefix = 'offline-cache-';
const cacheName = `${cacheNamePrefix}${self.assetsManifest.version}`;

const base = "/";
const baseUrl = new URL(base, self.origin);
const manifestUrlList = self.assetsManifest.assets.map(asset => new URL(asset, baseUrl).href);

async function onInstall(event) {
    console.info('Service worker: Install');

    console.log(manifestUrlList);

    // Fetch and cache all items from the assets manifest
    await caches.open(cacheName).then(cache => cache.addAll(
        manifestUrlList
    ));
}

async function onActivate(event) {
    console.info('Service worker: Activate');

    // Delete unused caches
    const cacheKeys = await caches.keys();
    await Promise.all(cacheKeys
        .filter(key => key.startsWith(cacheNamePrefix) && key !== cacheName)
        .map(key => caches.delete(key)));
}

async function onFetch(event) {
    let cachedResponse = null;
    if (event.request.method === 'GET') {
        // For all navigation requests, try to serve index.html from cache,
        // unless that request is for an offline resource.
        const shouldServeIndexHtml = event.request.mode === 'navigate'
            && !manifestUrlList.some(url => url === event.request.url);

        const request = shouldServeIndexHtml ? 'index.html' : event.request;
        const cache = await caches.open(cacheName);
        cachedResponse = await cache.match(request);
    }

    return cachedResponse || fetch(event.request);
}
