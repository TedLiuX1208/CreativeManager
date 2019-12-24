import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCtDAf3zC9c2eZ2sQJr3tAw2-kGeA1Elz4",
  authDomain: "tedtestproject-236308.firebaseapp.com",
  databaseURL: "https://tedtestproject-236308.firebaseio.com",
  projectId: "tedtestproject-236308",
  storageBucket: "tedtestproject-236308.appspot.com",
  messagingSenderId: "661525979353",
  appId: "1:661525979353:web:3dec93a4b374807b5e1ec8",
  measurementId: "G-MZ4GEM03NM"
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
firebase.firestore().settings({});
firebase.storage();

export default firebase;
