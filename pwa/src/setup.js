if ("serviceWorker" in navigator) {                                                   // if service worker is supported
    navigator.serviceWorker.register("serviceworker.js").then(registration => {       // register new service worker
        console.log("SW Registered");
        console.log(registration);
    }).catch(error => {
        console.log("SW Registration failed");
        console.log(error);
    }) 
}   else {
    console.log("No support for serviceworkers")
}
