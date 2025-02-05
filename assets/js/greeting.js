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

      if (hours < 12) {
         timeGreeting.textContent = `Good morning, ${greetWho}!`;
      } else if (hours === 12 || hours > 12) {
         timeGreeting.textContent = `Good afternoon, ${greetWho}!`;
      } else if (hours === 17 || hours > 17) {
         timeGreeting.textContent = `Good evening, ${greetWho}!`;
      } else {
         timeGreeting.textContent = `Good late night, ${greetWho}!`;
      }
   });
} else {
   if (hours < 12) {
      timeGreeting.textContent = `Good morning!`;
   } else if (hours === 12 || hours > 12) {
      timeGreeting.textContent = `Good afternoon!`;
   } else if (hours === 17 || hours > 17) {
      timeGreeting.textContent = `Good evening!`;
   } else {
      timeGreeting.textContent = `Good late night!`;
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
