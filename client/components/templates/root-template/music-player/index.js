import { SCREEN } from "../constants.js";
import { html, DefaultComponent } from "/client/utils.js";
import { store } from "/client/store.js";

import "./music-info.js";
import "./music-timer.js";
import "./music-control.js";
import "./volume-control.js";
import "./other-functions.js";

const template = html`
  <style>
    .music-player {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: olive;
      padding: 10px 30px;
      transform: translateY(100%);
      transition: transform 0.2s ease-in-out;
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
      src="/assets/musics/AlexGrohl - Electric Head.mp3"
    ></audio>
    <button class="drawer-btn"></button>
    <img src="/assets/images/a_cassette_tape.webp" alt="A cassette tape" />
    <div class="bottom-wrapper">
      <music-info margin-bottom="7px"></music-info>
      <music-timer margin-bottom="1px"></music-timer>
      <music-control is-playing="false" margin-bottom="13px"></music-control>
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

    this.isPlaying;
  }

  connectedCallback() {
    this.$musicInfo = this.shadowRoot.querySelector("music-info");
    this.$musicPlayer = this.shadowRoot.querySelector(".music-player");
    this.$audio = this.shadowRoot.getElementById("music");
    this.$musicControl = this.shadowRoot.querySelector("music-control");
    this.$musicTimer = this.shadowRoot.querySelector("music-timer");

    store.$musicPlayer = this;

    this.initEvent();
  }

  handleTimeUpdate = (e) => {
    this.$musicTimer.setAttribute("current-time", e.currentTarget.currentTime);
  };

  initAttr = () => {
    const audioDuration = this.$audio.duration;
    this.$musicTimer.setAttribute("duration", audioDuration);
  };

  initEvent = () => {
    this.$audio.addEventListener("timeupdate", this.handleTimeUpdate);
    this.$audio.addEventListener("loadedmetadata", this.initAttr);

    this.$musicControl.addEventListener(
      "controlBtnClick",
      this.handleControlBtnClick
    );

    this.addEventListener("musicSelected", this.handleMusicSelected);
  };

  handleMusicSelected = (e) => {
    const {
      detail: { musicTitle, artist, filename },
    } = e;

    this.$musicInfo.setAttribute("music-title", musicTitle);
    this.$musicInfo.setAttribute("artist", artist);

    this.$audio.src = `/assets/musics/${filename}.mp3`;
    this.$musicPlayer.style.transform = "translateY(0)";
    this.playMusic();
  };

  handleControlBtnClick = () => {
    if (this.isPlaying) {
      this.pauseMusic();
    } else {
      this.playMusic();
    }
  };

  playMusic = () => {
    this.$audio.play();
    this.isPlaying = true;
    this.$musicControl.setAttribute("is-playing", "true");
  };

  pauseMusic = () => {
    this.$audio.pause();
    this.isPlaying = false;
    this.$musicControl.setAttribute("is-playing", "false");
  };

  disconnectedCallback = () => {
    store.$musicPlayer = null;

    this.$musicControl.removeEventListener("playMusic", this.playMusic);
    this.$musicControl.removeEventListener("pauseMusic", this.pauseMusic);
    this.removeEventListener("musicSelected", this.loadMusic);
  };
}

customElements.define(SCREEN.MUSIC_PLAYER, MusicPlayer);
