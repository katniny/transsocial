// create "newNotesAvailable" element
const newNotesAvailable = document.createElement("div");
newNotesAvailable.setAttribute("id", "newNotesAvailable");
newNotesAvailable.className = "newNotesAvailable";
document.body.appendChild(newNotesAvailable);

// determine when notes were created
function timeAgo(timestamp) {
   const now = Math.floor(Date.now() / 1000); // Current timestamp in seconds
   const seconds = now - Math.floor(timestamp / 1000); // Convert milliseconds to seconds

   if (seconds < 60) {
      return `${seconds}s`;
   }
   const minutes = Math.floor(seconds / 60);
   if (minutes < 60) {
      return `${minutes}m`;
   }
   const hours = Math.floor(minutes / 60);
   if (hours < 24) {
      return `${hours}h`;
   }
   const days = Math.floor(hours / 24);
   if (days < 30) {
      return `${days}d`;
   }

   // Convert timestamp to a Date object
   const date = new Date(timestamp);
   const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
   const formattedDate = `${months[date.getMonth()]} ${date.getDate()}`;

   return formattedDate;
}

// note loading
let notesRef = firebase.database().ref('notes');
const notesDiv = document.getElementById("notes");
const batchSize = null;
let isLoading = false;
let lastNoteKey = null;
let loadedNotesId = [];


let userAutoplayPreference = null;

// function to fetch and cache user's autoplay pref
function fetchAutoplayPreference() {
   return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            firebase.database().ref(`users/${user.uid}/autoplayVideos`).once("value", (snapshot) => {
               const evenExists = snapshot.exists();
               const pref = snapshot.val();

               if (evenExists === true) {
                  userAutoplayPreference = (pref === "true"); // this sets it to their preference
               } else {
                  userAutoplayPreference = true;
               }
               resolve(userAutoplayPreference);
            }).catch(reject);
         } else {
            userAutoplayPreference = true;
            resolve(userAutoplayPreference);
         }
      });
   });
}

fetchAutoplayPreference(); // call on start

// show notes without refreshing
// revolutionary tech y'all
function loadNotesFromButton() {
   // remove existing notes
   const notes = document.querySelectorAll(".note");
   notes.forEach(note => note.remove());

   // load the new notes
   loadInitalNotes();
}

// Note Rendering
function createNoteDiv(noteContent) {
   const noteDiv = document.createElement('div');
   noteDiv.className = 'note';
   noteDiv.setAttribute("id", `${noteContent.id}`);
   return noteDiv;
}

// observer to only show images/videos/etc. when about to be visible for performance
const mediaObserver = new IntersectionObserver((entries, observer) => {
   entries.forEach(entry => {
      if (entry.isIntersecting) {
         entry.target.style.visibility = "visible";
         entry.target.style.opacity = "1";
      } else {
         entry.target.style.visibility = "hidden";
         entry.target.style.opacity = "0";
      }
   });
}, {
   root: null,
   rootMargin: "0px",
   threshold: 0.1
});

