

textLinkClickHandler(document.getElementsByClassName("nav-link"));

textLinkClickHandler(document.getElementsByClassName("welcomeLink"));

document.getElementById("cloroxBack").onclick = enlargeImageOnClick;



// function getChildElementByClassName(listOfChildren, className) {

//     const arrayOfMatchingChildren = [...listOfChildren].filter(child => [...child.classList].includes(className));

//     return (arrayOfMatchingChildren.length === 1 ? arrayOfMatchingChildren[0] : arrayOfMatchingChildren);

// }




function enlargeImageOnClick(event) {
    const image = event.target;

    const temp = document.getElementById("temporaryImageContainer");

    if (temp.style.left === "0vw") {

        temp.style.left = "-999em";
    } else {
        temp.style.left = "0vw";

        if (temp.childElementCount === 0) {
            const image2 = image.cloneNode();
            image2.id = "enlargedImage";
            image2.style.maxHeight = "80vh";

            temp.appendChild(image2);

            zoomedImage = document.createElement("div");
            zoomedImage.id = "zoomedImage";

            temp.appendChild(zoomedImage);

            image2.onclick = enlargeImageOnClick; //check this

            addZoomer(image2);
        }
    }
}

function addZoomer(element) {

    element.addEventListener('mousemove', function (e) {

        // console.log("entered listener");
        console.log(e);

        let original = document.getElementById('enlargedImage'),
            magnified = document.getElementById('zoomedImage'),
            style = magnified.style,
            x = e.offsetX,
            y = e.offsetY,
            imgWidth = original.width,
            imgHeight = original.height,
            xperc = ((x / imgWidth) * 100),
            yperc = ((y / imgHeight) * 100);

        //console.log("x", x, "y", y, "xperc", xperc, "yperc", yperc);


        if (x > (.01 * imgWidth)) {
            xperc += (.15 * xperc); //.15
        };//lets user scroll past right edge of image

        if (y >= (.01 * imgHeight)) {
            yperc += (.15 * yperc); //.15
        };//lets user scroll past bottom edge of image

        style.backgroundPositionX = (xperc - 9) + '%'; //-9
        style.backgroundPositionY = (yperc - 9) + '%'; //-9
        /*
                style.left = (e.clientX-(x/2) ) + 'px'; //-180
                style.top = (e.clientY-(y/2)) + 'px'; //-180
        
        */

        style.left = (e.clientX-180) + 'px'; 
        style.top = e.clientY-180 + 'px';

        console.log("y", (e.clientY / e.target.parentNode.offsetHeight) * 100);

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



