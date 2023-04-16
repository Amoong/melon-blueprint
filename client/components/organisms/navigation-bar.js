import { html, DefaultComponent } from "/client/utils.js";

export const NAV_MENU = {
  LISTEN_NOW: "listen-now",
  BROWSING: "browsing",
  RADIO: "radio",
  MY_MUSIC: "my-music",
  SEARCH: "search",
};

const template = html`
  <style>
    :host {
      width: 100%;
    }
    .navigation-bar {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      width: 100%;
      height: 50px;
      border-top: 1px solid #e2e3e4;
      background-color: rgba(248, 248, 248, 0.9);
    }

    button {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 100%;
      padding: 5px 0 3px;
      color: rgb(139, 138, 135);
    }

    span {
      color: rgb(171, 171, 171);
      font-size: 10px;
    }

    button.selected,
    .selected span {
      color: #fa233a;
    }

    .music-icon {
      position: absolute;
      top: 14px;
    }
  </style>
  <div class="navigation-bar">
    <button id=${NAV_MENU.LISTEN_NOW}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path
          d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3 17v-10l9 5.146-9 4.854z"
        />
      </svg>
      <span>지금 듣기</span>
    </button>
    <button id=${NAV_MENU.BROWSING}>
      <svg
        style="transform: scale(1.2);"
        height="24"
        fill="currentColor"
        stroke="currentColor"
        stroke-width="1.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
        ></path>
      </svg>
      <span>둘러보기</span>
    </button>
    <button id=${NAV_MENU.RADIO}>
      <svg
        height="24"
        style="transform: scale(1.2);"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          xmlns="http://www.w3.org/2000/svg"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728M8.111 15.889a5.5 5.5 0 010-7.778m7.778 0a5.5 5.5 0 010 7.778M14 12a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
      <span>라디오</span>
    </button>
    <button id=${NAV_MENU.MY_MUSIC}>
      <svg
        height="24"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path
          d="M3.44 1.999l-.439-1.999h17.994l-.439 1.999h-17.116zm-3.44 6.001l2.035 16h19.868l2.097-16h-24zm22.255-2l.371-2h-21.256l.371 2h20.514z"
        />
      </svg>
      <svg
        height="14"
        class="music-icon"
        fill="none"
        stroke="white"
        stroke-width="1.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z"
        ></path>
      </svg>
      <span>보관함</span>
    </button>
    <button id=${NAV_MENU.SEARCH}>
      <svg
        height="24"
        style="transform: scale(1.1);"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        ></path>
      </svg>
      <span>검색</span>
    </button>
  </div>
`;

class NavigationBar extends DefaultComponent {
  constructor() {
    super(template);

    this.$listenNowBtn = this.shadowRoot.getElementById(NAV_MENU.LISTEN_NOW);
    this.$browsingBtn = this.shadowRoot.getElementById(NAV_MENU.BROWSING);
    this.$RadioBtn = this.shadowRoot.getElementById(NAV_MENU.RADIO);
    this.$myMusicBtn = this.shadowRoot.getElementById(NAV_MENU.MY_MUSIC);
    this.$searchBtn = this.shadowRoot.getElementById(NAV_MENU.SEARCH);

    this.$btns = [
      this.$listenNowBtn,
      this.$browsingBtn,
      this.$RadioBtn,
      this.$myMusicBtn,
      this.$searchBtn,
    ];

    this.initEvent();
  }

  static get observedAttributes() {
    return ["selected-menu"];
  }

  initEvent = () => {
    this.shadowRoot.addEventListener("click", this.onClickNav);
  };

  onClickNav = (e) => {
    let $current = e.target;

    while ($current.tagName != null) {
      if ($current.tagName === "BUTTON") {
        const evt = new CustomEvent("changeNav", {
          detail: {
            id: $current.id,
          },
        });

        this.dispatchEvent(evt);
        return;
      }

      $current = $current.parentNode;
    }
  };

  attributeChangedCallback(attrName, _, newVal) {
    if (attrName === "selected-menu") {
      this.onChangeSelectedMenu(newVal);
    }
  }

  onChangeSelectedMenu = (attrName) => {
    this.$btns.forEach(($btn) => {
      $btn.classList.remove("selected");
    });

    this.shadowRoot.getElementById(attrName).classList.add("selected");
  };
}

customElements.define("navigation-bar", NavigationBar);
