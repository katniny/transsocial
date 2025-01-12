// get the current url
// while not going to serve the same purpose anymore,
// since we can control what scripts are loaded,
// it'll help still
const currentURL = window.location.href;
const pageURL = new URL(currentURL);
const pathName = pageURL.pathname;