import { html, DefaultComponent } from "/client/utils.js";

const template = html`
  <style>
    :host {
      width: 100%;
    }

    .listen-now {
      width: 100%;
      height: 100%;
    }
  </style>
  <div class="listen-now">
    <common-header
      page-title="지금 듣기"
      profile-visible="true"
    ></common-header>
    <h2>인기곡</h2>
    <music-slider></music-slider>
  </div>
`;

class ListenNow extends DefaultComponent {
  constructor() {
    super(template);
  }
}

customElements.define("listen-now", ListenNow);
