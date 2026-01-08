importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
    "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
    apiKey: "AIzaSyB28e5L12OJDRZrEANhp-R8K2NquslHWXw",
    authDomain: "kenshi-webspace-f1f76.firebaseapp.com",
    projectId: "kenshi-webspace-f1f76",
    storageBucket: "kenshi-webspace-f1f76.firebasestorage.app",
    messagingSenderId: "504947235562",
    appId: "1:504947235562:web:2b7c9b183d59dd9f749593",
    measurementId: "G-REED1BX0E3"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
        "[firebase-messaging-sw.js] Received background message ",
        payload
    );
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon,
        image: payload.notification.image,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});