import { html, DefaultComponent } from "/client/utils.js";

const template = html`
  <style>
    :host {
      width: 100%;
    }

    .music-list {
      width: 100%;
    }
  </style>
  <div class="music-list">
    <music-item></music-item>
  </div>
`;

class MusicList extends DefaultComponent {
  constructor() {
    super(template);

    this.initMusicList();
  }

  initMusicList = async () => {
    const res = await (await fetch("/api/songs")).json();

    console.log(res);
  };
}

customElements.define("music-list", MusicList);
