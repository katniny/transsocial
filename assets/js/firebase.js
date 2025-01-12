// initializes firebase
const firebaseConfig = {
   apiKey: "REPLACE",
   authDomain: "REPLACE",
   databaseURL: "REPLACE",
   projectId: "REPLACE",
   storageBucket: "REPLACE",
   messagingSenderId: "REPLACE",
   appId: "REPLACE",
   measurementId: "REPLACE"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();
const storage = firebase.storage();
const storageRef = storage.ref();
const timestamp = firebase.database.ServerValue.TIMESTAMP

console.log("Firebase successfully initialized.");