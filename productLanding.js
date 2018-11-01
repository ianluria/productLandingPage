

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

        while (temp.firstChild) {
            temp.removeChild(temp.firstChild);
        }

    } else {
        temp.style.left = "0vw";

        if (temp.childElementCount === 0) {
            const image2 = image.cloneNode();
            image2.classList.remove("surfaceImage");
            image2.id = "enlargedImage";
            image2.style.maxHeight = "80vh";
            addPadding(image2);
            temp.appendChild(image2);

            zoomedImage = document.createElement("div");
            zoomedImage.id = "zoomedImage";

            image2.onmouseover = (event) => {
                zoomedImage.style.opacity = 1;
            }
            temp.appendChild(zoomedImage);


            image2.onclick = (event2) => {
                console.log(event2);
                console.log(document.getElementById("zoomedImage").style);

                //enlargeImageOnClick; //check this
            }
            addZoomer(image2);
        }
    }
}

//may be able to use pure css
function addPadding(element) {

    // const paddingX = element.width * 0.1,
    //     paddingY = element.height * 0.1;

    const paddingX = "10vw",
        paddingY = "10vh";


    console.log(paddingX, paddingY);
    element.style.paddingLeft = `${paddingX}`;
    element.style.paddingRight = `${paddingX}`;
    element.style.paddingTop = `${paddingY}`;
    element.style.paddingBottom = `${paddingY}`;
}

function addZoomer(element) {

    element.addEventListener('mousemove', function (e) {
        //console.log(e.pageX, e.pageY);
        const original = document.getElementById('enlargedImage'),
            magnified = document.getElementById('zoomedImage'),
            style = magnified.style,
            imgWidth = original.width,
            imgHeight = original.height;
        // x = e.offsetX,
        // y = e.offsetY,
        // xperc = ((x / imgWidth) * 100),
        // yperc = ((y / imgHeight) * 100);


        const x = e.offsetX - ((e.target.clientWidth - imgWidth) / 2),
            y = e.offsetY - ((e.target.clientHeight - imgHeight) / 2);

        let xperc = ((x / imgWidth) * 100),
            yperc = ((y / imgHeight) * 100);

       


        // let ratioX = imgWidth / e.target.clientWidth;
        // console.log("ratio", ratioX);
        // let testX = ((((e.offsetX + (e.offsetX*ratioX))/imgWidth))*100);

        // console.log("testx", testX);

        // x = e.offsetX*((original.width/e.clientWidth)*100);
        // y = e.offsetY*((original.height/e.clientHeight)*100);

        if (x >= (.01 * imgWidth)) {
            xperc += (.15 * xperc); //.15
        };//lets user scroll past right edge of image

        if (y >= (.01 * imgHeight)) {
            yperc += (.15 * yperc); //.15
        };//lets user scroll past bottom edge of image

        console.log("x", x, "y", y, "xperc", xperc, "yperc", yperc);


        style.backgroundPositionX = (xperc - 9) + '%'; //-9
        style.backgroundPositionY = (yperc - 9) + '%'; //-9

        style.left = e.clientX - 180 + 'px';
        style.top = e.clientY - 180 + 'px';

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



