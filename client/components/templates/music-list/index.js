import { html, DefaultComponent } from "/client/utils.js";

import "./music-item.js";

const template = html`
  <style>
    :host {
      width: 100%;
    }

    .music-list {
      width: 100%;
      display: flex;
      flex-direction: column;
    }
  </style>
  <div class="music-list"></div>
`;

class MusicList extends DefaultComponent {
  constructor() {
    super(template);

    this.initMusicList();
  }

  initMusicList = async () => {
    const musics = await (await fetch("/api/songs")).json();

    const $listRoot = this.shadowRoot.querySelector(".music-list");

    musics.forEach((music) => {
      const $musicItem = document.createElement("music-item");
      $musicItem.setAttribute("musicId", music._id);
      $musicItem.setAttribute("title", music.title);
      $musicItem.setAttribute("artist", music.artist);
      $musicItem.setAttribute("filename", music.filename);

      $listRoot.appendChild($musicItem);
    });
    console.log(musics);
  };
}

customElements.define("music-list", MusicList);
