var admin = require("firebase-admin");
var firebase = require("firebase/app");

require("firebase/auth");

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: "gladiatus-db.firebaseapp.com",
    projectId: "gladiatus-db",
    storageBucket: "gladiatus-db.appspot.com",
    messagingSenderId: "44148163989",
    appId: "1:44148163989:web:2ed5fb22ccc8deda16a29c",
    measurementId: "G-4FCT9PSK13"
};
  
firebase.initializeApp(firebaseConfig);

var createUser = user => admin.auth().createUser(user);

var authenticateUser = ({ email, password }) => firebase.auth().signInWithEmailAndPassword(email, password);

module.exports = { createUser, authenticateUser };