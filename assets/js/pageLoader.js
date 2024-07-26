// Randomize quote
const quotes = [
    "Loading...or is it just thinking about loading?",
    "If you can read this, the internet is officially slower than you.",
    "Taking a moment to appreciate all the OTHER things I could be doing right now.",
    "Dear Buffering Circle, You win. I surrender.",
    "The only thing loading faster than this page is my frustration.",
    "Even my patience has a loading bar.",
    "Loading...please wait while I find my will to live.",
    "Error: Motivation not found.",
    "My internet speed is a perfect reflection of my productivity today.",
    "Who needs enemies when you have slow internet?",
    "At this rate, the dinosaurs will be back before this page loads.",
    "The suspense is killing me. Or it would be, if the page would load.",
    "Loading time sponsored by my unhealthy obsession with checking my phone.",
    "Would you like a side of existential crisis with that buffering?",
    "Shhh...The internet is taking a nap.",
    "Hamsters powering TransSocial are taking a snack break.",
    "Squirrels are frantically sorting your data. Please be patient.",
    "Someone must be hogging all your bandwidth, probably watching cat videos.",
    "Time to practice your 'waiting patiently' face.",
    "Did you try turning it off and back on again?",
    "This is a good time for a staring contest with the loading bar.",
    "If you need me, I'll be here. Or I'll be here eventually.",
    "Hey, at least you have something to look at, right?",
    "I'd tell you a joke while you wait, but it might take even longer to load.",
    "Maybe if you close my eyes and open them again, it'll magically be loaded.",
    "TransSocial is currently in development - it's like watching paint dry, but way more exciting (maybe).",
    "Don't worry if TransSocial is a little buggy - report them and we'll train the hamsters better.",
    "We're releasing TransSocial in phases, kind of like building a snowman one snowball at a time.",
    "Warning: Using TransSocial during development may lead to uncontrollable anger, mild confusion, and a strong urge to slap the developer. Use at your own risk!",
];

const quote = document.getElementById("loaderQuote");
const key = Math.floor(Math.random() * quotes.length);

quote.textContent = quotes[key];


