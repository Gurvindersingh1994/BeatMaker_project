// This is the main js file

//imports
import DrumKit from "./pads.js";

//Objects
const drumkit = new DrumKit();

//EventListeners
drumkit.playButton.addEventListener("click", () => {
  drumkit.buttonMode();
  drumkit.startLoop();
  drumkit.activePad();
});
