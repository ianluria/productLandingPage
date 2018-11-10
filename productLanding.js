

//fix mobile layout for onmouseover zooming --disable

//image flipping on hover


//header scrolling
const headerElement = document.getElementById("header");

const headerInitialTop = headerElement.offsetTop;
document.body.onscroll = (event) => {
    if (window.scrollY >= headerInitialTop) {
        headerElement.style.position = "fixed";
    } else {
        headerElement.style.position = "static";
    }
}

textLinkClickHandler(document.getElementsByClassName("nav-link"));

textLinkClickHandler(document.getElementsByClassName("welcomeLink"));

//console.log(window.screen.availWidth);

flipBoxRotation();
addImageEnhancements();

// window.onresize = () => {
//     if (window.screen.availWidth < 600) {
//         flipBoxRotation();
//     } else {



//     }
// }


function flipBoxRotation() {

    [...document.getElementsByClassName("flipBox")].forEach(flipBox => {

        const innerFlipBox = getChildByClassFromParent(flipBox, "flipBoxInner");
        //image will flip on click for mobile
        if (window.screen.availWidth < 600) {
            let counter = 0;
            flipBox.onclick = (event) => {
                counter++;

                if (innerFlipBox != null) {
                    if (counter % 2 != 0) {
                        innerFlipBox.style.transform = "rotateY(180deg)";
                    } else {
                        innerFlipBox.style.transform = "rotateY(0deg)";
                    }
                }
            }
        } else {
            //image will flip on hover for full screen
            flipBox.onmouseover = (event) => {
                innerFlipBox.style.transform = "rotateY(180deg)";
            }

            flipBox.onmouseout = (event) => {
                innerFlipBox.style.transform = "rotateY(0deg)";
            }
        }
    });
}

//may not need
// function getParentByClassFromChild(child, className) {

//     let parent = child;
//     while (parent != null && parent.classList.length > 0) {

//         if (parent.classList.contains(className)) {
//             return parent;
//         } else {
//             parent = parent.parentNode;
//         }
//     }
//     return null;
// }

function getChildByClassFromParent(parent, className) {

    let child = parent;
    while (child != null) {
        if (child.classList.length > 0) {
            if (child.classList.contains(className)) {
                return child;
            }
        }
        child = child.firstElementChild;

    }
    return null;
}

// function getOppositeFlipSurface(flipSurface) {
//     let thisSide, oppositeSide;
//     if (flipSurface.classList.contains("flipBoxFront")) {
//         thisSide = "front";
//         oppositeSide = "back";
//     } else if (flipSurface.classList.contains("flipBoxBack")) {
//         thisSide = "back";
//         oppositeSide = "front";
//     }


//     const parent = flipSurface.parent;

//     return [...parent.children].find(element => element.classList.includes(oppositeSide));

// }



function addImageEnhancements() {

    [...document.getElementsByClassName("rearFlipImage")].forEach(rearImage => rearImage.onclick = enlargeImageOnClick);
}

function enlargeImageOnClick(event) {
    const image = event.target;

    const temp = document.createElement("div");
    temp.id = "temporaryImageContainer";

    createImageZooming(image, temp);

    document.getElementById("productDescription").appendChild(temp);
}

function createImageZooming(image, temporaryContainerDiv) {

    const image2 = image.cloneNode();
    image2.classList.remove("surfaceImage", "rearFlipImage");
    image2.id = "enlargedImage";
    temporaryContainerDiv.appendChild(image2);

    if (window.screen.availWidth < 600) {
        const closingX = document.createElement("div");
        closingX.id = "closingX";
        closingX.innerText = "X";
        temporaryContainerDiv.appendChild(closingX);
    }

    zoomedImage = document.createElement("div");
    zoomedImage.id = "zoomedImage";
    zoomedImage.style.background = `url(${image2.src}) no-repeat #FFF`;

    addZoomer(image2);

    temporaryContainerDiv.appendChild(zoomedImage);

    temporaryContainerDiv.onclick = (event) => {

        if (window.screen.availWidth >= 600) {
            if (zoomedImage.style.opacity === "1") {
                zoomedImage.style.opacity = "0";
            } else {
                deleteChildNodes(document.getElementById("temporaryImageContainer"));
                document.getElementById("productDescription").removeChild(temporaryContainerDiv);
            }
        } else if (event.target === document.getElementById("closingX")) {
            deleteChildNodes(document.getElementById("temporaryImageContainer"));
            document.getElementById("productDescription").removeChild(temporaryContainerDiv);
        }

        //    if ( zoomedImage.style.opacity = "0") {
        //         console.log("else click");
        //         temporaryContainerDiv.removeChild(image2);
        //         temporaryContainerDiv.removeChild(zoomedImage);
        //         document.getElementById("productDescription").removeChild(temporaryContainerDiv);
        //     }
    }
}

// function removeElementsFromDOM(arrayOfElements) {

//     arrayOfElements.forEach(element => {

//         const parent = element.parentNode;
//         parent.removeChild(element);

//     });
// }


function deleteChildNodes(element) {

    [...element.children].forEach(child => {

        if (child.hasChildNodes()) {
            deleteChildNodes(child);
        } else {
            element.removeChild(child);
        }

    });
}


function addZoomer(element) {

    element.addEventListener('mousemove', function (event) {

        const original = document.getElementById('enlargedImage'),
            magnified = document.getElementById('zoomedImage'),
            style = magnified.style,
            imgWidth = original.width,
            imgHeight = original.height;

        magnified.style.opacity = 1;

        const x = event.offsetX - ((event.target.clientWidth - imgWidth) / 2),
            y = event.offsetY - ((event.target.clientHeight - imgHeight) / 2);

        let xperc = ((x / imgWidth) * 100),
            yperc = ((y / imgHeight) * 100);

        if (x >= (.01 * imgWidth)) {
            xperc += (.15 * xperc); //.15
        };//lets user scroll past right edge of image

        if (y >= (.01 * imgHeight)) {
            yperc += (.15 * yperc); //.15
        };//lets user scroll past bottom edge of image

        // console.log("x", x, "y", y, "xperc", xperc, "yperc", yperc);

        style.backgroundPositionX = (xperc - 9) + '%';
        style.backgroundPositionY = (yperc - 9) + '%';

        style.left = event.clientX - 180 + 'px';
        style.top = event.clientY - 180 + 'px';
    });
};

//youtube code
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


//scroll link code
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