const date = new Date();
const currentMonth = date.getMonth() + 1;

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        const uid = user.uid;
        const loader = document.querySelector('.loader');
        const emailVer = firebase.database().ref(`users/${uid}/email`);

        firebase.database().ref(`users/${uid}`).once("value", (snapshot) => {
            const getTheme = snapshot.val();

            // Set zoom level
            if (getTheme.fontSizePref) {
                if (getTheme.fontSizePref === "normal") {
                    document.documentElement.style.setProperty('--zoom-level', '1');
                } else if (getTheme.fontSizePref === "large") {
                    document.documentElement.style.setProperty('--zoom-level', '1.07');
                }
            }

            if (getTheme.theme === "Dark" || getTheme.theme === undefined) {
                // Dark theme by default
            } else if (getTheme.theme === "Light") {
                document.documentElement.style.setProperty('--background', '#f5f5f5');
                document.documentElement.style.setProperty('--main-color', '#dd6075');
                document.documentElement.style.setProperty('--main-color-darker', '#b44d5d');
                document.documentElement.style.setProperty('--header-color', '#e0e0e0');
                document.documentElement.style.setProperty('--text', '#000');
                document.documentElement.style.setProperty('--text-half-transparent', 'rgba(0, 0, 0, 0.5)');
                document.documentElement.style.setProperty('--text-semi-transparent', 'rgba(0, 0, 0, 0.7');
                document.documentElement.style.setProperty('--profile-picture-bg', '#fafafa');
                document.documentElement.style.setProperty('--sidebar-button-hover', '#e5e5e5');
                document.documentElement.style.setProperty('--button-transparent-hover', '#f5f5f5');
                document.documentElement.style.setProperty('--success-color', '#28a745');
                document.documentElement.style.setProperty('--warning-text', '#ffc107');
                document.documentElement.style.setProperty('--error-text', '#dc3545');
                document.documentElement.style.setProperty('--sidebar-text', '#333');
                document.documentElement.style.setProperty('--banner-button-bg', '#fff');
                document.documentElement.style.setProperty('--note-seperator', '#e0e0e0');
                document.documentElement.style.setProperty('--sidebar-button-border', 'transparent');
                document.documentElement.style.setProperty('--modal-background', 'rgba(0, 0, 0, 0.7');
                document.documentElement.style.setProperty('--like-color', '#dc3545');
                document.documentElement.style.setProperty('--renote-color', '#28a745');
                document.documentElement.style.setProperty('--content-warning', 'rgba(255, 255, 255, 0.5');
                document.documentElement.style.setProperty('--skeleton-start', '#e0e0e0');
                document.documentElement.style.setProperty('--skeleton-middle', '#d5d5d5');
                document.documentElement.style.setProperty('--skeleton-end', '#cccccc');
                document.documentElement.style.setProperty('--reply-background', '#fafafa');
                document.documentElement.style.setProperty('--reply-hovered-background', '#e5e5e5');
                document.documentElement.style.setProperty('--note-background', '#fff');
                if (currentMonth === 6 && getTheme.showPrideFlag === "Yes" || currentMonth === 6 && getTheme.showPrideFlag === undefined) {
                    document.getElementById("transsocialHeaderLogo").src = "/assets/imgs/PrideHeaderLogo.png";
                }
            } else if (getTheme.theme === "Mint (Light)") {
                document.documentElement.style.setProperty('--background', '#f0f8ff');
                document.documentElement.style.setProperty('--main-color', '#9be7c4');
                document.documentElement.style.setProperty('--main-color-darker', '#62c198');
                document.documentElement.style.setProperty('--header-color', '#e5f1f8');
                document.documentElement.style.setProperty('--text', '#222');
                document.documentElement.style.setProperty('--text-half-transparent', 'rgba(34, 34, 34, 0.5)');
                document.documentElement.style.setProperty('--text-semi-transparent', 'rgba(34, 34, 34, 0.7)');
                document.documentElement.style.setProperty('--profile-picture-bg', '#e7f2fa');
                document.documentElement.style.setProperty('--sidebar-button-hover', '#d1e4ef');
                document.documentElement.style.setProperty('--button-transparent-hover', '#e5f1f8');
                document.documentElement.style.setProperty('--success-color', '#28a745');
                document.documentElement.style.setProperty('--warning-text', '#ffc107');
                document.documentElement.style.setProperty('--error-text', '#dc3545');
                document.documentElement.style.setProperty('--sidebar-text', '#333');
                document.documentElement.style.setProperty('--banner-button-bg', '#ffffff');
                document.documentElement.style.setProperty('--note-seperator', '#e5f1f8');
                document.documentElement.style.setProperty('--sidebar-button-border', 'transparent');
                document.documentElement.style.setProperty('--modal-background', 'rgba(0, 0, 0, 0.7)');
                document.documentElement.style.setProperty('--like-color', '#dc3545');
                document.documentElement.style.setProperty('--renote-color', '#28a745');
                document.documentElement.style.setProperty('--content-warning', 'rgba(255, 255, 255, 0.5)');
                document.documentElement.style.setProperty('--skeleton-start', '#e0e0e0');
                document.documentElement.style.setProperty('--skeleton-middle', '#d5d5d5');
                document.documentElement.style.setProperty('--skeleton-end', '#cccccc');
                document.documentElement.style.setProperty('--reply-background', '#e7f2fa');
                document.documentElement.style.setProperty('--reply-hovered-background', '#d1e4ef');
                document.documentElement.style.setProperty('--note-background', '#fff');
                if (currentMonth === 6 && getTheme.showPrideFlag === "Yes" || currentMonth === 6 && getTheme.showPrideFlag === undefined) {
                    document.getElementById("transsocialHeaderLogo").src = "/assets/imgs/PrideHeaderLogo.png";
                } else {
                    document.getElementById("transsocialHeaderLogo").src = "/assets/imgs/MintLightThemeLogo.png";
                }
            } else if (getTheme.theme === "Mint (Dark)") {
                document.documentElement.style.setProperty('--background', '#18282d');
                document.documentElement.style.setProperty('--main-color', '#add8d0');
                document.documentElement.style.setProperty('--main-color-darker', '#8cc0b2');
                document.documentElement.style.setProperty('--header-color', '#203338');
                document.documentElement.style.setProperty('--text', '#e0e0e0');
                document.documentElement.style.setProperty('--text-half-transparent', 'rgba(224, 224, 224, 0.5)');
                document.documentElement.style.setProperty('--text-semi-transparent', 'rgba(224, 224, 224, 0.7)');
                document.documentElement.style.setProperty('--profile-picture-bg', '#28383e');
                document.documentElement.style.setProperty('--sidebar-button-hover', '#25353a');
                document.documentElement.style.setProperty('--button-transparent-hover', '#203338');
                document.documentElement.style.setProperty('--success-color', '#28a745');
                document.documentElement.style.setProperty('--warning-text', '#ffc107');
                document.documentElement.style.setProperty('--error-text', '#dc3545');
                document.documentElement.style.setProperty('--sidebar-text', '#f0f0f0');
                document.documentElement.style.setProperty('--banner-button-bg', '#000');
                document.documentElement.style.setProperty('--note-seperator', '#203338');
                document.documentElement.style.setProperty('--sidebar-button-border', 'transparent');
                document.documentElement.style.setProperty('--modal-background', 'rgba(0, 0, 0, 0.7)');
                document.documentElement.style.setProperty('--like-color', '#dc3545');
                document.documentElement.style.setProperty('--renote-color', '#28a745');
                document.documentElement.style.setProperty('--content-warning', 'rgba(29, 29, 29, 0.5)');
                document.documentElement.style.setProperty('--skeleton-start', '#404040');
                document.documentElement.style.setProperty('--skeleton-middle', '#303030');
                document.documentElement.style.setProperty('--skeleton-end', '#252525');
                document.documentElement.style.setProperty('--reply-background', '#28383e');
                document.documentElement.style.setProperty('--reply-hovered-background', '#25353a');
                document.documentElement.style.setProperty('--note-background', 'rgb(40, 40, 40)');
                if (currentMonth === 6 && getTheme.showPrideFlag === "Yes" || currentMonth === 6 && getTheme.showPrideFlag === undefined) {
                    document.getElementById("transsocialHeaderLogo").src = "/assets/imgs/PrideHeaderLogo.png";
                } else {
                    document.getElementById("transsocialHeaderLogo").src = "/assets/imgs/MintDarkThemeLogo.png";
                }
            } else if (getTheme.theme === "High Contrast") {
                document.documentElement.style.setProperty('--background', 'black');
                document.documentElement.style.setProperty('--main-color', 'yellow');
                document.documentElement.style.setProperty('--main-color-darker', '#cccc00');
                document.documentElement.style.setProperty('--header-color', '#333333');
                document.documentElement.style.setProperty('--text', 'white');
                document.documentElement.style.setProperty('--text-half-transparent', 'rgba(255, 255, 255, 0.5)');
                document.documentElement.style.setProperty('--text-semi-transparent', 'rgba(255, 255, 255, 0.7)');
                document.documentElement.style.setProperty('--profile-picture-bg', '#555555');
                document.documentElement.style.setProperty('--sidebar-button-hover', '#444444');
                document.documentElement.style.setProperty('--button-transparent-hover', '#444444');
                document.documentElement.style.setProperty('--success-color', 'limegreen');
                document.documentElement.style.setProperty('--warning-text', 'yellow');
                document.documentElement.style.setProperty('--error-text', 'red');
                document.documentElement.style.setProperty('--sidebar-text', 'white');
                document.documentElement.style.setProperty('--banner-button-bg', 'white');
                document.documentElement.style.setProperty('--note-seperator', '#444444');
                document.documentElement.style.setProperty('--sidebar-button-border', 'white');
                document.documentElement.style.setProperty('--modal-background', '#222222');
                document.documentElement.style.setProperty('--like-color', 'limegreen');
                document.documentElement.style.setProperty('--renote-color', 'yellow');
                document.documentElement.style.setProperty('--content-warning', 'rgba(0, 0, 0, 0.8)');
                document.documentElement.style.setProperty('--skeleton-start', '#333333');
                document.documentElement.style.setProperty('--skeleton-middle', '#444444');
                document.documentElement.style.setProperty('--skeleton-end', '#555555');
                document.documentElement.style.setProperty('--reply-background', '#404040');
                document.documentElement.style.setProperty('--reply-hovered-background', '#505050');
                document.documentElement.style.setProperty('--note-background', '#333333');
                if (currentMonth === 6 && getTheme.showPrideFlag === "Yes" || currentMonth === 6 && getTheme.showPrideFlag === undefined) {
                    document.getElementById("transsocialHeaderLogo").src = "/assets/imgs/PrideHeaderLogo.png";
                } else {
                    document.getElementById("transsocialHeaderLogo").src = "/assets/imgs/HighContrastThemeLogo.png";
                }
            } else if (getTheme.theme === "TransSocial Classic") {
                document.documentElement.style.setProperty('--background', '#ffb2a8');
                document.documentElement.style.setProperty('--main-color', '#ffb2a8');
                document.documentElement.style.setProperty('--main-color-darker', '#f0cfb6');
                document.documentElement.style.setProperty('--header-color', '#ffd9cb');
                document.documentElement.style.setProperty('--text', '#333');
                document.documentElement.style.setProperty('--text-half-transparent', 'rgba(51, 51, 51, 0.5)');
                document.documentElement.style.setProperty('--text-semi-transparent', 'rgba(51, 51, 51, 0.7)');
                document.documentElement.style.setProperty('--profile-picture-bg', '#f0cfb6');
                document.documentElement.style.setProperty('--sidebar-button-hover', '#ffe0d2');
                document.documentElement.style.setProperty('--button-transparent-hover', '#ffd9cb');
                document.documentElement.style.setProperty('--success-color', '#b3e8b3');
                document.documentElement.style.setProperty('--warning-text', '#e8b3b3');
                document.documentElement.style.setProperty('--error-text', '#e86d6d');
                document.documentElement.style.setProperty('--sidebar-text', '#333');
                document.documentElement.style.setProperty('--banner-button-bg', '#333');
                document.documentElement.style.setProperty('--note-seperator', '#ffd9cb');
                document.documentElement.style.setProperty('--sidebar-button-border', 'transparent');
                document.documentElement.style.setProperty('--modal-background', '#ffb2a8');
                document.documentElement.style.setProperty('--like-color', '#e86d6d');
                document.documentElement.style.setProperty('--renote-color', '#b3e8b3');
                document.documentElement.style.setProperty('--content-warning', 'rgba(255, 178, 168, 0.5)');
                document.documentElement.style.setProperty('--skeleton-start', '#ffe0d2');
                document.documentElement.style.setProperty('--skeleton-middle', '#ffd9cb');
                document.documentElement.style.setProperty('--skeleton-end', '#ffb2a8');
                document.documentElement.style.setProperty('--reply-background', '#ffe0d2');
                document.documentElement.style.setProperty('--reply-hovered-background', '#fff0e8');
                document.documentElement.style.setProperty('--note-background', '#ffd9cb');
                if (currentMonth === 6 && getTheme.showPrideFlag === "Yes" || currentMonth === 6 && getTheme.showPrideFlag === undefined) {
                    document.getElementById("transsocialHeaderLogo").src = "/assets/imgs/PrideHeaderLogo.png";
                } else {
                    document.getElementById("transsocialHeaderLogo").src = "/assets/imgs/TransSocialClassicThemeLogo.png";
                }
            } else if (getTheme.theme === "Midnight Purple") {
                document.documentElement.style.setProperty('--background', '#221e2b');
                document.documentElement.style.setProperty('--main-color', '#957DAD');
                document.documentElement.style.setProperty('--main-color-darker', '#786491');
                document.documentElement.style.setProperty('--header-color', '#2c2738');
                document.documentElement.style.setProperty('--text', '#e2e2e2');
                document.documentElement.style.setProperty('--text-half-transparent', 'rgba(226, 226, 226, 0.5)');
                document.documentElement.style.setProperty('--text-semi-transparent', 'rgba(226, 226, 226, 0.7)');
                document.documentElement.style.setProperty('--profile-picture-bg', '#3d384a');
                document.documentElement.style.setProperty('--sidebar-button-hover', '#383246');
                document.documentElement.style.setProperty('--button-transparent-hover', '#2c2738');
                document.documentElement.style.setProperty('--success-color', '#5eb95e');
                document.documentElement.style.setProperty('--warning-text', '#f7e28c');
                document.documentElement.style.setProperty('--error-text', '#f0766a');
                document.documentElement.style.setProperty('--sidebar-text', '#ddd');
                document.documentElement.style.setProperty('--banner-button-bg', '#443f54');
                document.documentElement.style.setProperty('--note-seperator', '#383246');
                document.documentElement.style.setProperty('--sidebar-button-border', 'transparent');
                document.documentElement.style.setProperty('--modal-background', '#2a2535');
                document.documentElement.style.setProperty('--like-color', '#d362a4');
                document.documentElement.style.setProperty('--renote-color', '#41d4a5');
                document.documentElement.style.setProperty('--content-warning', 'rgba(34, 30, 43, 0.6)');
                document.documentElement.style.setProperty('--skeleton-start', '#3d384a');
                document.documentElement.style.setProperty('--skeleton-middle', '#332e3e');
                document.documentElement.style.setProperty('--skeleton-end', '#282333');
                document.documentElement.style.setProperty('--reply-background', '#332e3e');
                document.documentElement.style.setProperty('--reply-hovered-background', '#3d384a');
                document.documentElement.style.setProperty('--note-background', '#2c2738');
                if (currentMonth === 6 && getTheme.showPrideFlag === "Yes" || currentMonth === 6 && getTheme.showPrideFlag === undefined) {
                    document.getElementById("transsocialHeaderLogo").src = "/assets/imgs/PrideHeaderLogo.png";
                } else {
                    document.getElementById("transsocialHeaderLogo").src = "/assets/imgs/MidnightPurpleThemeLogo.png";
                }
            } else if (getTheme.theme === "Darker") {
                document.documentElement.style.setProperty('--background', '#171717');
                document.documentElement.style.setProperty('--main-color', '#ff869a');
                document.documentElement.style.setProperty('--main-color-darker', '#e1788a');
                document.documentElement.style.setProperty('--header-color', '#202020');
                document.documentElement.style.setProperty('--text', '#f0f0f0');
                document.documentElement.style.setProperty('--text-half-transparent', 'rgba(240, 240, 240, 0.5)');
                document.documentElement.style.setProperty('--text-semi-transparent', 'rgba(240, 240, 240, 0.7)');
                document.documentElement.style.setProperty('--profile-picture-bg', '#2d2d2d');
                document.documentElement.style.setProperty('--sidebar-button-hover', '#303030');
                document.documentElement.style.setProperty('--button-transparent-hover', '#202020');
                document.documentElement.style.setProperty('--success-color', '#59f275');
                document.documentElement.style.setProperty('--warning-text', '#f2db59');
                document.documentElement.style.setProperty('--error-text', '#f27a7a');
                document.documentElement.style.setProperty('--sidebar-text', '#ddd');
                document.documentElement.style.setProperty('--banner-button-bg', '#333');
                document.documentElement.style.setProperty('--note-seperator', '#2d2d2d');
                document.documentElement.style.setProperty('--sidebar-button-border', 'transparent');
                document.documentElement.style.setProperty('--modal-background', '#1a1a1a');
                document.documentElement.style.setProperty('--like-color', '#ff6378');
                document.documentElement.style.setProperty('--renote-color', '#2ddbff');
                document.documentElement.style.setProperty('--content-warning', 'rgba(23, 23, 23, 0.6)');
                document.documentElement.style.setProperty('--skeleton-start', '#333333');
                document.documentElement.style.setProperty('--skeleton-middle', '#282828');
                document.documentElement.style.setProperty('--skeleton-end', '#202020');
                document.documentElement.style.setProperty('--reply-background', '#282828');
                document.documentElement.style.setProperty('--reply-hovered-background', '#333333');
                document.documentElement.style.setProperty('--note-background', '#202020');
            } else if (getTheme.theme === "Custom") {
                document.documentElement.style.setProperty('--background', getTheme.themeColors.background);
                document.documentElement.style.setProperty('--main-color', getTheme.themeColors.mainColor);
                document.documentElement.style.setProperty('--main-color-darker', getTheme.themeColors.mainColorDarker);
                document.documentElement.style.setProperty('--header-color', getTheme.themeColors.headerColor);
                document.documentElement.style.setProperty('--text', getTheme.themeColors.text);
                document.documentElement.style.setProperty('--text-half-transparent', getTheme.themeColors.text);
                document.documentElement.style.setProperty('--text-semi-transparent', getTheme.themeColors.text);
                document.documentElement.style.setProperty('--sidebar-button-hover', getTheme.themeColors.sidebarButtonHover);
                document.documentElement.style.setProperty('--button-transparent-hover', getTheme.themeColors.buttonTransparentHover);
                document.documentElement.style.setProperty('--success-color', getTheme.themeColors.success);
                document.documentElement.style.setProperty('--warning-text', getTheme.themeColors.warning);
                document.documentElement.style.setProperty('--error-text', getTheme.themeColors.error);
                document.documentElement.style.setProperty('--sidebar-text', getTheme.themeColors.sidebarText);
                document.documentElement.style.setProperty('--note-seperator', getTheme.themeColors.noteSeperator);
                document.documentElement.style.setProperty('--like-color', getTheme.themeColors.liked);
                document.documentElement.style.setProperty('--renote-color', getTheme.themeColors.renoted);
                document.documentElement.style.setProperty('--reply-background', getTheme.themeColors.replyBackground);
                document.documentElement.style.setProperty('--reply-hovered-background', getTheme.themeColors.replyHoveredBackground);
                document.documentElement.style.setProperty('--note-background', getTheme.themeColors.noteBackground);
            }
        })

        emailVer.once("value")
            .then(function(snapshot) {
                const email = snapshot.exists();

                if (email === true) {
                    loader.classList.add("loader-hidden");

                    loader.addEventListener("transitioned", () => {
                        document.body.removeChild("loader");
                    })
                } else if (email === false) {
                    loader.classList.add("loader-hidden");

                    loader.addEventListener("transitioned", () => {
                        document.body.removeChild("loader");
                    })
                }
            })
    } else {
        const loader = document.querySelector('.loader');

        loader.classList.add("loader-hidden");

        loader.addEventListener("transitioned", () => {
            document.body.removeChild("loader");
        })
    }
})


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
