import { info } from "config.js";

// time
const now = new Date();
let hours = now.getHours();

const timeGreeting = document.createElement("h2");
timeGreeting.className = "greetingTime";

// add text
if (isSignedIn === true) {
   firebase.database().ref(`users/${firebase.auth().currentUser.uid}/username`).once("value", (snapshot) => {
      const greetWho = snapshot.val();
      console.log(hours);

      if (hours < 12 && hours > 5) {
         timeGreeting.innerHTML = `Good morning, ${greetWho}!`;
      } else if (hours < 17 && hours > 12) {
         timeGreeting.innerHTML = `Good afternoon, ${greetWho}!`;
      } else if (hours < 22 && hours > 17) {
         timeGreeting.innerHTML = `Good evening, ${greetWho}!`;
      } else {
         timeGreeting.innerHTML = `Good late night, ${greetWho}!`;
      }
   });
} else {
   if (hours < 12 && hours > 5) {
      timeGreeting.innerHTML = `Good morning!`;
   } else if (hours < 17 && hours > 12) {
      timeGreeting.innerHTML = `Good afternoon!`;
   } else if (hours < 22 && hours > 17) {
      timeGreeting.innerHTML = `Good evening!`;
   } else {
      timeGreeting.innerHTML = `Good late night!`;
   }
}

// add 
document.getElementById("noteFilter").appendChild(timeGreeting);

// random greeting thing
const randomNote = document.createElement("p");
randomNote.className = "randomNote";
randomNote.style.fontSize = "small";

const randomIndex = Math.floor(Math.random() * info.length);
const randomInfo = info[randomIndex];

randomNote.innerHTML = randomInfo.text;
console.log(randomInfo.lore);
if (randomInfo.lore === true) {
   randomNote.classList.add("lore");
}
document.getElementById("noteFilter").appendChild(randomNote);
