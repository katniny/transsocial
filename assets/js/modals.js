// Enchanted Modal
function considerSupportingModal() {
    const modal = document.getElementById("considerSupporting");

    modal.showModal();
}

// External Link Modal + Verified Links
function externalLink() {

}

function externalLinkPatreon() {
    const modal = document.getElementById("externalLink");
    const verified = document.getElementById("isSiteSafe");
    const link = document.getElementById("siteLocation_Modal");
    const location = document.getElementById("linkLocation");

    modal.showModal();
    link.href = 'https://patreon.com/katniny';
    link.target = "_blank";
    location.innerHTML = "Leaving TransSocial to patreon.com"
}