
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/analytics';

var firebaseConfig = {
    apiKey: "AIzaSyD1rmMubB7cd1t-nF6ijuKKBlj6kpj-z5o",
    authDomain: "hello-world-f8d4b.firebaseapp.com",
    databaseURL: "https://hello-world-f8d4b.firebaseio.com",
    projectId: "hello-world-f8d4b",
    storageBucket: "hello-world-f8d4b.appspot.com",
    messagingSenderId: "687905532493",
    appId: "1:687905532493:web:8d7d79f8566fe0ec81ca04",
    measurementId: "G-1STRTWHJ24"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;