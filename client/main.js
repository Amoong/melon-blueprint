import { SCREEN } from "./components/templates/root-template/constants.js";
import "./components/templates/root-template/index.js";
import "./components/templates/root-template/music-player/music-player.js";

import { html } from "/client/utils.js";

const template = html`
  <root-template>
    <music-player slot=${SCREEN.MUSIC_PLAYER}></music-player>
  </root-template>
`;

class MainComponent extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("main-component", MainComponent);
