const CACHE_NAME = 'smartstudy-v1';
const OFFLINE_FILES = [
  '/',
  '/index.html',
  '/course.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
  // + आप चाहें तो बाकी asset files जैसे css/js/images यहाँ add कर लें
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(OFFLINE_FILES))
  );
  self.skipWaiting();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});