import { html, DefaultComponent } from "/client/utils.js";

import "/client/components/atom/rounded-range.js";

const template = html`
  <style>
    :host {
      width: 100%;
      display: block;
    }

    .volume-control {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .range-wrapper {
      width: 100%;
      padding: 10px;
      margin-top: -3px;
    }

    svg {
      width: 25px;
      height: 25px;
      color: rgba(255, 255, 255, 0.8);
    }
  </style>
  <div class="volume-control">
    <svg
      fill="currentColor"
      stroke="currentColor"
      stroke-width="1.5"
      viewBox="0 0 30 30"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
      ></path>
    </svg>
    <div class="range-wrapper">
      <rounded-range value="0.1"></rounded-range>
    </div>
    <svg
      fill="currentColor"
      stroke="currentColor"
      stroke-width="1.5"
      viewBox="0 0 30 30"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
      ></path>
      <path
        d="M22 3.25a12.5 12.5 0 0 1 0 17.25M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="none"
      />
    </svg>
  </div>
`;

class VolumeControl extends DefaultComponent {
  constructor() {
    super(template);

    this.$range = this.shadowRoot.querySelector("rounded-range");
    this.initEvent();
  }

  static get observedAttributes() {
    return ["volume"];
  }

  initEvent = () => {
    this.$range.addEventListener("rangeMove", this.handleRangeMove);
  };

  attributeChangedCallback(name, _, newVal) {
    if (name === "volume") {
      this.onChangeVolume(newVal);
    }
  }

  onChangeVolume = (newVal) => {
    this.$range.setAttribute("value", newVal);
  };

  handleRangeMove = (e) => {
    const evt = new CustomEvent("rangeMove", { detail: e.detail });

    this.dispatchEvent(evt);
  };
}

customElements.define("volume-control", VolumeControl);
