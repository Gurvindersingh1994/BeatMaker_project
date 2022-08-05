export default class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.kickSound = document.querySelector(".kick-sound");
    this.clapSound = document.querySelector(".clap-sound");
    this.hihatSound = document.querySelector(".hihat-sound");
    this.playButton = document.querySelector(".play");
    this.index = 0;
    this.bpm = 100;
    this.soundPlaying = null;
  }

  //selecting active pad on
  buttonMode() {
    if (!this.soundPlaying) {
      this.playButton.innerHTML = "Play-On";
    } else {
      this.playButton.innerHTML = "Play-Off";
    }
    this.playButton.classList.toggle("button-active");
  }

  activePad() {
    this.pads.forEach((pad) => {
      pad.addEventListener("click", () => {
        pad.classList.toggle("active");
      });
      pad.addEventListener("animationend", function () {
        this.style.animation = "";
      });
    });
  }

  repeatLoop() {
    let step = this.index % 8;
    let activeBar = document.querySelectorAll(`.b${step}`);
    activeBar.forEach((bar) => {
      bar.style.animation = `playTracks 0.3s alternate ease-in-out 2`;
      if (bar.classList.contains("active")) {
        //check for type of sound playing
        if (bar.classList.contains("kick-pad")) {
          this.kickSound.currentTime = 0;
          this.kickSound.play();
        }
        if (bar.classList.contains("clap-pad")) {
          this.clapSound.currentTime = 0;
          this.clapSound.play();
        }
        if (bar.classList.contains("hihat-pad")) {
          this.hihatSound.currentTime = 0;
          this.hihatSound.play();
        }
      }
    });
    this.index++;
  }

  startLoop() {
    const interval = (60 / this.bpm) * 1000;

    //check if the interval is already going on or not. set interval function always return a random ID while it is running, so we will put a if condition to check that.

    if (!this.soundPlaying) {
      this.soundPlaying = setInterval(() => {
        this.repeatLoop();
      }, interval);
    } else {
      clearInterval(this.soundPlaying);
      this.soundPlaying = null; // to reset the default value
    }
  }
}
