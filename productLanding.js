
document.body.onscroll = stickyHeaderBar;

textLinkClickHandler(document.getElementsByClassName('nav-link'));
textLinkClickHandler(document.getElementsByClassName('welcomeLink'));

flipBoxRotation();

window.onresize = () => {
  flipBoxRotation();
};

addImageEnhancements();

function stickyHeaderBar() {
  const headerElement = document.getElementById('header');
  const headerWrapper = document.getElementById("headerWrapper");

  if (window.scrollY >= headerWrapper.offsetTop) {
    headerElement.style.position = 'fixed';
  } else if (window.scrollY < headerWrapper.offsetTop) {
    headerElement.style.position = 'static';
  }
}

function textLinkClickHandler(textLinkHTMLcollection) {
  [...textLinkHTMLcollection].forEach((link) => {
    link.onclick = onClickHandler;
  });
}

function onClickHandler(event) {
  const regEx = new RegExp(/[a-z]+/);

  //Class name in the 1 index must be in the following format to allow targeting of internal link
  //lower case letters equalling "description", "video", or "request"
  //followed by "Link"
  let targetString = regEx.exec(event.target.classList[1])[0];

  targetString = targetString.slice(0, 1).toUpperCase() + targetString.slice(1);

  document.getElementById(`product${targetString}`).scrollIntoView({ block: 'start', behavior: 'smooth' });
}

function flipBoxRotation() {
  [...document.getElementsByClassName('flipBox')].forEach((flipBox) => {
    const innerFlipBox = flipBox.getElementsByClassName('flipBoxInner')[0];
    const thisDescriptionBlock = getParentByClassFromChild(flipBox, 'descriptionBlock');

    // image will flip on click for mobile
    if (window.screen.availWidth < 600) {
      // remove image hover functionality
      flipBox.onmouseover = null;
      flipBox.onmouseout = null;
      innerFlipBox.style.transform = null;

      if ([...thisDescriptionBlock.children].some(element => element.classList.contains('rotateIcon')) === false) {
        const rotateIcon = document.createElement('img');
        rotateIcon.classList.add('rotateIcon');
        rotateIcon.src = 'rotating-circular-arrow.png';
        thisDescriptionBlock.insertBefore(rotateIcon, thisDescriptionBlock.getElementsByTagName('p')[0]);

        let counter = 0;
        rotateIcon.onclick = () => {
          counter += 1;

          if (innerFlipBox != null) {
            if (counter % 2 !== 0) {
              innerFlipBox.style.transform = 'rotateY(180deg)';
            } else {
              innerFlipBox.style.transform = 'rotateY(0deg)';
            }
          }
        };
      }
    } else {
      // remove rotate icon for large screens
      if ([...thisDescriptionBlock.children].some(element => element.classList.contains('rotateIcon'))) {
        thisDescriptionBlock.removeChild(thisDescriptionBlock.getElementsByClassName('rotateIcon')[0]);
      }

      // image will flip on hover for full screen
      flipBox.onmouseover = () => {
        innerFlipBox.style.transform = 'rotateY(180deg)';
      };

      flipBox.onmouseout = () => {
        innerFlipBox.style.transform = 'rotateY(0deg)';
      };
    }
  });
}

function getParentByClassFromChild(child, className) {
  let parent = child.parentNode;
  while (parent != null && parent.classList.length > 0) {
    if (parent.classList.contains(className)) {
      return parent;
    }
    parent = parent.parentNode;
  }
  return null;
}

function addImageEnhancements() {
  [...document.getElementsByClassName('surfaceImage')].forEach(image => image.onclick = enlargeImageOnClick);
}

function enlargeImageOnClick(event) {
  const image = event.target;

  const temp = document.createElement('div');
  temp.id = 'temporaryImageContainer';

  createImageZooming(image, temp);

  document.getElementById('productDescription').appendChild(temp);
}

function createImageZooming(image, temporaryContainerDiv) {
  const image2 = image.cloneNode();
  image2.classList.remove('surfaceImage');
  image2.id = 'enlargedImage';
  temporaryContainerDiv.appendChild(image2);

  if (window.screen.availWidth < 600) {
    const closingX = document.createElement('div');
    closingX.id = 'closingX';
    closingX.innerText = 'X';
    temporaryContainerDiv.appendChild(closingX);
  }

  const zoomedImage = document.createElement('div');
  zoomedImage.id = 'zoomedImage';
  zoomedImage.style.background = `url(${image2.src}) no-repeat #FFF`;

  addZoomer(image2);

  temporaryContainerDiv.appendChild(zoomedImage);

  temporaryContainerDiv.onclick = (event) => {
    if (window.screen.availWidth >= 600) {
      if (zoomedImage.style.opacity === '1') {
        zoomedImage.style.opacity = '0';
      } else {
        deleteChildNodes(document.getElementById('temporaryImageContainer'));
        document.getElementById('productDescription').removeChild(temporaryContainerDiv);
      }
    } else if (event.target === document.getElementById('closingX')) {
      deleteChildNodes(document.getElementById('temporaryImageContainer'));
      document.getElementById('productDescription').removeChild(temporaryContainerDiv);
    }
  };
}

function addZoomer(element) {
  element.addEventListener('mousemove', (event) => {
    const original = document.getElementById('enlargedImage');
    const magnified = document.getElementById('zoomedImage');
    const zoomedStyle = magnified.style;
    const imgWidth = original.width;
    const imgHeight = original.height;

    magnified.style.opacity = 1;

    const x = event.offsetX - ((event.target.clientWidth - imgWidth) / 2);
    const y = event.offsetY - ((event.target.clientHeight - imgHeight) / 2);

    let xperc = ((x / imgWidth) * 100);
    let yperc = ((y / imgHeight) * 100);

    if (x >= (0.01 * imgWidth)) {
      xperc += (0.15 * xperc); // .15
    }// lets user scroll past right edge of image

    if (y >= (0.01 * imgHeight)) {
      yperc += (0.15 * yperc); // .15
    }// lets user scroll past bottom edge of image

    zoomedStyle.backgroundPositionX = `${xperc - 9}%`;
    zoomedStyle.backgroundPositionY = `${yperc - 9}%`;

    zoomedStyle.left = `${event.clientX - 180}px`;
    zoomedStyle.top = `${event.clientY - 180}px`;
  });
}

function deleteChildNodes(element) {
  [...element.children].forEach((child) => {
    if (child.hasChildNodes()) {
      deleteChildNodes(child);
    } else {
      element.removeChild(child);
    }
  });
}

// YouTube code
const tag = document.createElement('script');

tag.src = 'https://www.youtube.com/iframe_api';
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
      modestbranding: '0',
      origin: 'http://127.0.0.1:8080/productLanding.html',
    },
    events: {
      onReady: onPlayerReady,
    },
  });
}

function onPlayerReady(event) {
  event.target.mute();
}