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

    .prev-menu {
      font-weight: 600;
      font-size: 17px;
      margin-top: 3px;
    }

    .top-bar {
      width: 100%;
      height: 44px;
      display: flex;
      align-items: center;
      color: #fa233a;
      padding: 8px 0;
      padding-right: 10px;
    }

    .left-arrow-icon {
      height: 100%;
    }

    .sort-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      margin-left: auto;
      color: #fa233a;
      padding: 0;
      gap: -2px;
      background-color: #eeeeef;
    }

    .sort-icon {
      height: 70%;
      margin-left: 1px;
    }

    .body {
      padding: 6px 20px;
    }

    h1 {
      margin-bottom: 10px;
      font-size: 35px;
      font-weight: 800;
    }

    .button-wrapper {
      display: flex;
      justify-content: space-between;
      gap: 20px;
      margin-bottom: 15px;
    }

    play-button span {
      margin: inherit;
    }
  </style>
  <div class="my-music">
    <div class="top-bar">
      <svg
        class="left-arrow-icon"
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
      <span class="prev-menu">보관함</span>
      <button class="sort-btn">
        <svg
          class="sort-icon"
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
            d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
          ></path>
        </svg>
      </button>
    </div>
    <div class="body">
      <h1>노래</h1>
      <search-bar margin-bottom="25px"></search-bar>
      <div class="button-wrapper">
        <play-button>
          <svg
            width="20px"
            slot="icon"
            fill="currentColor"
            stroke="currentColor"
            stroke-width="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
            ></path>
          </svg>
          <span slot="text">재생</span>
        </play-button>
        <play-button>
          <svg
            slot="icon"
            width="20px"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            class="humbleicons hi-arrow-split"
          >
            <path
              xmlns="http://www.w3.org/2000/svg"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 12h4.597a5 5 0 013.904 1.877l.998 1.246A5 5 0 0016.403 17H21m0 0l-3-3m3 3l-3 3m3-13h-5.078A4 4 0 0012.8 8.501L11.201 10.5A4 4 0 018.078 12H6m15-5l-3-3m3 3l-3 3"
            />
          </svg>
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
