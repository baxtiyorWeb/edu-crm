// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyDlIMqHEQo_xGHmObgQMJOszbr_ZlKb5CY',
	authDomain: 'social-media-uzb.firebaseapp.com',
	databaseURL: 'https://social-media-uzb-default-rtdb.firebaseio.com',
	projectId: 'social-media-uzb',
	storageBucket: 'social-media-uzb.appspot.com',
	messagingSenderId: '1023242279081',
	appId: '1:1023242279081:web:848561324f6fb8cbc231b8',
	measurementId: 'G-JPDZ32VSC3',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
