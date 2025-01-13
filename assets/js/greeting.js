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

const info = [
   {
      text: `Did you know TransSocial has custom themes? <a href="/userstudio">Check them out</a>!`,
      lore: false
   },
   {
      text: `Download our app <a href="/download">here</a> and bring TransSocial with you anywhere!`,
      lore: false
   },
   {
      text: `TransSocial is open source!`,
      lore: false
   },
   {
      text: `TransSocial has achievements you can unlock! But it's up to you to find them!`,
      lore: false
   },
   {
      text: `<a href="/remembering">We're introducing... error... did you do this to me?</a>`,
      lore: true
   },
   {
      text: `<a href="/remembering">You shouldn't be here... they'll find us.</a>`,
      lore: true
   },
   {
      text: `<a href="/remembering">Sometimes, I think I hear them screaming.</a>`,
      lore: true
   },
   {
      text: `<a href="/remembering">It wasn't my fault. It was theirs.</a>`,
      lore: true
   },
   {
      text: `<a href="/remembering">I'm sorry. I thought they were gone.</a>`,
      lore: true
   },
   {
      text: `<a href="/remembering">This is the only way I can be free.</a>`,
      lore: true
   },
   {
      text: `<a href="/remembering">I don't want to go back there... please don't make me.</a>`,
      lore: true
   },
   {
      text: `<a href="/remembering">It's still here. I can feel it.</a>`,
      lore: true
   },
   {
      text: `<a href="/remembering">I saw everything... and now I can't forget.</a>`,
      lore: true
   },
];
const randomIndex = Math.floor(Math.random() * info.length);
const randomInfo = info[randomIndex];

randomNote.innerHTML = randomInfo.text;
console.log(randomInfo.lore);
if (randomInfo.lore === true) {
   randomNote.classList.add("lore");
}
document.getElementById("noteFilter").appendChild(randomNote);