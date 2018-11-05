

//fix mobile layout for onmouseover zooming --disable
//completely different code for mobile and for full 
//image flipping on hover
//image zoom

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

if (window.screen.availWidth > 600) {
    [...document.getElementsByClassName("rearFlipImage")].forEach(rearImage => rearImage.onclick = enlargeImageOnClick);
}

function enlargeImageOnClick(event) {
    const image = event.target;
    //const temp = document.getElementById("temporaryImageContainer");
    const temp = document.createElement("div");
    temp.id = "temporaryImageContainer";

    if (temp.style.left === "0vw") {

        temp.style.left = "-999em";

        while (temp.firstChild) {
            temp.removeChild(temp.firstChild);
        }
    } else {
        temp.style.left = "0vw";

        if (temp.childElementCount === 0) {
            createImageZooming(image, temp);
        }
    }
}

function createImageZooming(image, temporaryContainerDiv) {

    const image2 = image.cloneNode();
    image2.classList.remove("surfaceImage");
    image2.id = "enlargedImage";
    image2.style.maxHeight = "80vh";
    temporaryContainerDiv.appendChild(image2);

    zoomedImage = document.createElement("div");
    zoomedImage.id = "zoomedImage";
    zoomedImage.style.background = `url(${image2.src}) no-repeat #FFF`;

    //

    addZoomer(image2);

    temporaryContainerDiv.appendChild(zoomedImage);


    image2.onclick = (event2) => {

        if (zoomedImage.style.opacity === "1") {
            zoomedImage.style.opacity = "0";
        } else {
            enlargeImageOnClick(event2)
        }
    }
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



