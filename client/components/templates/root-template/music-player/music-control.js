import { html, DefaultComponent } from "/client/utils.js";

const template = html`
  <style>
    :host {
      width: 100%;
      display: block;
    }

    .music-control {
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 0 30px;
    }

    button {
      background-color: transparent;
      color: white;
      border: 0;
      cursor: pointer;
    }

    .play-stop {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      width: 44px;
      height: 44px;
    }

    button > svg {
      width: 40px;
      height: 40px;
    }

    .play-stop > svg {
      position: absolute;
      width: 44px;
      height: 44px;
      transition: all 0.3s cubic-bezier(0.42, 0, 0.4, 1.77);
    }

    .play-icon {
      right: -2px;
    }

    .hide-icon {
      transform: scale(0, 0);
      opacity: 0;
    }

    .play-btn-effect {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      opacity: 0;
      transition: all 0.05s ease-in-out;
    }
  </style>
  <div class="music-control">
    <button class="rewind">
      <svg
        fill="currentColor"
        stroke="currentColor"
        stroke-width="1.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z"
        ></path>
      </svg>
    </button>
    <button class="play-stop" data-is-playing="false">
      <div class="play-btn-effect"></div>
      <svg
        class="play-icon"
        fill="currentColor"
        stroke="currentColor"
        stroke-width="1.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
        ></path>
      </svg>
      <svg
        class="pause-icon hide-icon"
        fill="currentColor"
        stroke="currentColor"
        stroke-width="5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.75 5.25v13.5m-7.5-13.5v13.5"
        ></path>
      </svg>
    </button>
    <button class="fast-forward">
      <svg
        fill="currentColor"
        stroke="currentColor"
        stroke-width="1.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z"
        ></path>
      </svg>
    </button>
  </div>
`;

class MusicControl extends DefaultComponent {
  constructor() {
    super(template);

    this.$playBtn;
    this.$rewindBtn;
    this.$ffBtn;
  }

  connectedCallback() {
    this.$playBtn = this.shadowRoot.querySelector(".play-stop");
    this.$rewindBtn = this.shadowRoot.querySelector(".rewind");
    this.$ffBtn = this.shadowRoot.querySelector(".fast-forward");
    this.$playIcon = this.shadowRoot.querySelector(".play-icon");
    this.$pauseIcon = this.shadowRoot.querySelector(".pause-icon");
    this.$playBtnEffect = this.shadowRoot.querySelector(".play-btn-effect");

    this.$playBtn.addEventListener("click", this.onClickPlayBtn);
    this.$playBtn.addEventListener("pointerdown", this.onMouseDownPlayBtn);
    this.$playBtn.addEventListener("pointerup", this.onMouseUpPlayBtn);
    this.$playBtn.addEventListener("pointerleave", this.onMouseUpPlayBtn);
  }

  onClickPlayBtn = () => {
    const isPlaying = this.$playBtn.dataset.isPlaying === "true";

    if (isPlaying) {
      this.dispatchEventToParent("pauseMusic");
      this.$playBtn.dataset.isPlaying = "false";
      this.$playIcon.classList.remove("hide-icon");
      this.$pauseIcon.classList.add("hide-icon");
    } else {
      this.dispatchEventToParent("playMusic");
      this.$playBtn.dataset.isPlaying = "true";
      this.$playIcon.classList.add("hide-icon");
      this.$pauseIcon.classList.remove("hide-icon");
    }
  };

  onMouseDownPlayBtn = () => {
    this.$playBtnEffect.style.opacity = 1;
    this.$playBtnEffect.style.transform = "scale(1.1, 1.1)";
  };

  onMouseUpPlayBtn = () => {
    this.$playBtnEffect.style.opacity = 0;
    this.$playBtnEffect.style.transform = "scale(0, 0)";
  };

  dispatchEventToParent = (eventName) => {
    this.dispatchEvent(new CustomEvent(eventName));
  };
}

customElements.define("music-control", MusicControl);
