import * as firebase from "firebase";

// Initialize Firebase

const sgcmConfig = {
  apiKey: "apiKey",
  authDomain: "authDomain",
  databaseURL: "databaseURL",
  projectId: "projectId",
  storageBucket: "storageBucket",
  messagingSenderId: "messagingSenderId"
};

export default firebase.initializeApp(sgcmConfig);
