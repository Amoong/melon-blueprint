import { html, DefaultComponent } from "/client/utils.js";

const template = html`
  <style>
    .drawer-button {
      position: relative;
      width: 38px;
      height: 6px;
      background-color: rgba(255, 255, 255, 0.5);
      border: 0;
      border-radius: 3px;
      margin-bottom: 30px;
    }
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }
  </style>
  <button class="drawer-button">
    <div class="overlay"></div>
  </button>
`;

class DrawerButton extends DefaultComponent {
  constructor() {
    super(template);

    this.$btn = this.shadowRoot.querySelector(".drawer-button");
    this.$overlay = this.shadowRoot.querySelector(".overlay");

    this.isPressed = false;
    this.prevY = 0;

    this.initEvent();
  }

  initEvent = () => {
    this.$overlay.addEventListener("pointerdown", this.handlePointerDown);
    this.$overlay.addEventListener("pointerup", this.handlePointerUp);
    this.$overlay.addEventListener("pointerout", this.handlePointerUp);
    this.$overlay.addEventListener("pointermove", this.handlePointerMove);
  };

  handlePointerDown = (e) => {
    this.isPressed = true;
    this.prevY = e.clientY;
    this.$overlay.style.transform = "scale(200)";
  };

  handlePointerUp = () => {
    this.isPressed = false;
    this.prevY = 0;
    this.$overlay.style.transform = "scale(1)";

    const evt = new CustomEvent("buttonMoveEnd");
    this.dispatchEvent(evt);
  };

  handlePointerMove = (e) => {
    if (!this.isPressed) {
      return;
    }

    const evt = new CustomEvent("buttonMove", {
      detail: {
        offsetY: e.clientY - this.prevY,
      },
    });

    this.dispatchEvent(evt);

    this.prevY = e.clientY;
  };
}

customElements.define("drawer-button", DrawerButton);
