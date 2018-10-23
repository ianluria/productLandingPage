//resize flipBox on resize

textLinkClickHandler(document.getElementsByClassName("nav-link"));

textLinkClickHandler(document.getElementsByClassName("welcomeLink"));

//adjustFlipBoxForImageHeight(document.getElementsByClassName("flipBox"));

//const resizeAdjust = adjustFlipBoxForImageHeight(document.getElementsByClassName("flipBox"));

// window.onresize = () => adjustFlipBoxForImageHeight(adjustFlipBoxForImageHeight(document.getElementsByClassName("flipBox")));

// function adjustFlipBoxForImageHeight(collectionOfFlipBoxes) {

//     console.log("running");

//     [...collectionOfFlipBoxes].forEach((flipBox, index) => {

//         flipBox.id = "flipBox" + index;

//         const flipBoxInner = getChildElementByClassName(flipBox.children, "flipBoxInner");

//         let arrayOfFlipSurfaces = new Array(0);

//         arrayOfFlipSurfaces.push(getChildElementByClassName(flipBoxInner.children, "flipBoxFront"));

//         arrayOfFlipSurfaces = arrayOfFlipSurfaces.concat(getChildElementByClassName(flipBoxInner.children, "flipBoxBack"));

//         const arrayOfImageHeights = arrayOfFlipSurfaces.map(surface => getChildElementByClassName(surface.children, "surfaceImage").height);

//         const maxHeight = arrayOfImageHeights.reduce(getMaxHeight, 0);

//         document.getElementById(flipBox.id).setAttribute("style", "min-height: " + maxHeight + "px;");
//     });
// }

// function getMaxHeight(maxHeight, currentHeight) {

//     return (currentHeight > maxHeight ? currentHeight : maxHeight);
// }


// function getChildElementByClassName(listOfChildren, className) {

//     const arrayOfMatchingChildren = [...listOfChildren].filter(child => [...child.classList].includes(className));

//     return (arrayOfMatchingChildren.length === 1 ? arrayOfMatchingChildren[0] : arrayOfMatchingChildren);

// }




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