function loadInitalNotes() {
   if (pathName !== "/note" && pathName !== "/u" && !pathName.startsWith("/u/") && !pathName.startsWith("/note/")) {
      notesRef.limitToLast(20).once("value").then(function (snapshot) {
         const notesArray = [];
         snapshot.forEach(function (childSnapshot) {
            const noteContent = childSnapshot.val();
            noteContent.key = childSnapshot.key;
            notesArray.push(noteContent);
         });

         notesArray.sort((a, b) => b.createdAt - a.createdAt);

         lastNoteKey = notesArray[notesArray.length - 1]?.key;

         renderNotes(notesArray);
      });
   } else if (pathName === "/note" || pathName.startsWith("/note/")) {
      const url = new URL(window.location.href);
      let noteParam = null;

      if (pathName.startsWith("/note/")) {
         const segments = pathName.split("/");
         noteParam = segments[2];

         console.log(noteParam);
      } else {
         noteParam = url.searchParams.get("id");
      }

      notesRef.once("value")
         .then(function (snapshot) {
            notesRef.limitToLast(snapshot.numChildren()).once("value").then(function (snapshot) {
               const notesArray = [];
               snapshot.forEach(function (childSnapshot) {
                  const noteContent = childSnapshot.val();
                  noteContent.key = childSnapshot.key;
                  notesArray.push(noteContent);
               });

               notesArray.sort((a, b) => b.createdAt - a.createdAt);

               lastNoteKey = notesArray[notesArray.length - 1]?.key;

               const filteredNotes = notesArray.filter((currentNote) => currentNote.replyingTo === noteParam);

               if (filteredNotes.length > 0) {
                  renderNotes(filteredNotes);
               } else {
                  renderNotes(notesArray);
               }
            });
         })
   } else if (pathName === "/u" || pathName.startsWith("/u/")) {
      const url = new URL(window.location.href);
      let userParam = null;

      if (pathName.startsWith("/u/")) {
         const segments = pathName.split("/");
         userParam = segments[2];

         console.log(userParam);
      } else {
         userParam = url.searchParams.get("id");
      }

      firebase.database().ref(`taken-usernames/${userParam}`).once("value", (snapshot) => {
         const id = snapshot.val();

         firebase.database().ref(`users/${id.user}/posts`).once("value")
            .then(function (snapshot) {
               notesRef.limitToLast(snapshot.numChildren()).once("value").then(function (snapshot) {
                  const notesArray = [];
                  snapshot.forEach(function (childSnapshot) {
                     const noteContent = childSnapshot.val();
                     noteContent.key = childSnapshot.key;
                     notesArray.push(noteContent);
                  });

                  notesArray.sort((a, b) => b.createdAt - a.createdAt);

                  lastNoteKey = notesArray[notesArray.length - 1]?.key;

                  const filteredNotes = notesArray.filter((currentNote) => currentNote.replyingTo === userParam);

                  if (filteredNotes.length > 0) {
                     renderNotes(filteredNotes.reverse()); // has to be reversed, or it goes all weird
                  } else {
                     renderNotes(notesArray.reverse());
                  }
               });
            })
      })
   }
}

loadInitalNotes();

// infinite loading
window.addEventListener("scroll", () => {
   if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
      loadMoreNotes();
   }
});

function loadMoreNotes() {
   if (!lastNoteKey) return;

   notesRef.orderByKey().endBefore(lastNoteKey).limitToLast(15).once('value').then(function (snapshot) {
      const notesArray = [];

      snapshot.forEach(function (childSnapshot) {
         const noteContent = childSnapshot.val();
         noteContent.key = childSnapshot.key;
         notesArray.push(noteContent);
      });

      if (notesArray.length > 0) {
         lastNoteKey = notesArray[0].key;

         renderNotes(notesArray.reverse());
      }
   });
}

