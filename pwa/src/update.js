var request = new XMLHttpRequest();
request.open("GET", "https://vdbthomas.github.io/esp32-smart-light-remote/pwa/manifest.json", false);
request.send(null)
var manifest = JSON.parse(request.responseText);

if (localStorage.localVersion) {
    if(localStorage.localVersion !== manifest.version) {
        caches.open(slr-static).then(function(cache) {
            cache.addAll(["./app.html", "./src/setup.js", "./src/install.js", "./images/vdb-vdbsoftware-logo-192x192.png"])
          });          
        localStorage.localVersion = manifest.version;
    }
} else {
    localStorage.localVersion = manifest.version;
}
