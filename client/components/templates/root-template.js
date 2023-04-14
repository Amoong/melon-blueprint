import { html, DefaultComponent } from "/client/utils.js";
import { store } from "/client/store.js";

import "./music-player/index.js";
import "./my-music.js";

const template = html`
  <style>
    .root {
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding-top: 10%;
      min-width: 100vw;
      min-height: 100vh;
      background-color: black;
    }

    .music-player-wrapper {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      transform: translateY(100%);
    }

    .screen-wrapper {
      position: relative;
      width: 394px;
      height: 667px;
      background-color: white;
      overflow: hidden;
    }

    .status-bar {
      width: 100%;
      height: 18px;
      background-color: white;
    }
  </style>
  <div class="root">
    <div class="screen-wrapper">
      <div class="status-bar">Lorem ipsum dolor sit, amet consectetur a</div>
      <my-music></my-music>
      <div class="navigation-bar-wrapper">
        <navigation-bar></navigation-bar>
      </div>
      <div class="music-player-wrapper">
        <music-player></music-player>
      </div>
    </div>
  </div>
`;

class RootTemplate extends DefaultComponent {
  constructor() {
    super(template);

    this.$screenWrapper = this.shadowRoot.querySelector(".screen-wrapper");
    this.$musicPlayerWrapper = this.shadowRoot.querySelector(
      ".music-player-wrapper"
    );
    this.$musicPlayer = this.shadowRoot.querySelector("music-player");

    store.$root = this;

    this.initEvent();
  }

  initEvent = () => {
    this.$musicPlayer.addEventListener("buttonMove", this.handleButtonMove);
    this.$musicPlayer.addEventListener(
      "buttonMoveEnd",
      this.handleButtonMoveEnd
    );

    this.addEventListener("musicSelected", this.handleMusicSelected);
  };

  handleMusicSelected = () => {
    this.$musicPlayerWrapper.style.transition = "transform 0.2s ease-in-out";
    this.$musicPlayerWrapper.style.transform = "translateY(0)";
  };

  handleButtonMoveEnd = () => {
    const { y: wrapperY, height: wrapperHeight } =
      this.$screenWrapper.getBoundingClientRect();

    const middleOfWrapper = wrapperY + wrapperHeight / 2;

    const { y: playerY } = this.$musicPlayerWrapper.getBoundingClientRect();

    this.$musicPlayerWrapper.style.transition = "transform 0.2s ease-in-out";

    if (middleOfWrapper < playerY) {
      this.$musicPlayerWrapper.style.transform = "translateY(100%)";
    } else {
      this.$musicPlayerWrapper.style.transform = "translateY(0)";
    }
  };

  handleButtonMove = (e) => {
    const { y: wrapperY } = this.$screenWrapper.getBoundingClientRect();
    const { y: playerY } = this.$musicPlayerWrapper.getBoundingClientRect();

    const localY = playerY - wrapperY;

    let translateY = localY + e.detail.offsetY;

    if (translateY < 0) {
      translateY = 0;
    }

    this.$musicPlayerWrapper.style.transition = "";
    this.$musicPlayerWrapper.style.transform = `translateY(${translateY}px)`;
  };
}

customElements.define("root-template", RootTemplate);
