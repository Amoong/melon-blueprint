import { html, DefaultComponent } from "/client/utils.js";

// Music name 이 길면 가로로 스크롤 되어야 함

const template = html`
  <style>
    :host {
      display: block;
      width: 100%;
    }

    .music-info {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .meta-data {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 6px;
    }

    .music-title {
      font-size: 20px;
      font-weight: 500;
      color: white;
    }

    .artist {
      font-size: 20px;
      color: rgba(255, 255, 255, 0.6);
    }

    .action-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border: 0;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.2);
    }

    .action-btn > svg {
      transform: scale(1.2);
    }
  </style>

  <div class="music-info">
    <div class="meta-data">
      <span class="music-title"></span>
      <span class="artist"></span>
    </div>
    <button class="action-btn">
      <svg
        clip-rule="evenodd"
        fill-rule="evenodd"
        stroke-linejoin="round"
        stroke-miterlimit="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="white"
      >
        <path
          d="m16.5 11.995c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25zm-6.75 0c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25zm-6.75 0c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25z"
        />
      </svg>
    </button>
  </div>
`;

class MusicInfo extends DefaultComponent {
  constructor() {
    super(template);

    this.$musicTitle = this.shadowRoot.querySelector(".music-title");
    this.$artist = this.shadowRoot.querySelector(".artist");
  }

  static get observedAttributes() {
    return ["music-title", "artist"];
  }

  attributeChangedCallback(attrName, _, newVal) {
    switch (attrName) {
      case "music-title":
        this.onChangeMusicTitle(newVal);
        break;
      case "artist":
        this.onChangeArtist(newVal);
        break;
    }
  }

  onChangeMusicTitle = (musicTitle) => {
    this.$musicTitle.innerHTML = musicTitle;
  };

  onChangeArtist = (artist) => {
    this.$artist.innerHTML = artist;
  };
}

customElements.define("music-info", MusicInfo);
