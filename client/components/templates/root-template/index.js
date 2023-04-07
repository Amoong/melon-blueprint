import { SCREEN } from "./constants.js";
import { html } from "/client/utils.js";

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

    .screen-wrapper {
      width: 394px;
      height: 667px;
      background-color: white;
    }

    .status-bar {
      width: 100%;
      height: 18px;
      background-color: pink;
    }
  </style>
  <div class="root">
    <div class="screen-wrapper">
      <div class="status-bar">STATUS BAR</div>
      <slot name=${SCREEN.MUSIC_PLAYER}> </slot>
    </div>
  </div>
`;

class RootTemplate extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("root-template", RootTemplate);
