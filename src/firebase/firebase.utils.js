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

  export const createUserProfileDocumemt = async (userAuth, additionalData) => {
    console.log ("before Auth");
    if(!userAuth) return;
    console.log ("After Auth " + userAuth.uid);

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    //const userRef = firestore.doc('users/1234rftf');

    const snapShot = await userRef.get();

    console.log(snapShot);

    if (!snapShot.exists) {
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({displayName, email, createdAt, ...additionalData});
      } catch(error) {
        console.log("error creating user", error.message);
      }
    }

    return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();

  provider.setCustomParameters({prompt : 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;

