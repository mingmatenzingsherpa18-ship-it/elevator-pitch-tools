/**
 * Elevator Pitch Audit — Service Worker
 * Strategy: Cache-first for app shell, network-first for everything else.
 */

const CACHE_NAME = 'ep-audit-v1';

// Core app shell — cached on install
const APP_SHELL = [
  './index.html',
  './manifest.json',
];

// ── INSTALL ──────────────────────────────────────────────────────────────────
// Pre-cache the app shell so the app works offline immediately after first load.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting()) // Activate immediately, don't wait for tabs to close
  );
});

// ── ACTIVATE ─────────────────────────────────────────────────────────────────
// Remove any old caches from previous versions.
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim()) // Take control of all open tabs right away
  );
});

// ── FETCH ─────────────────────────────────────────────────────────────────────
// Cache-first for same-origin navigation and assets.
// Caches new responses dynamically as they're fetched.
self.addEventListener('fetch', event => {
  // Only handle GET requests for same-origin URLs
  if (event.request.method !== 'GET') return;
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;

      // Not in cache — fetch from network and cache the response
      return fetch(event.request).then(response => {
        // Only cache valid responses
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Clone because the response body can only be consumed once
        const toCache = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, toCache));
        return response;
      }).catch(() => {
        // Offline and not cached — return the cached index as fallback
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
