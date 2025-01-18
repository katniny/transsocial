// create transsocialAccounts
const policiesSide = document.createElement("div");
policiesSide.className = "policies";

// set transsocialAccounts html
policiesSide.innerHTML = `
   <a href="/policies/terms">Terms of Service</a>, 
   <a href="/policies/privacy">Privacy Policy</a>, 
   <a href="/policies/child-safety">Child Safety</a>, 
   <a href="/policies/cookies">Cookies</a>, 
   <a href="/policies/copyright">Copyright</a>, 
   <a href="/policies/guidelines">Community Guidelines</a> 
`;

document.body.appendChild(policiesSide);