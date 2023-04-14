import { html, DefaultComponent } from "/client/utils.js";
import { store } from "/client/store.js";

const template = html`
  <style>
    :host {
      width: 100%;
    }

    .music-item {
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
      height: 54px;
    }

    .play-btn {
      width: 100%;
      height: 100%;
      display: flex;
      flex-wrap: nowrap;
      align-items: stretch;
      background-color: transparent;
      border: 0;
      padding: 0;
    }

    img {
      height: 90%;
      object-fit: cover;
      aspect-ratio: 1 / 1;
      border-radius: 5px;
      align-self: flex-start;
      margin-right: 10px;
    }

    .right-section {
      width: 100%;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #e2e3e4;
    }

    .music-info {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
      gap: 5px;
      padding: 8px 0;
      border-bottom: 1px solid #e2e3e4;
    }

    .music-info > span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .music-title {
      font-size: 17px;
      font-weight: 600;
    }

    .artist {
      font-size: 13px;
      color: #a0a0a0;
    }

    .action-btn {
      position: absolute;
      width: 32px;
      right: 2px;
    }
  </style>
  <div class="music-item">
    <button class="action-btn">
      <svg
        clip-rule="evenodd"
        fill-rule="evenodd"
        stroke-linejoin="round"
        stroke-miterlimit="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="#323232"
      >
        <path
          d="m16.5 11.995c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25zm-6.75 0c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25zm-6.75 0c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25z"
        />
      </svg>
    </button>
    <button class="play-btn">
      <img src="/assets/images/a_cassette_tape.webp" alt="Album Jacket" />
      <div class="music-info">
        <span class="music-title"></span>
        <span class="artist"></span>
      </div>
    </button>
  </div>
`;

class MusicItem extends DefaultComponent {
  constructor() {
    super(template);

    this.$jacket = this.shadowRoot.querySelector("img");
    this.$musicTitle = this.shadowRoot.querySelector(".music-title");
    this.$artist = this.shadowRoot.querySelector(".artist");
    this.$playBtn = this.shadowRoot.querySelector(".play-btn");

    this.musicTitle;
    this.artist;
    this.filename;
  }

  static get observedAttributes() {
    return ["music-title", "artist", "filename"];
  }

  connectedCallback() {
    this.$playBtn.addEventListener("click", this.playMusic);
  }

  playMusic = () => {
    if (!store.$root || !store.$musicPlayer) {
      return;
    }

    const musicSelected = new CustomEvent("musicSelected", {
      detail: {
        musicTitle: this.musicTitle,
        artist: this.artist,
        filename: this.filename,
      },
    });

    store.$root.dispatchEvent(musicSelected);
    store.$musicPlayer.dispatchEvent(musicSelected);
  };

  attributeChangedCallback(attrName, _, newVal) {
    switch (attrName) {
      case "music-title":
        this.onChangeTitle(newVal);
        break;
      case "artist":
        this.onChangeArtist(newVal);
        break;
      case "filename":
        this.onChangeFilename(newVal);
        break;
    }
  }

  onChangeTitle = (musicTitle) => {
    this.$musicTitle.innerHTML = musicTitle;
    this.musicTitle = musicTitle;
  };

  onChangeArtist = (artist) => {
    this.$artist.innerHTML = artist;
    this.artist = artist;
  };

  onChangeFilename = (filename) => {
    this.$jacket.src = `/assets/images/jackets/${filename}.jpg`;
    this.filename = filename;
  };
}

customElements.define("music-item", MusicItem);
