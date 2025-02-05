// create transsocialAccounts
const accountCenter = document.createElement("div");
accountCenter.className = "transsocialAccounts";

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
// changed: client-side as we only need publicly available data anyways
async function fetchUserData(username) {
   const url = `taken-usernames/${username}`;
   try {
      const usernameSnapshot = await firebase.database().ref(url).once("value");
      const uid = usernameSnapshot.val().user;
      if (!uid) return null;

      // get user data and include the UID
      const userSnapshot = await firebase.database().ref(`users/${uid}`).once("value");
      return { ...userSnapshot.val(), uid };  // Add the UID to the returned data
   } catch (error) {
      console.error(`Failed to fetch data for ${username}: ${error.message}`);
      return null;
   }
}

async function updateAccounts() {
   try {
      const results = await Promise.all(users.map(user => fetchUserData(user.username)));
      results.forEach((data, index) => {
         if (data) {
            const { username, pfp, display, uid } = data;
            // update pfp
            const pfpElement = document.getElementById(users[index].pfpId);
            if (pfpElement) {
               pfpElement.src = pfp ? `https://firebasestorage.googleapis.com/v0/b/chat-transsocial-test.appspot.com/o/images%2Fpfp%2F${uid}%2F${pfp}?alt=media` : "/assets/imgs/defaultPfp.png";
            }

            // update display
            const displayElement = document.getElementById(users[index].displayId);
            if (displayElement) {
               displayElement.textContent = display || username;
            }

            // update username
            const usernameElement = document.getElementById(users[index].pronounsId);
            if (usernameElement) {
               usernameElement.textContent = username ? `@${username}` : "error";
            }
         }
      });
   } catch (error) {
      console.error("Error updating accounts:", error);
   }
}

updateAccounts();