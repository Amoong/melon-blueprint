import { html, DefaultComponent } from "/client/utils.js";

import "/client/components/molecules/search-bar.js";
import "/client/components/atom/play-button.js";
import "/client/components/organisms/music-list.js";

const template = html`
  <style>
    :host {
      width: 100%;
      height: 100%;
    }

    .my-music {
      width: 100%;
      height: 100%;
    }

    .top-bar {
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      color: #fa233a;
      padding: 5px 0;
    }

    .top-bar svg {
      height: 100%;
    }

    .sort-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-left: auto;
      color: #fa233a;
      padding: 0;
      gap: -2px;
      background-color: #eeeeef;
    }

    .body {
      padding: 20px;
    }

    h1 {
      margin-bottom: 10px;
    }

    .button-wrapper {
      display: flex;
      justify-content: space-between;
      gap: 20px;
      margin-bottom: 15px;
    }
  </style>
  <div class="my-music">
    <div class="top-bar">
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
          d="M15.75 19.5L8.25 12l7.5-7.5"
        ></path>
      </svg>
      <span>보관함</span>
      <button class="sort-btn">
        <svg
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18"
          ></path>
        </svg>
        <svg
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 17.25L12 21m0 0l-3.75-3.75M12 21V3"
          ></path>
        </svg>
      </button>
    </div>
    <div class="body">
      <h1>노래</h1>
      <search-bar margin-bottom="25px"></search-bar>
      <div class="button-wrapper">
        <play-button>
          <span slot="text">재생</span>
        </play-button>
        <play-button>
          <span slot="text">임의 재생</span>
        </play-button>
      </div>
      <music-list></music-list>
    </div>
  </div>
`;

class MyMusic extends DefaultComponent {
  constructor() {
    super(template);
  }
}

customElements.define("my-music", MyMusic);
