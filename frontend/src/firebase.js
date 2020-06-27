
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/analytics';

var firebaseConfig = {
apiKey: "AIzaSyD646D5jhljW6ewKlWQRvR8fHCtwmLV0k0",
authDomain: "hello-world-53fac.firebaseapp.com",
databaseURL: "https://hello-world-53fac.firebaseio.com",
projectId: "hello-world-53fac",
storageBucket: "hello-world-53fac.appspot.com",
messagingSenderId: "560198801193",
appId: "1:560198801193:web:86235f90b310eafe654938",
measurementId: "G-09BK5HJ7K4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;