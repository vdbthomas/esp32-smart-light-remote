var request = new XMLHttpRequest();
request.open("GET", "https://vdbthomas.github.io/esp32-smart-light-remote/pwa/manifest.json", false);
request.send(null)
var manifest = JSON.parse(request.responseText);

if (localStorage.localVersion) {
    if(localStorage.localVersion !== manifest.version) {
        localStorage.localVersion = manifest.version;
        location.reload(true);       
    }
} else {
    localStorage.localVersion = manifest.version;
}
