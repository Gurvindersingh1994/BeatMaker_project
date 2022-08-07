export default class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.kickSound = document.querySelector(".kick-sound");
    this.clapSound = document.querySelector(".clap-sound");
    this.hihatSound = document.querySelector(".hihat-sound");
    this.playButton = document.querySelector(".play");
    this.selectValue = document.querySelectorAll("select");
    this.muteButton = document.querySelectorAll(".mute");
    this.index = 0;
    this.bpm = 100;
    this.soundPlaying = null;
  }

  selectAudio(e) {
    const soundName = e.target.name;
    const soundPath = e.target.value;
    switch (soundName) {
      case "kick-select":
        this.kickSound.src = soundPath;
        break;
      case "clap-select":
        this.clapSound.src = soundPath;
        break;
      case "hihat-select":
        this.hihatSound.src = soundPath;
        break;
    }
  }
  //selecting active pad on
  buttonMode() {
    if (this.soundPlaying) {
      this.playButton.innerHTML = "Play";
    } else {
      this.playButton.innerHTML = "Stop";
      this.playButton.classList.toggle("button-active");
    }
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

  muteSound(e) {
    const muteValue = e.target.getAttribute("data-track");

    if (e.target.classList.contains("active")) {
      switch (muteValue) {
        case "0":
          this.kickSound.volume = 0;
          break;
        case "1":
          this.clapSound.volume = 0;
          break;
        case "2":
          this.hihatSound.volume = 0;
          break;
      }
    } else {
      switch (muteValue) {
        case "0":
          this.kickSound.volume = 1;
          break;
        case "1":
          this.clapSound.volume = 1;
          break;
        case "2":
          this.hihatSound.volume = 1;
          break;
      }
    }
  }
}
