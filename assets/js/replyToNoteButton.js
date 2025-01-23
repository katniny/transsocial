// create transsocialAccounts
const replyToNote = document.createElement("div");
replyToNote.className = "replyToNote";

// set transsocialAccounts html
if (pathName === "/home") {
   replyToNote.innerHTML = `
      What's on your mind?
   `;
   
   replyToNote.classList.add("homepage");
} else if (pathName.startsWith("/note/")) {
   replyToNote.innerHTML = `
      Reply
   `;
}

replyToNote.addEventListener("click", () => {
   createNotePopup();
});

document.getElementById("noteFilter").appendChild(replyToNote);