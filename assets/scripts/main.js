const registerServiceWorker = async () => {
    try {
        let registration = await navigator.serviceWorker.register('../service_worker.js');
        console.log('Service Worker | Registeration successfull!');
        if (registration.installing) {
        console.log('Service worker installing!');
        } else if (registration.waiting) {
        console.log('Service worker installed!');
        } else if (registration.active) {
        console.log('Service worker active!');
        }
    } catch(error) {
        console.log('Service Worker | Registeration | Failure ', error);
    }
}

registerServiceWorker();