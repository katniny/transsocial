let isSignedIn = null;

const authStateResolved = new Promise((resolve) => {
   firebase.auth().onAuthStateChanged((user) => {
      if (user) {
         isSignedIn = true;
         console.log(`Signed in: ${isSignedIn}`);
      } else {
         isSignedIn = false;
         console.log(`Signed in: ${isSignedIn}`);

         // prompt user to login
         const notSignedInBanner = document.createElement("div");
         notSignedInBanner.setAttribute("id", "notSignedIn-banner");
         notSignedInBanner.innerHTML = `
            <p>Join the fun on TransSocial!</p>
            <a href="/auth/login"><button>Login</button></a>
            <a href="/auth/register"><button>Create an account</button></a>
         `;
         document.body.appendChild(notSignedInBanner);
      }
      resolve();
   });
});