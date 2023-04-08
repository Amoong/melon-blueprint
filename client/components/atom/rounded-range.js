import { html, DefaultComponent } from "/client/utils.js";

const template = html`
  <style>
    :host {
      width: 100%;
    }
    .rounded-range {
      width: 100%;
      height: 7px;
      border-radius: 4px;
      background-color: rgba(255, 255, 255, 0.3);
      overflow: hidden;
    }

    .filled {
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.7);
      transform-origin: 0 0;
      transform: scaleX(0.3);
    }
  </style>
  <div class="rounded-range">
    <div class="filled"></div>
  </div>
`;

class RoundedRange extends DefaultComponent {
  constructor() {
    super(template);
  }
}

customElements.define("rounded-range", RoundedRange);
