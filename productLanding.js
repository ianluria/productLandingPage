
addNavLinks(["Description", "Video", "Request"]);

function addNavLinks(arrayOfTitles) {

    arrayOfTitles.forEach(title => {
        const newNavLink = document.createElement("span");
        newNavLink.classList.add("nav-link");
        newNavLink.appendChild(document.createTextNode(title));
        newNavLink.onclick = onClickHandler;
        document.getElementById("header").appendChild(newNavLink);
    });
}

function onClickHandler(event) {
    document.getElementById("product" + event.target.innerText).scrollIntoView({ block: "start", behavior: "smooth" });
}

const youTubePlayer = document.getElementById("youTubePlayer");

console.log(youTubePlayer);

