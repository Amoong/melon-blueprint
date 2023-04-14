import { html, DefaultComponent } from "/client/utils.js";

const template = html`
  <style>
    :host {
      display: block;
      width: 100%;
    }

    .search-bar {
      display: flex;
      align-items: center;
      width: 100%;
      height: 37px;
      padding: 0 6px;
      background-color: #eeeeef;
      border-radius: 10px;
      color: #a1a1a4;
    }

    svg {
      height: 54%;
    }

    span {
      font-size: 17px;
      margin-left: 5px;
      color: #95959f;
      font-weight: 500;
      margin-top: 2px;
    }
  </style>
  <div class="search-bar">
    <svg
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
      ></path>
    </svg>
    <span>노래에서 찾기</span>
  </div>
`;

class SearchBar extends DefaultComponent {
  constructor() {
    super(template);
  }
}

customElements.define("search-bar", SearchBar);
