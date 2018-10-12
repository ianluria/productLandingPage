
addNavLinks(["Description", "Video", "Request"]);

const tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youTubePlayer', {
        height: '390',
        width: '640',
        videoId: 't1nRXlsUKFs',
        playerVars: {
            controls: '0',
            modestbranding: "0",
            origin: "http://127.0.0.1:8080/productLanding.html"
        },
        events: {
            'onReady': onPlayerReady,
        }
    });
}

function onPlayerReady(event) {
    event.target.mute();
}

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


