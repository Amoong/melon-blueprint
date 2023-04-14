import "./components/templates/root-template.js";

import { html, DefaultComponent } from "/client/utils.js";

const template = html`<root-template></root-template>`;

class MainComponent extends DefaultComponent {
  constructor() {
    super(template);
  }
}

customElements.define("main-component", MainComponent);
