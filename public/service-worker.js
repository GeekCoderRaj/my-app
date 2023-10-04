this.addEventListener ('activate', function (event) {
  console.log ('service worker activated');
});
this.addEventListener ('push', async function (event) {
  console.log ("notifications will be displayed here");
  const message = await event.data.json();
  window.reload();
  console.log(event);
  await event.waitUntil (
    this.registration.showNotification ("Vibration Sample", {
      body: "<h1>Buzz! Buzz!</h1>",
      icon: "../images/touch/chrome-touch-icon-192x192.png",
      vibrate: [200, 100, 200, 100, 200, 100, 200],
      tag: "vibration-sample",
      
    })
    );
  console.log(message);
});