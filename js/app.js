// This is the main js file

//default imports
import DrumKit from "./pads.js";

//Objects
const drumkit = new DrumKit();
//EventListeners

//activate sounds
drumkit.playButton.addEventListener("click", () => {
  drumkit.buttonMode();
  drumkit.startLoop();
  drumkit.activePad();
});

//change sounds
drumkit.selectValue.forEach((select) => {
  select.addEventListener("change", function (e) {
    drumkit.selectAudio(e);
  });
});

//mute sounds
drumkit.muteButton.forEach((muteSelect) => {
  muteSelect.addEventListener("click", function (e) {
    muteSelect.classList.toggle("active");
    drumkit.muteSound(e);
  });
});
