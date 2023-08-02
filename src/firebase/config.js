import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCowZA8coQoYvPOYlqUpcDEHOU3gkYF1b0",
    authDomain: "credittask91.firebaseapp.com",
    projectId: "credittask91",
    storageBucket: "credittask91.appspot.com",
    messagingSenderId: "346155482455",
    appId: "1:346155482455:web:e74947e25f0681ab7b5212"
  };
// init firebase
  firebase.initializeApp(firebaseConfig);

//init firebase services
  const projectFirestore = firebase.firestore()
  const projectAuth = firebase.auth()

//init timestamp
  const timestamp = firebase.firestore.FieldValue.serverTimestamp

  export{projectFirestore, projectAuth, timestamp}