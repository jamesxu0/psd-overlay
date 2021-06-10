var PSD = require("psd");
console.log(PSD);
console.log(PSD.fromURL);

document.body.style.zoom = "70%";

const videoInput = document.querySelector("#videoInput");
const psdInput = document.querySelector("#psdInput");
const videoSource = document.querySelector("source");
const video = document.querySelector("video");
const overlay = document.querySelector("#overlay");
const overlayButtons = document.querySelector("#overlayButtons");
let overlayCount = 1;
let lastOverlay = null;
let currentTop = 167;

videoInput.onchange = (event) => {
  videoSource.src = URL.createObjectURL(event.target.files[0]);
  video.load();
};

psdInput.onchange = async (event) => {
  if (lastOverlay) {
    overlay.removeChild(lastOverlay);
  }
  const psd = await PSD.fromURL(URL.createObjectURL(event.target.files[0]));
  const png = psd.image.toPng();
  lastOverlay = png;
  overlay.appendChild(png);
  const button = document.createElement("button");
  button.classList.add("overlayButton");
  button.textContent = "Overlay " + overlayCount;
  button.onclick = () => {
    console.log("hi");
    if (lastOverlay) {
      overlay.removeChild(lastOverlay);
    }
    console.log(png);
    overlay.appendChild(png);
    lastOverlay = png;
  };
  overlayButtons.appendChild(button);
  overlayCount++;
};

document.onkeydown = function (e) {
  switch (e.keyCode) {
    case 38:
      str = "Up Key pressed!";
      currentTop--;
      overlay.style.top = currentTop + "px";
      break;
    case 40:
      str = "Down Key pressed!";
      currentTop++;
      overlay.style.top = currentTop + "px";
      break;
  }
};
