import firebase from 'firebase'
require('dotenv').config()
console.log(process.env.REACT_APP_API)

const firebaseConfig = {
    apiKey: `${process.env.REACT_APP_API}`,
    authDomain: "slack-clone-9ede3.firebaseapp.com",
    projectId: "slack-clone-9ede3",
    storageBucket: "slack-clone-9ede3.appspot.com",
    messagingSenderId: "41482246042",
    appId: "1:41482246042:web:b0f80263a6a9a34f8f8c23"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const database = firebase.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  // provider is basically who is providing you authourization facility is it facebook or google etc.

  
  export {auth,provider};
  export default database;