import { html, DefaultComponent } from "/client/utils.js";

const template = html`
  <style>
    :host {
      display: block;
      width: 100%;
    }

    .common-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 40px;
    }

    h1 {
      font-size: 35px;
      font-weight: 600;
      color: rgb(1, 1, 1);
    }

    button {
      display: none;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      padding: 0;
      color: #fa233a;
    }
  </style>
  <div class="common-header">
    <h1></h1>
    <button>
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path
          d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.753 18.305c-.261-.586-.789-.991-1.871-1.241-2.293-.529-4.428-.993-3.393-2.945 3.145-5.942.833-9.119-2.489-9.119-3.388 0-5.644 3.299-2.489 9.119 1.066 1.964-1.148 2.427-3.393 2.945-1.084.25-1.608.658-1.867 1.246-1.405-1.723-2.251-3.919-2.251-6.31 0-5.514 4.486-10 10-10s10 4.486 10 10c0 2.389-.845 4.583-2.247 6.305z"
        />
      </svg>
    </button>
  </div>
`;

class CommonHeader extends DefaultComponent {
  constructor() {
    super(template);

    this.$h1 = this.shadowRoot.querySelector("h1");
    this.$button = this.shadowRoot.querySelector("button");
  }

  static get observedAttributes() {
    return ["page-title", "profile-visible"];
  }

  attributeChangedCallback(attrName, _, newVal) {
    if (attrName === "page-title") {
      this.onChangePageTitle(newVal);
    } else if (attrName === "profile-visible") {
      this.onChangeUseProfile(newVal);
    }
  }

  onChangePageTitle = (pageTitle) => {
    this.$h1.innerHTML = pageTitle;
  };

  onChangeUseProfile = (profileVisible) => {
    if (profileVisible) {
      this.$button.style.display = "block";
    }
  };
}

customElements.define("common-header", CommonHeader);