// retrieve data from the "notes" node
function renderNotes(notesArray) {
   const notesContainer = document.getElementById("notes");

   notesArray.forEach(noteContent => {
      const noteDiv = createNoteDiv(noteContent);

      if (document.getElementById("newNotesAvailable")) {
         document.getElementById("newNotesAvailable").style.display = "none";
      }

      if (noteContent.isNsfw === true) {
         firebase.auth().onAuthStateChanged((user) => {
            if (user) {
               firebase.database().ref(`users/${user.uid}`).once("value", (snapshot) => {
                  const showNsfw = snapshot.val();

                  if (showNsfw.showNsfw === "Show") {
                     // No need to do anything. It'll do it as is.
                  } else if (showNsfw.showNsfw === "Blur") {
                     // The actual cover
                     const cover = document.createElement("div");
                     cover.classList.add("contentWarning");
                     cover.setAttribute("id", `${noteContent.id}-blur`);

                     // Warning Header
                     const warning = document.createElement("p");
                     warning.setAttribute("id", `${noteContent.id}-warning`);
                     warning.classList.add("warning");
                     warning.textContent = "Note may contain NSFW content.";

                     // Warning Info
                     const warningInfo = document.createElement("p");
                     warningInfo.classList.add("warningInfo");
                     warningInfo.setAttribute("id", `${noteContent.id}-warningInfo`);
                     warningInfo.textContent = "The creator of this note flagged their note as having NSFW content.";

                     // Close Warning Button
                     const closeButton = document.createElement("button");
                     closeButton.classList.add("closeWarning");
                     closeButton.setAttribute("id", `${noteContent.id}-closeWarning`);
                     closeButton.addEventListener("click", () => removeNsfw(this.id));
                     closeButton.textContent = "View";

                     // Show all children
                     noteDiv.appendChild(cover);
                     noteDiv.appendChild(warning);
                     noteDiv.appendChild(warningInfo);
                     noteDiv.appendChild(closeButton);
                  } else if (showNsfw.showNsfw === "Hide") {
                     // We remove the note so the user doesn't have to see it
                     noteDiv.remove();
                  }
               })
            } else {
               noteDiv.remove();
            }
         })
      } else if (noteContent.isSensitive === true) {
         firebase.auth().onAuthStateChanged((user) => {
            if (user) {
               firebase.database().ref(`users/${user.uid}`).once("value", (snapshot) => {
                  const showNsfw = snapshot.val();

                  if (showNsfw.showSensitive === "Show") {
                     // No need to do anything. It'll do it as is.
                  } else if (showNsfw.showSensitive === "Blur") {
                     // The actual cover
                     const cover = document.createElement("div");
                     cover.classList.add("contentWarning");
                     cover.setAttribute("id", `${noteContent.id}-blur`);

                     // Warning Header
                     const warning = document.createElement("p");
                     warning.setAttribute("id", `${noteContent.id}-warning`);
                     warning.classList.add("warning");
                     warning.textContent = "Note may contain sensitive content.";

                     // Warning Info
                     const warningInfo = document.createElement("p");
                     warningInfo.classList.add("warningInfo");
                     warningInfo.setAttribute("id", `${noteContent.id}-warningInfo`);
                     warningInfo.textContent = "The creator of this note flagged their note as having sensitive content.";

                     // Close Warning Button
                     const closeButton = document.createElement("button");
                     closeButton.classList.add("closeWarning");
                     closeButton.setAttribute("id", `${noteContent.id}-closeWarning`);
                     closeButton.addEventListener("click", () => removeNsfw(this.id));
                     closeButton.textContent = "View";

                     // Show all children
                     noteDiv.appendChild(cover);
                     noteDiv.appendChild(warning);
                     noteDiv.appendChild(warningInfo);
                     noteDiv.appendChild(closeButton);
                  } else if (showNsfw.showSensitive === "Hide") {
                     // We remove the note so the user doesn't have to see it
                     noteDiv.remove();
                  }
               })
            } else {
               noteDiv.remove();
            }
         })
      } else if (noteContent.isPolitical === true) {
         firebase.auth().onAuthStateChanged((user) => {
            if (user) {
               firebase.database().ref(`users/${user.uid}`).once("value", (snapshot) => {
                  const showNsfw = snapshot.val();

                  if (showNsfw.showPolitics === "Show") {
                     // No need to do anything. It'll do it as is.
                  } else if (showNsfw.showPolitics === "Blur") {
                     // The actual cover
                     const cover = document.createElement("div");
                     cover.classList.add("contentWarning");
                     cover.setAttribute("id", `${noteContent.id}-blur`);

                     // Warning Header
                     const warning = document.createElement("p");
                     warning.setAttribute("id", `${noteContent.id}-warning`);
                     warning.classList.add("warning");
                     warning.textContent = "Note may contain political content.";

                     // Warning Info
                     const warningInfo = document.createElement("p");
                     warningInfo.classList.add("warningInfo");
                     warningInfo.setAttribute("id", `${noteContent.id}-warningInfo`);
                     warningInfo.textContent = "This note may contain political content. This note does not reflect TransSocial's opinions. This note may not be political and may be incorrectly flagged.";

                     // Close Warning Button
                     const closeButton = document.createElement("button");
                     closeButton.classList.add("closeWarning");
                     closeButton.setAttribute("id", `${noteContent.id}-closeWarning`);
                     closeButton.addEventListener("click", () => removeNsfw(this.id));
                     closeButton.textContent = "View";
                     closeButton.style.marginTop = "25px";

                     // Show all children
                     noteDiv.appendChild(cover);
                     noteDiv.appendChild(warning);
                     noteDiv.appendChild(warningInfo);
                     noteDiv.appendChild(closeButton);
                  } else if (showNsfw.showPolitics === "Hide") {
                     // We remove the note so the user doesn't have to see it
                     noteDiv.remove();
                  }
               })
            } else {
               noteDiv.remove();
            }
         })
      }

      // Create the user's PFP
      const userPfp = document.createElement("img");
      userPfp.classList.add("notePfp");
      firebase.database().ref("users/" + noteContent.whoSentIt).once("value", (snapshot) => {
         const fetchedUser = snapshot.val();
         userPfp.src = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/images%2Fpfp%2F${noteContent.whoSentIt}%2F${fetchedUser.pfp}?alt=media`;
         userPfp.setAttribute("draggable", "false");
         userPfp.setAttribute("loading", "lazy");
      });
      noteDiv.appendChild(userPfp);
      mediaObserver.observe(userPfp); // observe pfp

      // Create the user's display name
      // Also check for badges (verified, mod, Enchanted, etc.)
      const displayName = document.createElement("a");
      displayName.classList.add("noteDisplay");
      firebase.database().ref("users/" + noteContent.whoSentIt).once("value", (snapshot) => {
         const fetchedUser = snapshot.val();
         displayName.innerHTML = escapeAndEmoji(fetchedUser.display);
         displayName.href = `/u/${fetchedUser.username}`;

         const badges = document.createElement("span");
         if (fetchedUser.isVerified === true) {
            badges.innerHTML = `<i class="fa-solid fa-circle-check fa-sm"></i>`;
         }
         if (fetchedUser.isSubscribed === true) {
            badges.innerHTML = `${badges.innerHTML}<i class="fa-solid fa-heart fa-sm"></i>`;
         }
         if (fetchedUser.activeContributor === true) {
            badges.innerHTML = `${badges.innerHTML}<i class="fa-solid fa-handshake-angle fa-sm"></i>`;
         }
         badges.classList.add("noteBadges");
         displayName.appendChild(badges);
      })
      noteDiv.appendChild(displayName);

      // Insert Breakpoint to Seperate Display Name and Username
      const breakpoint = document.createElement("br");
      noteDiv.appendChild(breakpoint);

      // Create the user's username
      const username = document.createElement("a");
      username.classList.add("noteUsername");
      firebase.database().ref("users/" + noteContent.whoSentIt).once("value", (snapshot) => {
         const fetchedUser = snapshot.val();
         if (fetchedUser.pronouns !== undefined) {
            const displayDate = timeAgo(noteContent.createdAt);

            username.textContent = `@${fetchedUser.username} • ${fetchedUser.pronouns} • ${displayDate}`;
         } else {
            const displayDate = timeAgo(noteContent.createdAt);

            username.textContent = `@${fetchedUser.username} • ${displayDate}`;
         }
         username.href = `/u/${fetchedUser.username}`;
      })
      noteDiv.appendChild(username);

      // Create the note's text
      const text = document.createElement("p");
      text.innerHTML = sanitizeAndLinkify(noteContent.text)
      text.classList.add("noteText");
      if (noteContent.replyingTo === undefined) {
         text.addEventListener("click", () => window.location.href=`/note/${noteContent.id}`);
      }
      text.querySelectorAll('a').forEach(link => {
         link.addEventListener('click', (event) => {
            event.stopPropagation();
         });
      });
      // twemoji.parse(text, {
      //    folder: 'svg',
      //    ext: '.svg'
      // });
      noteDiv.appendChild(text);

      // If image has image/video, render a video/image
      if (noteContent.image !== undefined) {
         let imageFileName = noteContent.image;
         let imageExtension = imageFileName.split(".").pop();
         const url = imageExtension;
         const cleanUrl = url.split('?')[0];

         if (cleanUrl === "mp4") {
            const video = document.createElement("video");
            video.src = noteContent.image;
            video.classList.add("uploadedImg");
            video.controls = true;
            video.muted = true;
            video.loop = true;
            video.setAttribute("loading", "lazy");
            video.style.visibility = "hidden"; // Start hidden
            video.style.opacity = "0";

            video.autoplay = userAutoplayPreference;

            video.setAttribute("alt", `${noteContent.alt}`);
            noteDiv.appendChild(video);

            // observe image
            mediaObserver.observe(video);
         } else {
            const image = document.createElement("img");
            image.src = noteContent.image;
            image.draggable = "false";
            image.classList.add("uploadedImg");
            image.setAttribute("alt", `${noteContent.alt}`);
            image.setAttribute("loading", "lazy");
            image.style.visibility = "hidden"; // Start hidden
            image.style.opacity = "0";

            noteDiv.appendChild(image);

            // observe image
            mediaObserver.observe(image);
         }
      }

      // if the note has a song, embed it into the note
      if (noteContent.music) {
         const embed = document.createElement("iframe");
         embed.src = `https://open.spotify.com/embed/track/${noteContent.music}`;
         embed.width = "98%";
         embed.height = "100";
         embed.frameBorder = "0";
         embed.allowTransparency = "true";
         embed.allow = "encrypted-media";

         noteDiv.appendChild(embed);
      }

      // If quoting a note, display the note that the note is quoting
      if (noteContent.quoting) {
         const container = document.createElement("div");
         container.classList.add("quoteContainer");
         container.addEventListener("click", () => window.location.replace(`/note/${noteContent.quoting}`));
         noteDiv.appendChild(container);

         firebase.database().ref(`notes/${noteContent.quoting}`).once("value", (snapshot) => {
            const quoteData = snapshot.val();

            if (quoteData.isDeleted !== true) {
               firebase.database().ref(`users/${quoteData.whoSentIt}`).once("value", (snapshot) => {
                  const quoteUser = snapshot.val();

                  const quotePfp = document.createElement("img");
                  quotePfp.classList.add("quotePfp");
                  quotePfp.setAttribute("draggable", "false");
                  if (quoteUser.suspensionStatus !== "suspended") {
                     quotePfp.src = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/images%2Fpfp%2F${quoteData.whoSentIt}%2F${quoteUser.pfp}?alt=media`;
                  } else {
                     quotePfp.src = `/assets/imgs/defaultPfp.png`;
                  }
                  const quoteContent = document.createElement("div");
                  quoteContent.classList.add("quoteContent");

                  const quoteHeader = document.createElement("div");
                  quoteHeader.classList.add("quoteHeader");

                  const quoteDisplay = document.createElement("span");
                  quoteDisplay.classList.add("quoteDisplay");
                  if (quoteUser.suspensionStatus !== "suspended") {
                     quoteDisplay.textContent = quoteUser.display;
                  } else {
                     quoteDisplay.textContent = "User Unavailable";
                  }

                  const quoteUsername = document.createElement("span");
                  quoteUsername.classList.add("quoteUsername");
                  if (quoteUser.suspensionStatus !== "suspended") {
                     if (quoteUser.pronouns !== undefined && quoteUser.pronouns !== "") {
                        quoteUsername.textContent = `@${quoteUser.username} • ${quoteUser.pronouns}`;
                     } else {
                        quoteUsername.textContent = `@${quoteUser.username}`;
                     }
                  } else {
                     quoteUsername.textContent = `User Unavailable`;
                  }

                  const quoteText = document.createElement("span");
                  quoteText.classList.add("quoteText");
                  let content = sanitizeAndLinkify(quoteData.text);
                  if (content.length > 247) { // check length
                     content = content.substring(0, 247) + "...";
                  }
                  if (quoteUser.suspensionStatus !== "suspended") {
                     quoteText.innerHTML = content;
                  } else {
                     quoteText.textContent = `@${quoteUser.username} is suspended, and notes by this user cannot be viewed.`;
                  }

                  container.appendChild(quotePfp);
                  container.appendChild(quoteContent);
                  quoteHeader.appendChild(quoteDisplay);
                  quoteHeader.appendChild(quoteUsername);
                  quoteContent.appendChild(quoteHeader);
                  quoteContent.appendChild(quoteText);
                  // twemoji.parse(quoteText, {
                  //    folder: 'svg',
                  //    ext: '.svg'
                  // });
               })
            } else {
               const quotePfp = document.createElement("img");
               quotePfp.classList.add("quotePfp");
               quotePfp.setAttribute("draggable", "false");
               quotePfp.src = `/assets/imgs/defaultPfp.png`;

               const quoteContent = document.createElement("div");
               quoteContent.classList.add("quoteContent");

               const quoteHeader = document.createElement("div");
               quoteHeader.classList.add("quoteHeader");

               const quoteDisplay = document.createElement("span");
               quoteDisplay.classList.add("quoteDisplay");
               quoteDisplay.textContent = "Unknown User";

               const quoteUsername = document.createElement("span");
               quoteUsername.classList.add("quoteUsername");
               quoteUsername.textContent = `@unknownuser`;


               const quoteText = document.createElement("span");
               quoteText.classList.add("quoteText");
               quoteText.textContent = "You do not have permission to view this note.";

               container.appendChild(quotePfp);
               container.appendChild(quoteContent);
               quoteHeader.appendChild(quoteDisplay);
               quoteHeader.appendChild(quoteUsername);
               quoteContent.appendChild(quoteHeader);
               quoteContent.appendChild(quoteText);
            }
         })
      }

      // If flagged, display that.
      if (noteContent.isNsfw === true) {
         const contentWarning = document.createElement("p");
         contentWarning.classList.add("contentWarning-showBelowText");
         contentWarning.innerHTML = `<i class="fa-solid fa-flag"></i> Flagged as NSFW`;

         noteDiv.appendChild(contentWarning);
      } else if (noteContent.isSensitive === true) {
         const contentWarning = document.createElement("p");
         contentWarning.classList.add("contentWarning-showBelowText");
         contentWarning.innerHTML = `<i class="fa-solid fa-flag"></i> Flagged as sensitive`;

         noteDiv.appendChild(contentWarning);
      } else if (noteContent.isPolitical === true) {
         const contentWarning = document.createElement("p");
         contentWarning.classList.add("contentWarning-showBelowText");
         contentWarning.innerHTML = `<i class="fa-solid fa-flag"></i> Flagged as political`;

         noteDiv.appendChild(contentWarning);
      }


      const buttonRow = document.createElement("div");
      buttonRow.classList.add("buttonRow");
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            firebase.database().ref(`users/${firebase.auth().currentUser.uid}/experiments`).once("value", (val) => {
               if (val.val().noteButtonLayout) {
                  buttonRow.classList.add("buttonRowExperiment");
               }
            })
         }
      });

      // Add love button
      const loveBtn = document.createElement("p");
      loveBtn.classList.add("likeBtn");
      if (noteContent.likes !== undefined) {
         loveBtn.innerHTML = `<i class="fa-solid fa-heart"></i> ${noteContent.likes}`;

         firebase.auth().onAuthStateChanged((user) => {
            if (isSignedIn === true && noteContent.whoLiked && noteContent.whoLiked[user.uid]) {
               loveBtn.classList.add("liked");
            }
         })
      } else {
         loveBtn.innerHTML = `<i class="fa-solid fa-heart"></i> 0`;
      }
      loveBtn.setAttribute("id", `like-${noteContent.id}`);
      buttonRow.appendChild(loveBtn);

      // Add renote button
      const renoteBtn = document.createElement("p");
      renoteBtn.classList.add("renoteBtn");
      if (noteContent.renotes !== undefined) {
         renoteBtn.innerHTML = `<i class="fa-solid fa-retweet"></i> ${noteContent.renotes}`;

         firebase.auth().onAuthStateChanged((user) => {
            if (isSignedIn && noteContent.whoRenoted && noteContent.whoRenoted[user.uid]) {
               renoteBtn.classList.add("renoted");
            }
         })
      } else {
         renoteBtn.innerHTML = `<i class="fa-solid fa-retweet"></i> 0`;
      }
      renoteBtn.setAttribute("id", `renote-${noteContent.id}`);
      buttonRow.appendChild(renoteBtn);

      // Add reply button
      const replyBtn = document.createElement("p");
      replyBtn.classList.add("replyBtn");
      if (noteContent.replies !== undefined) {
         replyBtn.innerHTML = `<i class="fa-solid fa-comment"></i> ${noteContent.replies}`;
      } else {
         replyBtn.innerHTML = `<i class="fa-solid fa-comment"></i> 0`;
      }
      if (pathName !== "/note" && !pathName.startsWith("/note/")) {
         replyBtn.addEventListener("click", () => window.location.href=`/note/${noteContent.id}`);
      } else {
         replyBtn.addEventListener("click", () => replyToNote(this));
      }
      buttonRow.appendChild(replyBtn);

      // Add quote renote button
      const quoteRenote = document.createElement("p");
      quoteRenote.classList.add("quoteRenoteBtn");
      quoteRenote.innerHTML = `<i class="fa-solid fa-quote-left"></i>`;
      quoteRenote.addEventListener("click", () => quoteRenote(`${noteContent.id}`))
      buttonRow.appendChild(quoteRenote);

      // Add favorite button
      const favorite = document.createElement("p");
      favorite.classList.add("quoteRenoteBtn"); // eh. just reuse a class tbh
      favorite.innerHTML = `<i class="fa-solid fa-bookmark fa-xs" id="favorite-${noteContent.id}"></i>`; // apply the id to the favorites button or it will not change colors
      favorite.addEventListener("click", () => favorite(`${noteContent.id}`));
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            firebase.database().ref(`users/${user.uid}/favorites/${noteContent.id}`).once("value", (snapshot) => {
               if (snapshot.exists()) {
                  // checked if the user has already favorited this. if they have, change the color to indicate that
                  favorite.innerHTML = `<i class="fa-solid fa-bookmark fa-xs" id="favorite-${noteContent.id}" style="color: var(--main-color);"></i>`;
               }
            });
         }
      });
      buttonRow.appendChild(favorite);

      // If user created the note, allow them to edit/delete
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            if (user.uid === noteContent.whoSentIt) {
               const more = document.createElement("p");
               more.classList.add("more");
               more.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
               buttonRow.appendChild(more);
            }
         }
      })

      noteDiv.appendChild(buttonRow);

      // Render note
      // BUT check for certain things first (such as if user is suspended, if user is blocked, etc.)
      // Prevent suspended users notes from rendering
      firebase.database().ref(`users/${noteContent.whoSentIt}`).once("value", (snapshot) => {
         const isSuspended = snapshot.val();

         if (isSuspended.suspensionStatus === "suspended") {
            noteDiv.remove();
         }
      })

      // If all is okay, do it fine.
      if (pathName === "/home" || pathName === "/u" || pathName.startsWith("/u/")) {
         if (pathName === "/u" || pathName.startsWith("/u/")) {
            const url = new URL(window.location.href);
            let userParam = null;

            if (pathName.startsWith("/u/")) {
               const segments = pathName.split("/");
               userParam = segments[2];

               console.log(userParam);
            } else {
               userParam = url.searchParams.get("id");
            }

            firebase.database().ref(`taken-usernames/${userParam}`).once("value", (snapshot) => {
               const sender = snapshot.val();

               if (noteContent.whoSentIt === sender.user) {
                  if (noteContent.replyingTo === undefined) {
                     if (noteContent.isDeleted !== true) {
                        notesContainer.appendChild(noteDiv);
                     }
                  }
               }
            })
         } else {
            if (noteContent.replyingTo === undefined) {
               if (noteContent.isDeleted !== true) {
                  notesContainer.appendChild(noteDiv);
               }
            }
         }
      }

      if (pathName === "/favorites") {
         firebase.auth().onAuthStateChanged((user) => {
            if (user) {
               firebase.database().ref(`users/${user.uid}/favorites/${noteContent.id}`).once("value", (snapshot) => {
                  if (snapshot.exists()) {
                     // only show if the user has favorited this note
                     notesContainer.appendChild(noteDiv);
                  }
               });
            }
         });
      }

      if (pathName === "/note" || pathName.startsWith("/note/")) {
         const url = new URL(window.location.href);
         let noteParam = null;

         if (pathName.startsWith("/note/")) {
            const segments = pathName.split("/");
            noteParam = segments[2];

            console.log(noteParam);
         } else {
            noteParam = url.searchParams.get("id");
         }

         if (noteContent.replyingTo === noteParam) {
            if (noteContent.isDeleted !== true) {
               notesContainer.appendChild(noteDiv);
            }
         }
      }
   })
}

// notesRef.limitToLast(15).once('value')
//    .then(function (snapshot) {
//       const notesArray = [];
//       snapshot.forEach(function (childSnapshot) {
//          const noteContent = childSnapshot.val();
//          notesArray.push(noteContent);
//       });

//       // sort notes by timestamp, newest first
//       notesArray.sort((a, b) => b.createdAt - a.createdAt);

//       // create and append divs for each note
//       const notesContainer = document.getElementById('notes');
//       notesArray.forEach(noteContent => {
//          const noteDiv = createNoteDiv(noteContent);
//          if (document.getElementById("newNotesAvailable")) {
//             document.getElementById("newNotesAvailable").style.display = "none";
//          }

//          // Check if the note has NSFW/Sensitive content and users preferences
//          // Do this immediately or bugs will arise (that I don't feel like fixing)

//       });
//    })
//    .catch(function (error) {
//       console.error("TransSocial encountered an error trying to load notes:", error);
//       console.error("TransSocial encountered an error trying to load notes: " + error + " Please check your internet connection or report an issue on GitHub (https://github.com/katniny/transsocial-issues/issues).");
//    });

// When a new note is added, let the user know.
firebase.database().ref("notes/").on("child_added", (snapshot) => {
   const isReply = snapshot.val();
   if (isReply.replyingTo === undefined) {
      if (pathName === "/home" || pathName === "/home.html") {
         document.getElementById("newNotesAvailable").style.display = "block";
      }
   }
})

firebase.database().ref("notes/").on("child_changed", (snapshot) => {
   const data = snapshot.val();
   //console.log(data);

   // Check if any specific field (child) is updated
   document.getElementById(`like-${data.id}`).innerHTML = `<i class="fa-solid fa-heart"></i> ${data.likes}`;
   document.getElementById(`renote-${data.id}`).innerHTML = `<i class="fa-solid fa-retweet"></i> ${data.renotes}`;
   //console.log('Likes:', data.likes, 'Renotes:', data.renotes, 'Replies:', data.replies);

   firebase.auth().onAuthStateChanged((user) => {
      const uid = user.uid;

      // If user loved the note, update the UI to display that.
      if (data.whoLiked && data.whoLiked[uid]) {
         document.getElementById(`like-${data.id}`).classList.add("liked");
      } else {
         document.getElementById(`like-${data.id}`).classList.remove("liked");
      }

      // If user renoted the note, update the UI to display that.
      if (data.whoRenoted && data.whoRenoted[uid]) {
         document.getElementById(`renote-${data.id}`).classList.add("renoted");
      } else {
         document.getElementById(`renote-${data.id}`).classList.remove("renoted");
      }
   })
});

let processingLove = false;
document.addEventListener('click', function (event) {
   firebase.auth().onAuthStateChanged((user) => {
      if (user) {
         const uid = user.uid;

         //if (processingLove === true) return;
         processingLove = true;

         if (event.target.classList.contains("likeBtn") || event.target.classList.contains("fa-solid" && "fa-heart")) {
            const likeButton = event.target;
            const noteId = findNoteId(likeButton);

            if (!document.getElementById(`like-${noteId}`).classList.contains("liked")) {
               document.getElementById(`like-${noteId}`).classList.add("liked");
               document.getElementById(`like-${noteId}`).innerHTML = `<i class="fa-solid fa-heart" aria-hidden="true"></i> ${+document.getElementById(`like-${noteId}`).textContent + 1}`;
            } else {
               document.getElementById(`like-${noteId}`).classList.remove("liked");
               document.getElementById(`like-${noteId}`).innerHTML = `<i class="fa-solid fa-heart" aria-hidden="true"></i> ${+document.getElementById(`like-${noteId}`).textContent - 1}`;
            }

            fetch("/api/likeNote", {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify({ noteId: noteId, userId: uid }),
            })
            .then(async (response) => {
               const text = await response.text();
               console.log("Raw response:", text);
               try {
                  processingLove = false;
                  return JSON.parse(text);
               } catch (err) {
                  processingLove = false;
                  console.error("Invalid JSON response:", text);
                  throw new Error("Invalid JSON received from server");
               }
            })
            .then((data) => {
               console.log("Response from server: ", data);
               processingLove = false;
            })
            .catch((error) => {
               console.error("Error liking note: ", error);
               processingLove = false;
            });
         }
      }
   })
});

function findNoteId(likeButton) {
   // Every note has an ID associated with it. This will fetch the note's ID and return it to allow the user to love the note.
   return likeButton.closest(".note").id;
};

document.addEventListener('click', function (event) {
   firebase.auth().onAuthStateChanged((user) => {
      if (user) {
         const uid = user.uid;

         if (event.target.classList.contains("renoteBtn") || event.target.classList.contains("fa-solid" && "fa-retweet")) {
            const renoteButton = event.target;
            const noteId = findNoteId(renoteButton);

            const renoteCountRef = firebase.database().ref(`notes/${noteId}/renotes`);
            renoteCountRef.once("value", (snapshot) => {
               const data = snapshot.val();
               //console.log(data);

               firebase.database().ref(`notes/${noteId}/whoRenoted`).once("value", (snapshot) => {
                  const renotedData = snapshot.val();
                  if (renotedData && renotedData[uid]) {
                     firebase.database().ref(`notes/${noteId}`).update({
                        renotes: data - 1
                     });

                     firebase.database().ref(`notes/${noteId}/whoRenoted/${uid}`).remove();
                     firebase.database().ref(`users/${uid}/posts/${noteId}`).remove();
                  } else {
                     firebase.database().ref(`notes/${noteId}`).update({
                        renotes: data + 1
                     });

                     firebase.database().ref(`notes/${noteId}/whoRenoted/${uid}`).update({
                        uid: uid
                     });

                     firebase.database().ref(`users/${uid}/posts/${noteId}`).update({
                        isRenote: true,
                     })

                     unlockAchievement("Express Yourself");

                     renoteCountRef.off();

                     firebase.database().ref(`notes/${noteId}`).once("value", (snapshot) => {
                        const whoSentIt_note = snapshot.val();

                        if (user.uid !== whoSentIt_note.whoSentIt) {
                           firebase.database().ref(`notes/${noteId}`).once("value", (snapshot) => {
                              const getUser = snapshot.val();
                              sendNotification(getUser.whoSentIt, {
                                 type: "Renote",
                                 who: user.uid,
                                 postId: noteId,
                              });
                           })
                        }
                     })
                  }
               });

               return;
            })
         }
      }
   })
});

function findNoteId(renoteButton) {
   // Every note has an ID associated with it. This will fetch the note's ID and return it to allow the user to love the note.
   return renoteButton.closest(".note").id;
};