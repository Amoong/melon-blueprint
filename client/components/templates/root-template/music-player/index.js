import { html, DefaultComponent } from "/client/utils.js";
import { store } from "/client/store.js";

import "./drawer-button.js";
import "./music-info.js";
import "./music-timer.js";
import "./music-control.js";
import "./volume-control.js";
import "./other-functions.js";

const FALL_BACK_JACKET_SRC = "/assets/images/jackets/fallback.webp";

const template = html`
  <style>
    .music-player {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10px 30px;
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
      volume=0.1
      src="/assets/musics/AlexGrohl - Electric Head.mp3"
    ></audio>
   <drawer-button></drawer-button> 
    <img class="album-jacket" src="/assets/images/jackets/fallback.webp" alt="Album Jacket" />
    <div class="bottom-wrapper">
      <music-info margin-bottom="8px"></music-info>
      <music-timer margin-bottom="10px" duration current-time></music-timer>
      <music-control is-playing="false" margin-bottom="18px"></music-control>
      <volume-control margin-bottom="20px" volume></volume-control>
      <other-functions></other-functions>
    </div>
  </div>
`;

class MusicPlayer extends DefaultComponent {
  constructor() {
    super(template);

    store.$musicPlayer = this;

    this.$musicPlayer = this.shadowRoot.querySelector(".music-player");
    this.$background = this.shadowRoot.querySelector(".background");
    this.$audio = this.shadowRoot.getElementById("music");
    this.$drawerBtn = this.shadowRoot.querySelector("drawer-button");
    this.$albumJacket = this.shadowRoot.querySelector(".album-jacket");
    this.$musicInfo = this.shadowRoot.querySelector("music-info");
    this.$musicTimer = this.shadowRoot.querySelector("music-timer");
    this.$musicControl = this.shadowRoot.querySelector("music-control");
    this.$volumeControl = this.shadowRoot.querySelector("volume-control");

    this.duration = 0;

    this.isPlaying;

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
    this.$drawerBtn.addEventListener("buttonMove", this.handleButtonMove);
    this.$drawerBtn.addEventListener("buttonMoveEnd", this.handleButtonMoveEnd);

    this.$albumJacket.addEventListener("error", this.handleImgError);
    this.$background.addEventListener("error", this.handleImgError);

    this.$audio.addEventListener("timeupdate", this.handleTimeUpdate);
    this.$audio.addEventListener("loadedmetadata", this.initAttr);

    this.$musicTimer.addEventListener("rangeMove", this.handleTimerRangeMove);
    this.$musicControl.addEventListener(
      "controlBtnClick",
      this.handleControlBtnClick
    );

    this.$volumeControl.addEventListener(
      "rangeMove",
      this.handleVolumeRangeMove
    );

    this.addEventListener("musicSelected", this.handleMusicSelected);
  };

  handleButtonMove = (e) => {
    const evt = new CustomEvent("buttonMove", { detail: e.detail });
    this.dispatchEvent(evt);
  };

  handleButtonMoveEnd = () => {
    const evt = new CustomEvent("buttonMoveEnd");
    this.dispatchEvent(evt);
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
    this.$audio.volume = 0.1;

    this.$volumeControl.setAttribute("volume", 0.1);

    this.playMusic();
  };

  handleTimerRangeMove = (e) => {
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

  handleVolumeRangeMove = (e) => {
    const {
      detail: { ratio },
    } = e;
    this.$volumeControl.setAttribute("volume", ratio);
    this.$audio.volume = ratio;
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
    this.$musicControl.removeEventListener("playMusic", this.playMusic);
    this.$musicControl.removeEventListener("pauseMusic", this.pauseMusic);
    this.removeEventListener("musicSelected", this.loadMusic);
  };
}

customElements.define("music-player", MusicPlayer);
