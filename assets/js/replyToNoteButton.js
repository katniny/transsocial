// create transsocialAccounts
const replyToNote = document.createElement("div");
replyToNote.className = "replyToNote";

// set transsocialAccounts html
if (pathName === "/home") {
   replyToNote.textContent = `
      What's on your mind?
   `;
   
   replyToNote.classList.add("homepage");
} else if (pathName.startsWith("/note/")) {
   replyToNote.textContent = `
      Reply
   `;
}

replyToNote.addEventListener("click", () => {
   createNotePopup();
});

document.getElementById("noteFilter").appendChild(replyToNote);