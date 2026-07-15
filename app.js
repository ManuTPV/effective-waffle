if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
        try {
            const registration = await navigator.serviceWorker.register('/sw.js');
            console.log('Service Worker registered:', registration);
        } catch (err) {
            console.error('Registration failed:', err);
        }
    });
}

document.getElementById('fetchBtn').addEventListener('click', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    const json = await response.json();
    console.log(json);
});
