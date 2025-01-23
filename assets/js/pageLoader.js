const loader = document.createElement("div");
loader.className = "loader";
loader.setAttribute("id", "loader");
loader.innerHTML = `
   <p style="position: fixed; left: 0; top: 0; color: var(--text-semi-transparent); transform: translateY(0px);">&copy; Katniny Studios 2025</p>
   <p style="position: fixed; left: 0; top: 17px; color: var(--text-semi-transparent); transform: translateY(0px);">Part of Katniny Online Services</p>
   <p style="position: fixed; left: 0; top: 35px; color: var(--text-semi-transparent); transform: translateY(0px);" class="loaderVersion" id="loaderVersion">TransSocial v</p>
   <img src="/assets/imgs/favicon.png" alt="TransSocial logo" draggable="false" />
   <p><strong>Did you know?</strong></p>
   <p id="loaderQuote" style="position: absolute; margin-top: 40px;"></p>

   <div class="transSocialLoadLong" id="transSocialLoadLong">
      <p>TransSocial not loading?</p>
      <a href="https://bsky.app/profile/transs.social" target="_blank" style="position: absolute; top: 100px; left: 30px; color: var(--main-color); text-decoration: none;"><i class="fa-brands fa-bluesky" style="color: var(--main-color); margin-right: 3px;"></i> Let us know</a>
   </div>
`
document.body.appendChild(loader);
document.getElementById("loaderVersion").textContent = `TransSocial ${transsocialVersion}-${transsocialReleaseVersion}`;

// Randomize quote
const quote = document.getElementById("loaderQuote");
const key = Math.floor(Math.random() * quotes.length);

quote.textContent = quotes[key];

const date = new Date();
const currentMonth = date.getMonth() + 1;

// Show warning
var timeLeft = 30;
const elem = document.getElementById('Timer');

const timerId = setInterval(countdown, 1000);

function countdown() {
   if (timeLeft == 0) {
      clearTimeout(timerId);
      var loadingWarning = document.getElementById("transSocialLoadLong");
      loadingWarning.style.display = "block";
   } else {
      timeLeft--;
   }
}

// if december, force christmas mode (merry christmas mfs)
// or happy holidays, whatever you celebrate :p
// if you celebrate, idk why im being technical as always in code comments no one will ever see lmaoo
if (currentMonth === 12) {
   const hat = document.createElement("img");
   hat.src = "/assets/imgs/xmas_hat.png";
   hat.draggable = false;
   hat.className = "xmasHat";
   hat.onclick = () => {
      if (isSidebarOpen === false) {
         isSidebarOpen = true;
      } else {
         isSidebarOpen = false;
      }
   }

   document.body.appendChild(hat);
}
