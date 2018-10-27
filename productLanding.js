

textLinkClickHandler(document.getElementsByClassName("nav-link"));

textLinkClickHandler(document.getElementsByClassName("welcomeLink"));

document.getElementById("cloroxBack").onclick = enlargeImageOnClick;



// function getChildElementByClassName(listOfChildren, className) {

//     const arrayOfMatchingChildren = [...listOfChildren].filter(child => [...child.classList].includes(className));

//     return (arrayOfMatchingChildren.length === 1 ? arrayOfMatchingChildren[0] : arrayOfMatchingChildren);

// }

function enlargeImageOnClick(event) {
    image = event.target;
    console.log("click");


    const temp = document.getElementById("temporaryImageContainer");
    console.log(1, temp.style.left);
    if (temp.style.left === "0vw") {
        console.log("greater than or equal to zero");
        temp.style.left = "-999em";
    } else {
        temp.style.left = "0vw";
        console.log("less than zero");
        if (temp.childElementCount === 0) {
            const image2 = image.cloneNode();

            image2.style.maxHeight = "80vh";

            temp.appendChild(image2);

            image2.onclick = enlargeImageOnClick;
        }
    }

}



const tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youTubePlayer', {
        height: '390',
        width: '640',
        // height: "100%",
        // width: "100%",
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



function textLinkClickHandler(textLinkHTMLcollection) {
    [...textLinkHTMLcollection].forEach(link => {
        link.onclick = onClickHandler;
    });
}

function onClickHandler(event) {

    const regEx = new RegExp(/[a-z]+/);

    let targetString = regEx.exec(event.target.classList[1])[0];

    targetString = targetString.slice(0, 1).toUpperCase() + targetString.slice(1);

    document.getElementById("product" + targetString).scrollIntoView({ block: "start", behavior: "smooth" });
}



