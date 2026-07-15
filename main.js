const status = document.getElementById("status");

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js")
        .then(registration => {
            console.log("Registered:", registration.scope);
            status.textContent = "Service Worker registered";
        })
        .catch(error => {
            console.error(error);
            status.textContent = "Registration failed";
        });
} else {
    status.textContent = "Service Workers not supported";
}
