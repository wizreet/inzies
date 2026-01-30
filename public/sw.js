/**
 * Service Worker for Inzies Band Website
 *
 * Provides offline support, caching strategies, and performance optimization.
 * Uses a cache-first strategy for static assets and stale-while-revalidate for pages.
 *
 * @version 1.0.0
 */

// Cache names with versioning for easy updates
const CACHE_VERSION = "v1";
const STATIC_CACHE = `inzies-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `inzies-dynamic-${CACHE_VERSION}`;
const IMAGE_CACHE = `inzies-images-${CACHE_VERSION}`;

// Maximum items in dynamic cache
const MAX_DYNAMIC_CACHE_ITEMS = 50;
const MAX_IMAGE_CACHE_ITEMS = 100;

// Static assets to precache on install
const STATIC_ASSETS = [
	"/inzies/",
	"/inzies/about/",
	"/inzies/music/",
	"/inzies/gallery/",
	"/inzies/play/",
	"/inzies/LogoAnimations/logo-transparent.png",
];

// File extensions to cache with different strategies
const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".ico"];
const STATIC_EXTENSIONS = [".css", ".js", ".woff", ".woff2", ".ttf"];

/**
 * Determines if a request is for an image
 */
function isImageRequest(url) {
	return IMAGE_EXTENSIONS.some((ext) => url.pathname.endsWith(ext));
}

/**
 * Determines if a request is for a static asset
 */
function isStaticAsset(url) {
	return STATIC_EXTENSIONS.some((ext) => url.pathname.endsWith(ext));
}

/**
 * Determines if a request is for a page (HTML)
 */
function isPageRequest(request) {
	return request.mode === "navigate" || request.headers.get("accept")?.includes("text/html");
}

/**
 * Limits cache size by removing oldest entries
 */
async function limitCacheSize(cacheName, maxItems) {
	const cache = await caches.open(cacheName);
	const keys = await cache.keys();

	if (keys.length > maxItems) {
		// Remove oldest entries (FIFO)
		const toDelete = keys.slice(0, keys.length - maxItems);
		await Promise.all(toDelete.map((key) => cache.delete(key)));
	}
}

/**
 * Cache-first strategy for static assets
 * Best for versioned files that don't change
 */
async function cacheFirst(request, cacheName) {
	const cache = await caches.open(cacheName);
	const cached = await cache.match(request);

	if (cached) {
		return cached;
	}

	try {
		const response = await fetch(request);

		if (response.ok) {
			cache.put(request, response.clone());
		}

		return response;
	} catch (error) {
		// Return offline fallback if available
		return caches.match("/inzies/");
	}
}

/**
 * Network-first strategy with cache fallback
 * Best for HTML pages that need fresh content
 */
async function networkFirst(request, cacheName) {
	const cache = await caches.open(cacheName);

	try {
		const response = await fetch(request);

		if (response.ok) {
			cache.put(request, response.clone());
			await limitCacheSize(cacheName, MAX_DYNAMIC_CACHE_ITEMS);
		}

		return response;
	} catch (error) {
		const cached = await cache.match(request);

		if (cached) {
			return cached;
		}

		// Return offline page for navigation requests
		if (isPageRequest(request)) {
			return caches.match("/inzies/");
		}

		throw error;
	}
}

/**
 * Stale-while-revalidate strategy
 * Returns cached version immediately, updates cache in background
 */
async function staleWhileRevalidate(request, cacheName) {
	const cache = await caches.open(cacheName);
	const cached = await cache.match(request);

	// Fetch fresh version in background
	const fetchPromise = fetch(request)
		.then((response) => {
			if (response.ok) {
				cache.put(request, response.clone());
			}
			return response;
		})
		.catch(() => null);

	// Return cached immediately, or wait for network
	return cached || fetchPromise;
}

// =============================================================================
// EVENT LISTENERS
// =============================================================================

/**
 * Install event - precache static assets
 */
self.addEventListener("install", (event) => {
	event.waitUntil(
		caches
			.open(STATIC_CACHE)
			.then((cache) => {
				console.log("[SW] Precaching static assets");
				return cache.addAll(STATIC_ASSETS);
			})
			.then(() => self.skipWaiting())
	);
});

/**
 * Activate event - clean up old caches
 */
self.addEventListener("activate", (event) => {
	event.waitUntil(
		caches
			.keys()
			.then((cacheNames) => {
				return Promise.all(
					cacheNames
						.filter((name) => {
							// Delete old version caches
							return name.startsWith("inzies-") && !name.endsWith(CACHE_VERSION);
						})
						.map((name) => {
							console.log("[SW] Deleting old cache:", name);
							return caches.delete(name);
						})
				);
			})
			.then(() => self.clients.claim())
	);
});

/**
 * Fetch event - apply caching strategies
 */
self.addEventListener("fetch", (event) => {
	const { request } = event;
	const url = new URL(request.url);

	// Only handle same-origin requests
	if (url.origin !== self.location.origin) {
		return;
	}

	// Skip non-GET requests
	if (request.method !== "GET") {
		return;
	}

	// Apply appropriate caching strategy
	if (isImageRequest(url)) {
		// Cache-first for images
		event.respondWith(cacheFirst(request, IMAGE_CACHE));
	} else if (isStaticAsset(url)) {
		// Cache-first for static assets (CSS, JS, fonts)
		event.respondWith(cacheFirst(request, STATIC_CACHE));
	} else if (isPageRequest(request)) {
		// Network-first for HTML pages
		event.respondWith(networkFirst(request, DYNAMIC_CACHE));
	} else {
		// Stale-while-revalidate for everything else
		event.respondWith(staleWhileRevalidate(request, DYNAMIC_CACHE));
	}
});

/**
 * Message event - handle commands from main thread
 */
self.addEventListener("message", (event) => {
	if (event.data?.type === "SKIP_WAITING") {
		self.skipWaiting();
	}

	if (event.data?.type === "CLEAR_CACHE") {
		caches.keys().then((names) => {
			names.forEach((name) => caches.delete(name));
		});
	}
});
