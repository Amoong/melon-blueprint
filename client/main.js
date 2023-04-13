import "./components/templates/root-template/index.js";
import "./components/templates/root-template/music-player/index.js";

import { html, DefaultComponent } from "/client/utils.js";

const template = html`<root-template></root-template>`;

class MainComponent extends DefaultComponent {
  constructor() {
    super(template);
  }
}

customElements.define("main-component", MainComponent);
