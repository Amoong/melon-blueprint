import { SCREEN } from "../constants.js";
import { html, DefaultComponent } from "/client/utils.js";

import "./music-info.js";
import "./music-timer.js";
import "./music-control.js";
import "./volume-control.js";
import "./other-functions.js";

const template = html`
  <style>
    .music-player {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: olive;
      padding: 10px 30px;
    }

    .drawer-btn {
      width: 38px;
      height: 6px;
      background-color: rgba(255, 255, 255, 0.5);
      border: 0;
      border-radius: 3px;
      margin-bottom: 30px;
    }

    img {
      width: 100%;
      border-radius: 12px;
      box-shadow: 0 5px 5px 5px rgba(0, 0, 0, 0.2);
      margin-bottom: 27px;
    }

    .bottom-wrapper {
      width: 100%;
      padding: 0 6px;
    }
  </style>
  <div class="music-player">
    <audio
      id="music"
      volume="0.1"
      src="/static/musics/AlexGrohl - Electric Head.mp3"
    ></audio>
    <button class="drawer-btn"></button>
    <img src="/assets/images/a_cassette_tape.webp" alt="A cassette tape" />
    <div class="bottom-wrapper">
      <music-info margin-bottom="7px"></music-info>
      <music-timer margin-bottom="1px"></music-timer>
      <music-control margin-bottom="13px"></music-control>
      <volume-control margin-bottom="20px"></volume-control>
      <other-functions></other-functions>
    </div>
  </div>
`;

class MusicPlayer extends DefaultComponent {
  constructor() {
    super(template);

    this.$musicControl;
    this.$musicTimer;
    this.$audio;
  }

  connectedCallback() {
    this.$audio = this.shadowRoot.getElementById("music");
    this.$musicControl = this.shadowRoot.querySelector("music-control");
    this.$musicTimer = this.shadowRoot.querySelector("music-timer");

    this.initEvent();
  }

  handleTimeUpdate = (e) => {
    this.$musicTimer.setAttribute("current-time", e.currentTarget.currentTime);
  };

  initAttr = () => {
    console.log("init");
    const audioDuration = this.$audio.duration;
    console.log(audioDuration);
    this.$musicTimer.setAttribute("duration", audioDuration);
  };

  initEvent = () => {
    this.$audio.addEventListener("timeupdate", this.handleTimeUpdate);
    this.$audio.addEventListener("loadedmetadata", this.initAttr);

    this.$musicControl.addEventListener("playMusic", () => this.playMusic());
    this.$musicControl.addEventListener("pauseMusic", () => this.pauseMusic());
  };

  playMusic = () => {
    this.$audio.play();
  };

  pauseMusic = () => {
    this.$audio.pause();
  };

  disconnectedCallback = () => {
    this.$musicControl.removeEventListener("playMusic", this.playMusic);
    this.$musicControl.removeEventListener("pauseMusic", this.pauseMusic);
  };
}

customElements.define(SCREEN.MUSIC_PLAYER, MusicPlayer);
