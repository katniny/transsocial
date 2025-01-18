// create transsocialAccounts
const accountCenter = document.createElement("div");
accountCenter.className = "transsocialAccounts";

// set the usernames of the 3 users that should displayed
// WITHOUT the @, or the server will return a 404 as it tries
// to find @{user} which doesnt exist, it exists as
// just {user}
const users = [
   { username: "katniny", pfpId: "katninyPfp", displayId: "katninyDisplay", pronounsId: "katninyUser-pronouns" },
   { username: "transsocial", pfpId: "transsocialPfp", displayId: "transsocialDisplay", pronounsId: "transsocialUser-pronouns" },
   { username: "katninystudios", pfpId: "katninystudiosPfp", displayId: "katninystudiosDisplay", pronounsId: "katninystudiosUser-pronouns" }
]

// set transsocialAccounts html
accountCenter.innerHTML = `
   <h3>TransSocial Accounts</h3>
   <p>Follow accounts associated with TransSocial.</p>

   <!-- user sections -->
   ${users.map((user, index) => `
      <div class="${user.username}">
         <img class="recommendAcc-pfp" src="" id="${user.pfpId}" draggable="false" /> 
         <p id="${user.displayId}"></p>
         <br /> 
         <a href="/u" id="followBtn-${index + 1}"><button class="followBtn">Follow</button></a>
         <p id="${user.pronounsId}"></p>
      </div>
      <br />
   `).join("")}
`;

document.body.appendChild(accountCenter);

// get the accounts then append children (or whatever it should be, idk im tired)
async function fetchUserData(username) {
   const url = `http://127.0.0.1:5001/chat-transsocial-test/us-central1/fetchUserPriv?id=${username}`;

   try {
      const response = await fetch(url, { method: "GET" });
      if (!response.ok) {
         throw new Error(`Error: ${response.statusText} (HTTP ${response.status})`);
      }

      const data = await response.json();
      return data;
   } catch (error) {
      console.error(`Failed to fetch data for ${username}: ${error.message}`);
      return null;
   }
}

async function updateAccounts() {
   const results = await Promise.all(users.map(user => fetchUserData(user.username)));

   results.forEach((data, index) => {
      if (data) {
         const { username, pfp, display, uid } = data;
         console.log(data);

         // update pfp
         const pfpElement = document.getElementById(users[index].pfpId);
         if (pfpElement) pfpElement.src = `https://firebasestorage.googleapis.com/v0/b/chat-transsocial-test.appspot.com/o/images%2Fpfp%2F${uid}%2F${pfp}?alt=media` || "/assets/imgs/defaultPfp.png";

         // update display
         const displayElement = document.getElementById(users[index].displayId);
         if (displayElement) displayElement.textContent = display || username;

         // update username
         const usernameElement = document.getElementById(users[index].pronounsId);
         if (usernameElement) usernameElement.textContent = `@${username}` || "error";
      }
   });
}

updateAccounts();