// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth, 
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth';
import{
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0rk2W56G2GhCdtfa4n0AqsRf5QkJiUQg",
  authDomain: "crwn-clothing-db-2ae2a.firebaseapp.com",
  projectId: "crwn-clothing-db-2ae2a",
  storageBucket: "crwn-clothing-db-2ae2a.appspot.com",
  messagingSenderId: "446492838383",
  appId: "1:446492838383:web:c51bcb1c6ac7331c474e1a",
  measurementId: "G-BF95YKDB1X"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async(userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnaphot = await getDoc(userDocRef);
    console.log(userSnaphot);
    console.log(userSnaphot.exists());

    if(!userSnaphot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt
            });
        }catch(error){
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;
}
