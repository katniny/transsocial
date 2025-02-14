// alert any dev console users to be careful :p
// if not literally developing though
if (!window.location.origin.startsWith("http://127.0.0.1") && !window.location.origin.startsWith("http://localhost")) {
   console.log("%cStop!", "color: red; font-size: 35px;");
   console.log("%cThis is a browser feature intended for developers. If someone told you to copy-paste something here to enable a TransSocial feature or 'hack' someone's account, it is a scam and will give them access to your TransSocial account.", "color: white; font-size: 15px; font-family: sans-serif;");
   console.log(" ");
}

// if a script is used on every page, we can call it here
function loadScript(src, async) {
   return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = async;
      script.onload = () => resolve(src);
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
      document.head.appendChild(script);
   });
}

async function loadAllScripts() {
   try {
      await loadScript("/assets/js/config.js", false);
      await loadScript("https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js", false);
      await loadScript("https://www.gstatic.com/firebasejs/8.6.8/firebase-auth.js", false);
      await loadScript("https://www.gstatic.com/firebasejs/8.6.8/firebase-database.js", false);
      await loadScript("https://www.gstatic.com/firebasejs/8.6.8/firebase-storage.js", false);
      await loadScript("/assets/js/firebase.js", false);

      // we gotta wait for auth state to resolve before continuing
      // or else some scripts will return "null" for auth state
      // and that's no good
      await loadScript("/assets/js/getLoggedInUser.js", false);
      await authStateResolved;

      // continue
      await loadScript("/assets/js/versioning.js", false);
      await loadScript("/assets/js/pageLoader.js", false);
      document.body.style.display = "block";
      
      // then wait for pathname, which is really quick so its fine
      await loadScript("/assets/js/pathName.js", false);
      await pathNameResolved;

      await loadScript("/assets/js/header.js", false);
      await loadScript("/assets/js/sidebar.js", false);
      await loadScript("/assets/js/transsocialAccounts.js", false);
      await loadScript("/assets/js/policiesSide.js", false);
      await loadScript("/assets/js/signOut.js", false);
      await loadScript("/assets/js/loadTheme.js", false);
      await loadScript("/assets/js/escape.js", false);
      await loadScript("https://kit.fontawesome.com/be7c331826.js", false);

      console.log("All-page scripts loaded successfully.");
      document.dispatchEvent(new Event("scriptsLoaded"));
   } catch (error) {
      console.error("Error loading Firebase scripts: ", error);
   }
}

loadAllScripts();