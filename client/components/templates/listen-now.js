import { html, DefaultComponent } from "/client/utils.js";

import "/client/components/organisms/music-slider.js";

const template = html`
  <style>
    :host {
      width: 100%;
    }

    .listen-now {
      width: 100%;
      height: 100%;
      padding-top: 50px;
    }

    .header-wrapper {
      padding: 0 20px;
    }

    h2 {
      margin-bottom: 4px;
    }
  </style>
  <div class="listen-now">
    <div class="header-wrapper">
      <common-header
        page-title="지금 듣기"
        profile-visible="true"
        margin-bottom="22px"
      ></common-header>
      <h2>인기곡</h2>
    </div>
    <music-slider musics></music-slider>
  </div>
`;

class ListenNow extends DefaultComponent {
  constructor() {
    super(template);

    this.$musicSlider = this.shadowRoot.querySelector("music-slider");

    this.initMusicList();
  }

  initMusicList = async () => {
    const musics = await (await fetch("/api/populer")).json();
    const payload = JSON.stringify(musics);

    console.log(musics);

    this.$musicSlider.setAttribute("musics", payload);
  };
}

customElements.define("listen-now", ListenNow);
