var request = new XMLHttpRequest();
request.open("GET", "https://vdbthomas.github.io/esp32-smart-light-remote/pwa/manifest.json", false);
request.send(null)
var manifest = JSON.parse(request.responseText);

if (localStorage.localVersion) {
    if(localStorage.localVersion !== manifest.version) {
        caches.open('slr-static').then(function(cache) {
            cache.delete("slr-static").then(function(response) {
                console.log("New version detected, cache deleted");
                localStorage.localVersion = manifest.version;
                // location.reload();
            });
        });
    }
} else {
    localStorage.localVersion = manifest.version;
}
