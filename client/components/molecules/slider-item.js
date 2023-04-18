import { html, DefaultComponent } from "/client/utils.js";
import { store } from "/client/store.js";

const template = html`
  <style>
    :host {
      width: 100%;
    }

    .block {
      display: flex;
      flex-direction: column;
      width: 260px;
      height: 340px;
      border-radius: 10px;
      box-shadow: 0 5px 7px 3px rgba(100, 100, 100, 0.2);
      overflow: hidden;
      padding: 0;
    }

    .views {
      display: block;
      font-size: 15px;
      color: rgba(180, 180, 180);
      margin-bottom: 12px;
    }

    .album-jacket {
      width: 100%;
      height: 75%;
      object-fit: cover;
    }

    .music-info {
      position: relative;
      background-color: rgba(0, 0, 0, 0.4);
      width: 100%;
      height: 25%;
    }

    .background-img {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      object-fit: cover;
      filter: blur(50px);
    }

    .content-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 3px;
      color: white;
      z-index: 1;
    }

    .artist,
    .genres {
      font-weight: 300;
    }
  </style>
  <div class="slider-item">
    <span class="views"></span>
    <button class="block">
      <img class="album-jacket" src="" alt="Album Jackets" />
      <div class="music-info">
        <img class="background-img" src="" alt="" />
        <div class="content-wrapper">
          <span class="music-title"></span>
          <span class="artist"></span>
          <span class="genres"></span>
        </div>
      </div>
    </button>
  </div>
`;

class SliderItem extends DefaultComponent {
  constructor() {
    super(template);

    this.$jacket = this.shadowRoot.querySelector(".album-jacket");
    this.$bg = this.shadowRoot.querySelector(".background-img");
    this.$musicTitle = this.shadowRoot.querySelector(".music-title");
    this.$artist = this.shadowRoot.querySelector(".artist");
    this.$genres = this.shadowRoot.querySelector(".genres");
    this.$views = this.shadowRoot.querySelector(".views");
    this.$playBtn = this.shadowRoot.querySelector("button");

    this.initEvent();
  }

  static get observedAttributes() {
    return ["music-title", "artist", "filename", "genres", "views"];
  }

  initEvent = () => {
    this.$playBtn.addEventListener("click", this.playMusic);
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
      case "genres":
        this.onChangeGenres(newVal);
        break;
      case "views":
        this.onChangeviews(newVal);
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
    this.$bg.src = `/assets/images/jackets/${filename}.jpg`;
    this.filename = filename;
  };

  onChangeGenres = (genres) => {
    let genreList = [];
    try {
      genreList = JSON.parse(genres);
    } catch (e) {
      console.error(e);
    }

    if (!genreList || !genreList.length) {
      return;
    }
    let genreText = genreList[0];

    for (let i = 1; i < genreList.length && i < 2; i++) {
      genreText += `, ${genreList[i]}`;
    }

    this.$genres.innerHTML = genreText;
  };

  onChangeviews = (views) => {
    let numberedViews = Number(views);
    if (numberedViews >= 1000) {
      const k = Math.floor(numberedViews / 1000);
      this.$views.innerHTML = `${k}K`;
    } else {
      this.$views.innerHTML = views;
    }
  };

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
}

customElements.define("slider-item", SliderItem);
