import { html, DefaultComponent } from "/client/utils.js";

const template = html`
  <style>
    :host {
      width: 100%;
    }

    .rounded-range {
      position: relative;
      width: 100%;
      height: 7px;
    }

    .bar {
      position: absolute;
      left: -5%;
      top: -50%;
      width: 110%;
      height: 200%;
      border-radius: 6px;
      overflow: hidden;
      background-color: rgba(255, 255, 255, 0.3);
      transform-origin: center;
      transform: scale(0.91, 0.5);
      transition: transform 0.2s ease-in-out;
    }

    .filled {
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.7);
      transform-origin: 0 0;
      transform: scaleX(0);
      border-radius: 6px;
    }

    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }
  </style>
  <div class="rounded-range">
    <div class="bar">
      <div class="filled"></div>
    </div>
    <div class="overlay"></div>
  </div>
`;

class RoundedRange extends DefaultComponent {
  constructor() {
    super(template);

    this.$bar = this.shadowRoot.querySelector(".bar");
    this.$filled = this.shadowRoot.querySelector(".filled");
    this.$overlay = this.shadowRoot.querySelector(".overlay");

    this.isPressed = false;
  }

  static get observedAttributes() {
    return ["value"];
  }

  connectedCallback() {
    super.connectedCallback();
    this.$overlay.addEventListener("pointerdown", this.onPointerDown);
    this.$overlay.addEventListener("pointerup", this.onPointerUp);
    this.$overlay.addEventListener("pointerout", this.onPointerUp);
    this.$overlay.addEventListener("pointermove", this.onPointerMove);
  }

  onPointerDown = () => {
    this.$bar.style.transform = "scale(1, 1)";
    this.$overlay.style.transform = "scale(500)";
    this.isPressed = true;
  };

  onPointerUp = () => {
    this.$bar.style.transform = "scale(0.91, 0.5)";
    this.$overlay.style.transform = "scale(1)";
    this.isPressed = false;
  };

  onPointerMove = (e) => {
    if (!this.isPressed) {
      return;
    }

    // 가끔 이벤트가 꼬여서 onPointerUp 호출이 안 됨
    if (e.pressure === 0) {
      this.onPointerUp();
    }

    const { left, right } = this.$bar.getBoundingClientRect();

    const barLength = right - left;
    const pointerLocalX = e.clientX - left;

    let ratio = pointerLocalX / barLength;
    if (ratio < 0) {
      ratio = 0;
    } else if (ratio > 1) {
      ratio = 1;
    }

    const rangeMoveEvt = new CustomEvent("rangeMove", {
      detail: {
        ratio,
      },
    });

    this.dispatchEvent(rangeMoveEvt);
  };

  attributeChangedCallback(name, _, newValue) {
    if (name === "value") {
      this.onChangeValue(newValue);
    }
  }

  onChangeValue = (newValue) => {
    this.$filled.style.transform = `scaleX(${newValue})`;
  };
}

customElements.define("rounded-range", RoundedRange);
