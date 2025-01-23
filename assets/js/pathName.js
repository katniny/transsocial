// get the current url
// while not going to serve the same purpose anymore,
// since we can control what scripts are loaded,
// it'll help still
let currentURL = null;
let pageURL = null;
let pathName = null;

const pathNameResolved = new Promise((resolve) => {
   currentURL = window.location.href;
   pageURL = new URL(currentURL);
   pathName = pageURL.pathname;
   resolve();
});