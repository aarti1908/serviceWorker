let cacheVersion = 'v1';

self.addEventListener('activate', (event) => {
    console.log('Service Worker | Activation ');
})

self.addEventListener('install', (event) => {
    console.log('Service Worker | Installation ');
})

self.addEventListener("fetch", (event) => {
    console.log(`Handling fetch event for ${event.request.url}`);
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          console.log("Found response in cache:", response);
          return response;
        }
        console.log("No response found in cache. About to fetch from network…");
        return fetch(event.request)
          .then((response) => {
            const clonedResponse = response.clone();
            caches.open(cacheVersion)
            .then(cache => {
                cache.put(event.request, clonedResponse)
                .catch(() => console.log('Not able to cache : url = ' + event.request.url))
            });
            return response;
          })
          .catch((error) => {
            console.error(`Fetching failed: ${error}`);
            throw error;
          });
      })
    );
});