import { html, DefaultComponent } from "/client/utils.js";

import "/client/components/molecules/search-bar.js";
import "/client/components/atom/play-button.js";
import "/client/components/organisms/music-list.js";
import "/client/components/molecules/common-header.js";

const template = html`
  <style>
    :host {
      width: 100%;
    }

    .my-music {
      width: 100%;
      height: 100%;
      padding-top: 18px;
    }

    .prev-menu {
      font-size: 17px;
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
      <common-header page-title="노래"></common-header>
      <search-bar margin-bottom="27px"></search-bar>
      <div class="button-wrapper">
        <play-button btn-text="재생">
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
        </play-button>
        <play-button btn-text="임의 재생">
          <svg
            slot="icon"
            width="20px"
            viewBox="0  0 24 24"
            style="transform: scale(0.8);"
            xmlns="http://www.w3.org/2000/svg"
            fill-rule="evenodd"
            clip-rule="evenodd"
            fill="currentColor"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <path
              d="M21.67 3.955l-2.825-2.202.665-.753 4.478 3.497-4.474 3.503-.665-.753 2.942-2.292h-4.162c-3.547.043-5.202 3.405-6.913 7.023 1.711 3.617 3.366 6.979 6.913 7.022h4.099l-2.883-2.247.665-.753 4.478 3.497-4.474 3.503-.665-.753 2.884-2.247h-4.11c-3.896-.048-5.784-3.369-7.461-6.858-1.687 3.51-3.592 6.842-7.539 6.858h-2.623v-1h2.621c3.6-.014 5.268-3.387 6.988-7.022-1.72-3.636-3.388-7.009-6.988-7.023h-2.621v-1h2.623c3.947.016 5.852 3.348 7.539 6.858 1.677-3.489 3.565-6.81 7.461-6.858h4.047z"
            />
          </svg>
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
