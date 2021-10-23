// explore.js

window.addEventListener('DOMContentLoaded', init);
var voiceList;
var voices = [];
var synth;
var talkButton;
var textBox;
var faceImg;
var faceUpdateInterval;
function init() {
  synth = window.speechSynthesis;
  voiceList = document.getElementById("voice-select");
  talkButton = document.querySelector("section > button");
  textBox = document.getElementById("text-to-speak");
  faceImg = document.querySelector("section > img");
  synth.addEventListener('voiceschanged', getVoices);
  faceUpdateInterval = setInterval(updateFace, 0);
  talkButton.addEventListener('click', speakText);
}
function getVoices() {
  voices = synth.getVoices();
  for (var i = 0; i < voices.length; i++) {
    let option = document.createElement("option");
    option.textContent = voices[i].name + " (" + voices[i].lang + ')';

    if (voices[i].default) {
      option.textContent += " --DEFAULT";
    }
    option.setAttribute("data-lang", voices[i].lang)
    option.setAttribute("data-name", voices[i].name)
    voiceList.appendChild(option);
  }
}

function speakText() {
  var utterance = new SpeechSynthesisUtterance(textBox.value);
  var selectedVoice = voiceList.selectedOptions[0].getAttribute('data-name');
  for (var i = 0; i < voices.length; i++) {
    if (voices[i].name == selectedVoice) {
      utterance.voice = voices[i];
    }
  }
  
  synth.speak(utterance);
}

function updateFace() {
  if (synth.speaking) {
    faceImg.src = "assets/images/smiling-open.png";
  }
  else {
    faceImg.src = "assets/images/smiling.png";
  }
}