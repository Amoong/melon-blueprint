import { SCREEN } from "../constants.js";
import { html, DefaultComponent } from "/client/utils.js";
import { store } from "/client/store.js";

import "./music-info.js";
import "./music-timer.js";
import "./music-control.js";
import "./volume-control.js";
import "./other-functions.js";

const FALL_BACK_JACKET_SRC = "/assets/images/jackets/fallback.webp";

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
      padding: 10px 30px;
      transform: translateY(100%);
      transition: transform 0.2s ease-in-out;
      background-size: cover;
      background-color: #323232;
    }

    .background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      filter: blur(40px) opacity(50%);
      z-index: -1;
    }

    .drawer-btn {
      width: 38px;
      height: 6px;
      background-color: rgba(255, 255, 255, 0.5);
      border: 0;
      border-radius: 3px;
      margin-bottom: 30px;
    }

    .album-jacket {
      width: 100%;
      aspect-ratio: 1 / 1;
      object-fit: cover;
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
    <img class="background"></img>
    <audio
      id="music"
      volume="0.1"
      src="/assets/musics/AlexGrohl - Electric Head.mp3"
    ></audio>
    <button class="drawer-btn"></button>
    <img class="album-jacket" src="/assets/images/jackets/fallback.webp" alt="Album Jacket" />
    <div class="bottom-wrapper">
      <music-info margin-bottom="8px"></music-info>
      <music-timer margin-bottom="10px" duration current-time></music-timer>
      <music-control is-playing="false" margin-bottom="18px"></music-control>
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
    store.$musicPlayer = this;

    this.$musicPlayer = this.shadowRoot.querySelector(".music-player");
    this.$background = this.shadowRoot.querySelector(".background");
    this.$albumJacket = this.shadowRoot.querySelector(".album-jacket");
    this.$musicInfo = this.shadowRoot.querySelector("music-info");
    this.$audio = this.shadowRoot.getElementById("music");
    this.$musicControl = this.shadowRoot.querySelector("music-control");
    this.$musicTimer = this.shadowRoot.querySelector("music-timer");

    this.duration = 0;

    this.initEvent();
  }

  handleTimeUpdate = (e) => {
    this.$musicTimer.setAttribute("current-time", e.currentTarget.currentTime);
  };

  initAttr = () => {
    const audioDuration = this.$audio.duration;
    this.$musicTimer.setAttribute("duration", audioDuration);
    this.duration = audioDuration;
  };

  initEvent = () => {
    this.$albumJacket.addEventListener("error", this.handleImgError);
    this.$background.addEventListener("error", this.handleImgError);

    this.$audio.addEventListener("timeupdate", this.handleTimeUpdate);
    this.$audio.addEventListener("loadedmetadata", this.initAttr);

    this.$musicTimer.addEventListener("rangeMove", this.handleRangeMove);
    this.$musicControl.addEventListener(
      "controlBtnClick",
      this.handleControlBtnClick
    );

    this.addEventListener("musicSelected", this.handleMusicSelected);
  };

  handleImgError = (e) => {
    e.currentTarget.setAttribute("src", FALL_BACK_JACKET_SRC);
  };

  handleMusicSelected = (e) => {
    const {
      detail: { musicTitle, artist, filename },
    } = e;

    const jacketImgSrc = `/assets/images/jackets/${filename}.jpg`;

    this.$background.setAttribute("src", jacketImgSrc);
    this.$albumJacket.setAttribute("src", jacketImgSrc);

    this.$musicInfo.setAttribute("music-title", musicTitle);
    this.$musicInfo.setAttribute("artist", artist);

    this.$audio.src = `/assets/musics/${filename}.mp3`;
    this.$musicPlayer.style.transform = "translateY(0)";
    this.playMusic();
  };

  handleRangeMove = (e) => {
    const {
      detail: { ratio },
    } = e;

    const currentTime = this.duration * ratio;

    this.$musicTimer.setAttribute("current-time", currentTime);
    this.$audio.currentTime = currentTime;
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
