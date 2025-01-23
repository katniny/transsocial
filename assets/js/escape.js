import { emojiMap } from "./config.js";

function escapeHtml(str) {
   const div = document.createElement('div');
   div.textContent = str;
   return div.innerHTML;
}

function linkify(text) {
   const urlPattern = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
   const usernamePattern = /@(\w+)/g;

   let linkedText = text.replace(urlPattern, '<a href="javascript:void(0)" onclick="openLink(`$1`)">$1</a>');
   linkedText = linkedText.replace(usernamePattern, '<a href="/u/$1">@$1</a>');

   return linkedText;
}

function addNewlines(text) {
   let newText = text.replace(/(\r\n|\n|\r)/g, '<br>');
   return newText;
}

function markdownify(text) {
   // headers
   // ###, ## and #
   text = text.replace(/^### (.+)$/gm, '<h3>$1</h3>');
   text = text.replace(/^## (.+)$/gm, '<h2>$1</h2>');
   text = text.replace(/^# (.+)$/gm, '<h1>$1</h1>');

   // bold, italics, strikethrough and monospace
   text = text.replace(/\*(.+?)\*/g, '<strong>$1</strong>'); //bold
   text = text.replace(/\_(.+?)\_/g, '<em>$1</em>'); // italics
   text = text.replace(/~(.+?)~/g, '<del>$1</del>'); // strikethrough
   text = text.replace(/`([^`]+)`/g, '<code>$1</code>'); // monospace
   text = text.replace(/```([^`]+)```/g, '<pre><code>$1</code></pre>'); // multi-line monospace

   // lists
   text = text.replace(/^- (.+)$/gm, '<ul><li>$1</li></ul>');

   // blockquotes
   text = text.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>');

   // escape backslashes
   text = text.replace(/\\(.)/g, '$1');

   return text;
}

function emojify(text) {
   for (const [phrase, imageUrl] of Object.entries(emojiMap)) {
      const regex = new RegExp(`\\[${phrase}\\]`, "g");
      text = text.replace(regex, `<img src="${imageUrl}" alt=${phrase} class="emoji aurora" draggable="false" />`);
   }
   return text;
}

function sanitizeAndLinkify(text) {
   let escapedText = escapeHtml(text);
   escapedText = markdownify(escapedText);
   escapedText = emojify(escapedText);
   escapedText = linkify(escapedText);
   escapedText = addNewlines(escapedText);
   return escapedText;
}

function escapeAndEmoji(text) {
   let escapedText = escapeHtml(text);
   escapedText = emojify(escapedText);
   return escapedText;
}
