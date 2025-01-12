let isSignedIn = null;

firebase.auth().onAuthStateChanged((user) => {
   if (user) {
      isSignedIn = true;
      console.log(`Signed in: ${isSignedIn}`);
   } else {
      isSignedIn = false;
      console.log(`Signed in: ${isSignedIn}`);

      // prompt user to login
      const notSignedInbanner = document.createElement("div");
      notSignedInbanner.setAttribute("id", "notSignedIn-banner");
      notSignedInbanner.innerHTML = `
         <p>Join the fun on TransSocial!</p>
         <a href="/auth/login"><button>Login</button></a>
         <a href="/auth/register"><button>Create an account</button></a>
      `;
      document.body.appendChild(notSignedInbanner);
   }
});