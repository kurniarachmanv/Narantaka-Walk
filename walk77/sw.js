const CACHE='narantaka-walk-cache-v3';
const FILES=['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./icons/icon-512-maskable.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));return response}).catch(()=>caches.match('./index.html'))))});
self.addEventListener('notificationclick',event=>{event.notification.close();event.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(list=>{for(const client of list){if('focus'in client)return client.focus()}if(clients.openWindow)return clients.openWindow('./')}))});

self.addEventListener('push',event=>{let payload={title:'Narantaka Walk',body:'Waktunya bergerak. Satu langkah lebih dekat ke tujuan.'};try{if(event.data)payload={...payload,...event.data.json()}}catch(e){}event.waitUntil(self.registration.showNotification(payload.title,{body:payload.body,icon:'icons/icon-192.png',badge:'icons/icon-192.png',data:{url:'./'}}))});
