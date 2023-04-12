import {getApp, getApps, initializeApp} from 'firebase/app';
import {getStorage} from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyBdQSgSZ5AtopozjxnFvKB-y6z15CQwJjg",

  authDomain: "ndt-market.firebaseapp.com",

  projectId: "ndt-market",

  storageBucket: "ndt-market.appspot.com",

  messagingSenderId: "161634088572",

  appId: "1:161634088572:web:adc89a376368f22056bbf9",

  measurementId: "G-RQNCZWX7LH"

};


// Initialize Firebase
  
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const storage = getStorage(app);

export {app, storage};
