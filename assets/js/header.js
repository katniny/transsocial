// create header
const header = document.createElement("div");
header.className = "header";
header.setAttribute("id", "header");

// set header html
header.innerHTML = `
   <div class="left">
      <button id="hamburgerMenu"><i class="fa-solid fa-bars"></i></button> <a href="/home"><img class="headerLogo" id="transsocialHeaderLogo" src="/assets/imgs/All_transparent.png" draggable="false" /></a>
   </div>

   <div class="center">
      <input id="searchBar" placeholder="Search TransSocial" />
   </div>

   <div class="right">
      <!--<a href="/download"><button style="margin-right: 20px; transform: translateY(-23px);" id="headerGetApp">Get App</button>--> <a href="/notifications" id="notificationsHeader"><i class="fa-solid fa-bell fa-lg"></i></a> <a href="/achievements" id="achievementsHeader"><i class="fa-solid fa-trophy fa-lg" style="margin-right: 0px;"></i></a> <img src="" alt="Your profile picture" draggable="false" id="userPfp-header" />
   </div>

   <div class="accountManager" id="accountManager" style="display: none;">
      <h3 id="greetingManager">Hello, {user}</h3>
      <a href="/settings"><button><i class="fa-solid fa-gear"></i> Settings</button></a>
      <a href="/achievements"><button><i class="fa-solid fa-award"></i> Achievements</button></a>
   </div>
`

document.body.appendChild(header);

// hide/change header elements based on signed in status
if (isSignedIn === false) {
   // change pfp
   document.getElementById("userPfp-header").src = "/assets/imgs/defaultPfp.png"

   // hide achievements and notifications buttons
   document.getElementById("notificationsHeader").remove();
   document.getElementById("achievementsHeader").remove();
}

// allow opening header profile manager when signed in
if (isSignedIn === true) {
   document.getElementById("userPfp-header").addEventListener("click", () => {
      if (document.getElementById("accountManager").style.display === "" || document.getElementById("accountManager").style.display === "block") {
         document.getElementById("accountManager").style.display = "none";
      } else {
         document.getElementById("accountManager").style.display = "block";
         document.getElementById("greetingManager").textContent = `Hello, ${document.getElementById("displayName-sidebar").textContent}!`;
      }
   });
}

// change header pfp
if (isSignedIn === true) {
   firebase.database().ref(`users/${firebase.auth().currentUser.uid}`).once("value").then((snapshot) => {
      const info = snapshot.val();

      document.getElementById("userPfp-header").src = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/images%2Fpfp%2F${firebase.auth().currentUser.uid}%2F${info.pfp}?alt=media`;
   });
}