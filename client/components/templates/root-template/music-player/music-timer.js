import { html } from "/client/utils.js";

const template = html`
  <style>
    :host {
      display: block;
      width: 100%;
    }

    .music-timer {
      width: 100%;
      display: flex;
      flex-direction: column;
    }

    .range {
      width: 100%;
      height: 7px;
      border-radius: 4px;
      background-color: rgba(255, 255, 255, 0.3);
      overflow: hidden;
      margin-bottom: 10px;
    }

    .filled-range {
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.7);
      transform-origin: 0 0;
      transform: scaleX(0.3);
    }

    .timer-number {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }

    .timer-number > span {
      font-size: 11px;
      color: rgba(255, 255, 255, 0.3);
    }
  </style>
  <div class="music-timer">
    <div class="range">
      <div class="filled-range"></div>
    </div>
    <div class="timer-number">
      <span class="elapsed">0:39</span>
      <span class="remained">-1:23</span>
    </div>
  </div>
`;

class MusicTimer extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const marginBottom = this.getAttribute("margin-bottom");

    this.style.marginBottom = marginBottom;
  }
}

customElements.define("music-timer", MusicTimer);
