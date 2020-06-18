import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { useRef } from 'react';

const config = {
    apiKey: "AIzaSyBg-Akqt5WVqdFl6UAvVdN_UiYoUnYYx38",
    authDomain: "ecommerce-clothing-app-db.firebaseapp.com",
    databaseURL: "https://ecommerce-clothing-app-db.firebaseio.com",
    projectId: "ecommerce-clothing-app-db",
    storageBucket: "ecommerce-clothing-app-db.appspot.com",
    messagingSenderId: "47175777098",
    appId: "1:47175777098:web:be1d81df4288406a95dfb3"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`/users/${ userAuth.uid }`);

    const snapShot = await userRef.get();
    
    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            userRef.set({
                displayName,
                email,
                ...additionalData
            });
        } catch (error) {
            console.log('Error creating user : ', error.message)
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt : 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;