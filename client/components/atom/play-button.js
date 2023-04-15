import { html, DefaultComponent } from "/client/utils.js";

const template = html`
  <style>
    :host {
      width: 100%;
    }

    .play-button {
      display: flex;
      justify-content: center;
      width: 100%;
      height: 46px;
      border-radius: 10px;
      background-color: #eeeeef;
      color: #fa233a;
      padding: 14px;
    }

    slot[name="icon"] {
      height: 10px;
    }

    .text {
      color: #fa233a;
      font-weight: 500;
      font-size: 17px;
      margin-left: 3px;
    }
  </style>
  <button class="play-button">
    <slot name="icon"></slot>
    <span class="text"></span>
  </button>
`;

class PlayButton extends DefaultComponent {
  constructor() {
    super(template);

    this.$btnText = this.shadowRoot.querySelector(".text");
  }

  static get observedAttributes() {
    return ["btn-text"];
  }

  attributeChangedCallback(attrName, _, newVal) {
    if (attrName === "btn-text") {
      this.onChangeBtnText(newVal);
    }
  }

  onChangeBtnText = (btnText) => {
    this.$btnText.innerHTML = btnText;
  };
}

customElements.define("play-button", PlayButton);
