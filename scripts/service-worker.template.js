// Values are generated from the complete Vite output. Never store user data here.
const CACHE_PREFIX = "family-outing-app-shell-";
const BUILD_VERSION = __BUILD_VERSION__;
const CACHE_NAME = CACHE_PREFIX + BUILD_VERSION;
const APP_BASE = __APP_BASE__;
const ASSETS = __PRECACHE_ASSETS__;
const urls = new Set(
  ASSETS.map((path) => new URL(path, self.location.origin).href),
);
self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      // A failed/partial deployment must not replace the working offline application.
      await cache.addAll(
        ASSETS.map(
          (url) =>
            new Request(url + "?v=" + BUILD_VERSION, { cache: "reload" }),
        ),
      );
      await self.skipWaiting();
    })(),
  );
});
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      // Only this application's caches are ours. localStorage and other apps are untouched.
      for (const key of await caches.keys())
        if (key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
          await caches.delete(key);
      await self.clients.claim();
    })(),
  );
});
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (
    event.request.method !== "GET" ||
    url.origin !== self.location.origin ||
    !url.pathname.startsWith(APP_BASE)
  )
    return;
  // Use the active build's complete shell, avoiding a new HTML/old bundle mismatch.
  // register().update() fetches the new worker without this fetch handler.
  if (
    event.request.mode === "navigate" &&
    [APP_BASE, APP_BASE + "index.html"].includes(url.pathname)
  ) {
    event.respondWith(
      (async () =>
        (await caches.match(APP_BASE + "index.html", {
          cacheName: CACHE_NAME,
          ignoreSearch: true,
          ignoreVary: true,
        })) || fetch(event.request))(),
    );
    return;
  }
  if (urls.has(url.href))
    event.respondWith(
      (async () =>
        (await caches.match(event.request, {
          cacheName: CACHE_NAME,
          ignoreSearch: true,
          ignoreVary: true,
        })) || fetch(event.request))(),
    );
});
