import { SCREEN } from "../constants.js";
import { html } from "/client/utils.js";

import "./music-info.js";
import "./music-timer.js";

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
    <button class="drawer-btn"></button>
    <img src="/client/images/a_cassette_tape.webp" alt="A cassette tape" />
    <div class="bottom-wrapper">
      <music-info margin-bottom="6px"></music-info>
      <music-timer></music-timer>
      <slot name="music-control"></slot>
      <slot name="volume-control"></slot>
      <slot name="other-functions"></slot>
    </div>
  </div>
`;

class MusicPlayer extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define(SCREEN.MUSIC_PLAYER, MusicPlayer);
