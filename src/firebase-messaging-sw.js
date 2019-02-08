importScripts('https://www.gstatic.com/firebasejs/5.4.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.4.1/firebase-messaging.js');

firebase.initializeApp({
  'messagingSenderId': '265581143256'
});

const messaging = firebase.messaging();

// Gère les notifications en tâche de fond
messaging.setBackgroundMessageHandler( function(payload) {
  console.log('[firebase-messaging-sw] Received background message ', payload);

  // Personnalisation des notifications
  const notificationTitle = 'Background message Title';
  const notificationOptions = {
    body: 'Background message body'
  }

  return self.registration.showNotification(notificationTitle, notificationOptions);
});