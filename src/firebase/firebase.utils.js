import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCYOdPJrXTyeTaUHqZpiYGG5VUFfjpWkR4",
    authDomain: "test-c2df9.firebaseapp.com",
    databaseURL: "https://test-c2df9.firebaseio.com",
    projectId: "test-c2df9",
    storageBucket: "test-c2df9.appspot.com",
    messagingSenderId: "1031351005157",
    appId: "1:1031351005157:web:d92ee180e8991c9b4e890c"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();

  provider.setCustomParameters({prompt : 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;

