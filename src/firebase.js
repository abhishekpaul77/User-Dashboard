
// import firebase from "firebase/app";
// import "firebase/compat/storage";


// const firebaseConfig = {
//   apiKey: "AIzaSyCHFteBigJ6iIdKdbnLevynKs4QdymDgYk",
//   authDomain: "netflix-151df.firebaseapp.com",
//   projectId: "netflix-151df",
//   storageBucket: "netflix-151df.appspot.com",
//   messagingSenderId: "316700975498",
//   appId: "1:316700975498:web:15063159b205c1a349a873",
//   measurementId: "G-2ZGE63ES9F",
// };


// firebase.initializeApp(firebaseConfig);
// const storage = firebase.storage()
// // export const storageRef = storage.ref();
// export default storage


import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHFteBigJ6iIdKdbnLevynKs4QdymDgYk",
  authDomain: "movie-app-30f9b.firebaseapp.com",
  projectId: "movie-app-30f9b",
  storageBucket: "movie-app-30f9b.appspot.com",
  messagingSenderId: "1003053265754",
  appId: "1:1003053265754:web:7568bb269c042e12167963",
  measurementId: "G-65HK3YWS4K"
};

// Initialize Firebase
const app=initializeApp(firebaseConfig);
export default app;