import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyArJ6pTRpYMqQtWQ3hwi9JrvTafbhLSgPA",
  authDomain: "dvc-news-app.firebaseapp.com",
  projectId: "dvc-news-app",
  storageBucket: "dvc-news-app.appspot.com",
  messagingSenderId: "727527508130",
  appId: "1:727527508130:web:57d7a70578220e273e2ffb"
};

// initialization of firebase
firebase.initializeApp(firebaseConfig);

// initialization of firestore service
const projectAuth = firebase.auth();
const projectFirestore = firebase.firestore();
const projectStorage = firebase.storage();

const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectFirestore, projectAuth, projectStorage, timestamp };