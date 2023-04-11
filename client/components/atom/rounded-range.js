import { html, DefaultComponent } from "/client/utils.js";

const template = html`
  <style>
    :host {
      width: 100%;
    }

    .rounded-range {
      width: 100%;
      height: 7px;
      border-radius: 4px;
      background-color: rgba(255, 255, 255, 0.3);
      overflow: hidden;
      transition: transform 0.2s ease-in-out;
    }

    .filled {
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.7);
      transform-origin: 0 0;
      transform: scaleX(0);
    }

    .smooth {
      transition: transform 0.5s linear;
    }
  </style>
  <div class="rounded-range">
    <div class="filled"></div>
  </div>
`;

class RoundedRange extends DefaultComponent {
  constructor() {
    super(template);

    this.$container = this.shadowRoot.querySelector(".rounded-range");
    this.$filled = this.shadowRoot.querySelector(".filled");
  }

  static get observedAttributes() {
    return ["value", "smooth"];
  }

  connectedCallback() {
    super.connectedCallback();
    this.$container.addEventListener("pointerdown", this.onPointerDown);
    this.$container.addEventListener("pointerup", this.onPointerUp);
  }

  onPointerDown = () => {
    this.$container.style.transform = "scale(1.05, 2)";
  };

  onPointerUp = () => {
    this.$container.style.transform = "scale(1, 1)";
  };

  attributeChangedCallback(name, _, newValue) {
    if (name === "value") {
      this.onChangeValue(newValue);
    } else if (name === "smooth") {
      this.onChangeSmooth(newValue);
    }
  }

  onChangeValue = (newValue) => {
    this.$filled.style.transform = `scaleX(${newValue})`;
  };

  onChangeSmooth = (smooth) => {
    if (smooth === "true") {
      this.$filled.classList.add("smooth");
    } else {
      this.$filled.classList.remove("smooth");
    }
  };
}

customElements.define("rounded-range", RoundedRange);
