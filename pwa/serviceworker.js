self.addEventListener("install", e => {                                                                     // when service worker is installed
    e.waitUntil(                                                                                            
        caches.open("slr-static").then(cache => {                                                           // create new cache and add the following:
            return cache.addAll(["./app.html", "./src/setup.js", "./src/install.js", "./images/vdb-vdbsoftware-logo-192x192.png"])
        })
    );
});

self.addEventListener("fetch", e => {                                                                       // whenever the browser is trying to fetch (load) the website
    console.log(`Intercepting fetch request for: ${e.request.url}`);
    e.respondWith(
        caches.match(e.request).then(response =>{
            return fetch(e.request) || response;                                                            // return from webserver or else from cache --> makes the app useable offline while still updating when files change (for development purposes)
        })
    );
});
