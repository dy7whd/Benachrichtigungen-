self.addEventListener('push', function(event) {
    let data = { titel: "Neue Nachricht", nachricht: "Du hast eine Nachricht erhalten", icon: "icon.png", link: "whatsapp://" };
    
    if (event.data) {
        try {
            data = event.data.json();
        } catch (e) {
            data.nachricht = event.data.text();
        }
    }

    const options = {
        body: data.nachricht,
        icon: data.icon,
        badge: data.icon,
        data: { url: data.link }
    };

    event.waitUntil(
        self.registration.showNotification(data.titel, options)
    );
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data.url)
    );
});
