/// create sidebar
const sidebar = document.createElement("div");
sidebar.className = "sidebar";
sidebar.setAttribute("id", "sidebar");

// set sidebar html
sidebar.innerHTML = `
   <!-- Navigation Buttons -->
   <a href="/home"><button style="margin-top: 15px;" id="homeSidebar"><i class="fa-solid fa-house"></i> Home</button></a>
   <a href="/notifications" id="notificationsSidebar"><button><i class="fa-solid fa-bell"></i> Notifications</button></a> <a href="/notifications"><p id="notificationsCount">0</p></a>
   <a href="/search"><button id="searchSidebar"><i class="fa-solid fa-magnifying-glass"></i> Explore</button></a>
   <a href="/messages" id="messagesSidebar"><button><i class="fa-solid fa-envelope"></i> Messages (0)</button></a>
   <a href="/settings?tab=subscription" id="enchantedSidebar"><button><i class="fa-solid fa-heart"></i> Get Katniny+</button></a>
   <a href="/updates"><button id="updatesBtn" id="updatesSidebar"><i class="fa-solid fa-wrench"></i> Updates</button></a>
   <a href="/u" id="linkToAcc"><button id="meSidebar"><i class="fa-solid fa-user"></i> Your Profile</button></a>
   <a href="javascript:void(0);"><button id="showMoreContent"><i class="fa-solid fa-ellipsis"></i> More</button></a>
   <button onclick="createNotePopup()" class="createNote-sidebar" id="createNote-sidebar"><i class="fa-solid fa-pen-to-square"></i> Create</button>
   <div id="moreContent" class="moreContent" style="display: none;">
      <a href="/settings" id="settingsSidebar"><button class="settings"><i class="fa-solid fa-gear"></i> Settings</button></a>
      <a href="/contributors"><button id="contributorsSidebar"><i class="fa-solid fa-face-smile-beam"></i> Contributors</button></a>
      <a href="/achievements" id="achievementsSidebar"><button><i class="fa-solid fa-award"></i> Achievements</button></a>
      <a href="/favorites" id="favoritesSidebar"><button><i class="fa-solid fa-bookmark"></i> Favorites</button></a>
   </div>

   <br />
   <br />
   <br />
   <br />

   <div class="sidebarPolicies">
      <a href="/policies/terms">Terms of Service</a>, <a href="/policies/privacy">Privacy Policy</a>, <a href="/policies/child-safety">Child Safety</a>, <a href="/policies/cookies">Cookies</a>, <a href="/policies/copyright">Copyright</a>, <a href="/policies/guidelines">Community Guidelines</a>
   </div>

   <!-- Social Icons & Links -->
   <div class="bottom">
      <!-- Socials -->
      <a href="https://discord.gg/SmhATjRxvc" target="_blank"><i class="fa-brands fa-discord fa-lg"></i></a>
      <a href="https://bsky.app/profile/transs.social" target="_blank"><i class="fa-brands fa-bluesky fa-lg"></i></a>
      <a href="https://tiktok.com/@transs_ocial" target="_blank"><i class="fa-brands fa-tiktok fa-lg"></i></a>
      <a href="https://github.com/katniny/transsocial" target="_blank"><i class="fa-brands fa-github fa-lg"></i></a>
            
      <!-- Profile -->
      <div class="profileContainer" id="profileContainer">
         <div class="profile" id="profile" style="display: none;">
            <a href="/settings"><button><i class="fa-solid fa-gear"></i> Settings</button></a>
            <button onclick="signOut()"><i class="fa-solid fa-arrow-right-from-bracket"></i> Sign Out</button>
         </div>

         <strong><p id="notSignedIn">Create an account to explore!</p></strong>
         <img class="userPfp-sidebar" id="userPfp-sidebar" src="" draggable="false" /><p id="displayName-sidebar">Display Name</p>
         <p id="username-pronouns-sidebar">@username</p>
      </div>
   </div>
`;

document.body.appendChild(sidebar);

// show the "show more content" button click
document.getElementById("showMoreContent").addEventListener("click", () => {
   if (document.getElementById("moreContent").style.display === "" || document.getElementById("moreContent").style.display === "block") {
      document.getElementById("moreContent").style.display = "none";
   } else {
      document.getElementById("moreContent").style.display = "block";
   }
});

// get the current page
switch (pathName) {
   case "/home":
      document.getElementById("homeSidebar").classList.add("active");
      break;
   case "/notifications":
      document.getElementById("notificationsSidebar").classList.add("active");
      break;
   case "/search":
      document.getElementById("searchSidebar").classList.add("active");
      break;
   case "/messages":
      document.getElementById("messagesSidebar").classList.add("active");
      break;
   case "/updates":
      document.getElementById("updatesSidebar").classList.add("active");
      break;
   case "/u":
      // not yet implemented
      break;
   case "/settings":
      document.getElementById("settingsSidebar").classList.add("active");
      break;
   case "/contributors":
      document.getElementById("contributorsSidebar").classList.add("active");
      break;
   case "/achievements":
      document.getElementById("achievementsSidebar").classList.add("active");
      break;
   case "/favorites":
      document.getElementById("favoritesSidebar").classList.add("active");
      break;
   default:
      break;
}

// hide/edit certain sidebar elements if signed out
if (isSignedIn === false) {
   // sidebar buttons
   document.getElementById("notificationsSidebar").remove();
   document.getElementById("messagesSidebar").remove();
   document.getElementById("meSidebar").remove();
   document.getElementById("settingsSidebar").remove();
   document.getElementById("enchantedSidebar").remove();
   document.getElementById("favoritesSidebar").remove();
   document.getElementById("achievementsSidebar").remove();

   // hide sidebar profile
   document.getElementById("userPfp-sidebar").remove();
   document.getElementById("displayName-sidebar").remove();
   document.getElementById("username-pronouns-sidebar").remove();
} else if (isSignedIn === true) {
   // hide "Log in to explore TransSocial!" message
   document.getElementById("notSignedIn").remove();

   // change sidebar info
   firebase.database().ref(`users/${firebase.auth().currentUser.uid}`).once("value").then((snapshot) => {
      const info = snapshot.val();

      document.getElementById("userPfp-sidebar").src = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/images%2Fpfp%2F${firebase.auth().currentUser.uid}%2F${info.pfp}?alt=media`;
      document.getElementById("displayName-sidebar").textContent = info.display;
      document.getElementById("username-pronouns-sidebar").textContent = `@${info.username}`;

      document.getElementById("linkToAcc").setAttribute("href", `/u/${info.username}`);
   });
}

// show profile manager (sidebar) when profileContainer is clicked
document.getElementById("profileContainer").addEventListener("click", () => {
   if (isSignedIn === true) {
      if (document.getElementById("profile").style.display === "" || document.getElementById("profile").style.display === "block") {
         document.getElementById("profile").style.display = "none";
      } else {
         document.getElementById("profile").style.display = "block";
      }
   }
});

// get notifications
let unreadNotifications = null;

firebase.auth().onAuthStateChanged((user) => {
   if (user) {
      firebase.database().ref(`users/${user.uid}/notifications/unread`).on("value", (snapshot) => {
         unreadNotifications = snapshot.val();
         if (unreadNotifications !== null && unreadNotifications !== 0) {
            document.getElementById("notificationsCount").classList.add("show");
            document.getElementById("notificationsCount").textContent = `${unreadNotifications}`;
         } else {
            if (document.getElementById("notificationsCount")) {
               document.getElementById("notificationsCount").classList.remove("show");
            }
         }
      })
   }
})