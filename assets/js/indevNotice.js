const versionNotice = document.createElement("p");
versionNotice.className = "versionNotice";

// add text
versionNotice.innerHTML = `TransSocial is currently in the ${transsocialReleaseVersion} stage (version ${transsocialVersion}). A lot of features are missing or are in development and will be added with updates. <a href="/indev">Learn more</a>.`;

// add 
document.getElementById("noteFilter").appendChild(versionNotice);