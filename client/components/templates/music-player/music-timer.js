import { html, DefaultComponent } from "/client/utils.js";
import { timeFormatter } from "./utils.js";
import "/client/components/atom/rounded-range.js";

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
    <rounded-range margin-bottom="13px"></rounded-range>
    <div class="timer-number">
      <span class="elapsed">0:00</span>
      <span class="remained">0:00</span>
    </div>
  </div>
`;

class MusicTimer extends DefaultComponent {
  constructor() {
    super(template);

    this.$roundedRange = this.shadowRoot.querySelector("rounded-range");
    this.$elapsed = this.shadowRoot.querySelector(".elapsed");
    this.$remained = this.shadowRoot.querySelector(".remained");
    this.duration = 0;
    this.currentTime = 0;

    this.initEvent();
  }

  static get observedAttributes() {
    return ["current-time", "duration"];
  }

  initEvent = () => {
    this.$roundedRange.addEventListener("rangeMove", this.handleRangeMove);
  };

  handleRangeMove = (e) => {
    const rangeMoveEvt = new CustomEvent(e.type, { detail: e.detail });
    this.dispatchEvent(rangeMoveEvt);
  };

  attributeChangedCallback(attrName, _, newVal) {
    if (attrName === "current-time") {
      this.onChangeCurrentTime(newVal);
    } else if (attrName === "duration") {
      this.onChangeDuration(newVal);
    }
  }

  onChangeCurrentTime = (currentTime) => {
    this.currentTime = currentTime;
    this.updateRangeValue();
    this.updateElapsed();
    this.updateRemained();
  };

  onChangeDuration = (duration) => {
    this.duration = duration;
    this.updateRemained();
  };

  updateRangeValue = () => {
    const rangeValue =
      this.duration === 0 ? 0 : this.currentTime / this.duration;
    this.$roundedRange.setAttribute("value", rangeValue);
  };

  updateElapsed = () => {
    this.$elapsed.innerHTML = timeFormatter(this.currentTime);
  };

  updateRemained = () => {
    this.$remained.innerHTML = `-${timeFormatter(
      this.duration - this.currentTime
    )}`;
  };
}

customElements.define("music-timer", MusicTimer);
