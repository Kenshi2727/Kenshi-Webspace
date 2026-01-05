// import { initializeApp } from 'firebase-admin/app';
import admin from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config();

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

try {
    if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
        throw new Error('FIREBASE_SERVICE_ACCOUNT is not defined[env var err]');
    }

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });

    console.log("Firebase admin sdk initialzed!");

} catch (error) {
    console.error('Firebase admin initialization error', error.message);
}

export const messaging = admin.messaging();
