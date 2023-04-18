import { html, DefaultComponent } from "/client/utils.js";

const template = html`
  <style>
    :host {
      width: 100%;
    }

    .page-renderer {
      width: 100%;
      height: 100%;
      padding-top: 18px;
      padding-bottom: 50px;
    }
  </style>
  <div class="page-renderer">
    <slot name="page"></slot>
  </div>
`;

class PageRenderer extends DefaultComponent {
  constructor() {
    super(template);
  }
}

customElements.define("page-renderer", PageRenderer);
