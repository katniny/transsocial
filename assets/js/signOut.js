function signOut() {
   if (isSignedIn === true) {
      firebase.auth().signOut().then(() => {
         window.location.replace("/home");
      }).catch((error) => {
         alert("There was an unknown error signing out. Please refresh the page and try again.");
      });
   }
}