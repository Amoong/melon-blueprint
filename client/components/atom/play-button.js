import { html, DefaultComponent } from "/client/utils.js";

const template = html`
  <style>
    :host {
      width: 100%;
    }

    .play-button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 43px;
      border-radius: 10px;
      background-color: #eeeeef;
      color: #fa233a;
    }

    slot[name="text"] {
      color: #fa233a;
      font-weight: 700;
    }
  </style>
  <button class="play-button">
    <slot name="icon"></slot>
    <slot name="text"></slot>
  </button>
`;

class PlayButton extends DefaultComponent {
  constructor() {
    super(template);
  }
}

customElements.define("play-button", PlayButton);
