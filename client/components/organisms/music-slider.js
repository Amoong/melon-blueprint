import { html, DefaultComponent } from "/client/utils.js";

import "/client/components/molecules/slider-item.js";

const template = html`
  <style>
    :host {
      width: 100%;
      display: block;
    }

    .music-slider {
      width: 100%;
      overflow: hidden;
      overflow-x: scroll;
      scrollbar-width: 0px;
      padding-bottom: 10px;
    }

    .music-slider::-webkit-scrollbar {
      display: none;
    }

    .list-wrapper {
      display: flex;
      flex-wrap: nowrap;
      padding-left: 20px;
      gap: 10px;
    }
  </style>
  <div class="music-slider">
    <div class="list-wrapper"></div>
  </div>
`;

class MusicSlider extends DefaultComponent {
  constructor() {
    super(template);

    this.$listWrapper = this.shadowRoot.querySelector(".list-wrapper");
  }

  static get observedAttributes() {
    return ["musics"];
  }

  attributeChangedCallback(attrName, _, newVal) {
    if (attrName === "musics") {
      this.onChangeMusics(newVal);
    }
  }

  onChangeMusics = (musics) => {
    if (!musics) {
      return;
    }

    let musicList = [];
    try {
      musicList = JSON.parse(musics);
    } catch (e) {
      console.error(e);
    }

    musicList.forEach((music) => {
      const $musicItem = document.createElement("slider-item");
      $musicItem.setAttribute("music-title", music.title);
      $musicItem.setAttribute("artist", music.artist);
      $musicItem.setAttribute("filename", music.filename);
      $musicItem.setAttribute("genres", JSON.stringify(music.genres));
      $musicItem.setAttribute("views", music.views);

      this.$listWrapper.appendChild($musicItem);
    });
  };
}

customElements.define("music-slider", MusicSlider);
