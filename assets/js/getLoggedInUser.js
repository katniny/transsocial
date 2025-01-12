firebase.auth().onAuthStateChanged((user) => {
   if (user) {
      console.log("Signed in true.");
   } else {
      console.log("Signed in false.");
   }
});