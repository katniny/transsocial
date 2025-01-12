let isSignedIn = null;

firebase.auth().onAuthStateChanged((user) => {
   if (user) {
      isSignedIn = true;
      console.log(`Signed in: ${isSignedIn}`);
   } else {
      isSignedIn = false;
      console.log(`Signed in: ${isSignedIn}`);
   }
});