


function addNavLinks(){
    const navBar = document.getElementById("nav-bar");

    navLinkArray = [];
    for (let i = 0; i < 3; i++){
        const newNavLink = document.createElement("span");
        newNavLink.classList.add("nav-link");
        navLinkArray.push(newNavLink);
    }

    navLinkArray[0].appendChild(document.createTextNode("Description"));
    navLinkArray[1].appendChild(document.createTextNode("Video"));
    navLinkArray[2].appendChild(document.createTextNode("Request"));

    navLinkArray.forEach(element => {
        navBar.appendChild(element);
    });

}

addNavLinks();

