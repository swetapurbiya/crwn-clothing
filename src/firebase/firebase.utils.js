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

  export const createUserProfileDocument = async (userAuth, additionalData) => {
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

  // code was to add data in database not used any more
  export const addCOllectionAndDocuments = async (collectionKey, objectToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    //console.log(collectionRef);

    const batch = firestore.batch();
    objectToAdd.forEach(obj => {
      const newDocRef = collectionRef.doc();
      //console.log(newDocRef);
      batch.set(newDocRef, obj);
    });

    return await batch.commit();
  };

  //code to fetch data from firebase database

  export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
      const { title, items } = doc.data();
  
      return {
        routeName: encodeURI(title.toLowerCase()),
        id: doc.id,
        title,
        items
      };
    });
  
    return transformedCollection.reduce((accumulator, collection) => {
      accumulator[collection.title.toLowerCase()] = collection;
      return accumulator;
    }, {});
  };

  export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged(userAuth => {
        unsubscribe();
        resolve(userAuth);
      }, reject);
    })
  }

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  export const googleProvider = new firebase.auth.GoogleAuthProvider();

  googleProvider.setCustomParameters({prompt : 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

  export default firebase;

