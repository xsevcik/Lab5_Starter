// expose.js

window.addEventListener('DOMContentLoaded', init);
var listChoice;
var volumeSlider;
var playButton;
var imageElement;
var soundElement;
var volumeIcon;
var playConfetti = false;
const jsConfetti = new JSConfetti();

function init() {
  listChoice = document.getElementById("horn-select");
  listChoice.addEventListener('change', updateSelection);

  volumeSlider = document.getElementsByName("volume");
  volumeSlider[0].addEventListener('input', updateVolume);

  playButton = document.querySelector("section > button");
  playButton.addEventListener('click', playSound);

  imageElement = document.querySelector("section > img");
  soundElement = document.querySelector("section > audio");
  volumeIcon = document.querySelector("div > img")
}

function updateSelection() {
  switch(listChoice.value) {
    case "air-horn":
      imageElement.src = "assets/images/air-horn.svg";
      imageElement.alt = "Air Horn";
      soundElement.src = "assets/audio/air-horn.mp3";
      playConfetti = false;
      break;
    case "car-horn":
      imageElement.src = "assets/images/car-horn.svg";
      imageElement.alt = "Car Horn";
      soundElement.src = "assets/audio/car-horn.mp3";
      playConfetti = false;
      break;
    case "party-horn":
      imageElement.src = "assets/images/party-horn.svg";
      imageElement.alt = "Party Horn!";
      soundElement.src = "assets/audio/party-horn.mp3";
      playConfetti = true;
      break;
  }
}

function updateVolume() {
  if (volumeSlider[0].value == 0) {
    volumeIcon.src = "assets/icons/volume-level-0.svg";
  } else if (volumeSlider[0].value < 33) {
    volumeIcon.src = "assets/icons/volume-level-1.svg";
  } else if (volumeSlider[0].value < 67) {
    volumeIcon.src = "assets/icons/volume-level-2.svg";
  } else {
    volumeIcon.src = "assets/icons/volume-level-3.svg";
  }
  soundElement.volume = volumeSlider[0].value / 100;
}

function playSound() {
  soundElement.play();
  if (playConfetti) {
    jsConfetti.addConfetti();
  }
}