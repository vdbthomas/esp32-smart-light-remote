self.addEventListener("install", e => {                                                                     // when service worker is installed
    e.waitUntil(                                                                                            
        caches.open("slr-static").then(cache => {                                                           // create new cache and add the following:
            return cache.addAll(["./", "./src/setup.js", "./src/install.js", "./images/vdb-vdbsoftware-logo-192x192.png"])
        })
    );
});

self.addEventListener("fetch", e => {                                                                       // whenever the browser is trying to fetch (load) the website
    console.log(`Intercepting fetch request for: ${e.request.url}`);
    e.respondWith(
        caches.match(e.request).then(response =>{
            return response || fetch(e.request);                                                            // return from cache before fetching from the webserver --> this will also make sure website is available if there is no connection to the webserver
        })
    );
});
