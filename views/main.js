class SongList extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    const $style = document.createElement("link");
    $style.setAttribute("rel", "stylesheet");
    $style.setAttribute("href", "views/style.css");
    shadow.appendChild($style);

    const $container = document.createElement("ul");
    $container.classList.add("song-list");

    const $header = document.createElement("li");
    $header.classList.add("header");

    const $title = document.createElement("span");
    $title.textContent = "Music";
    $header.appendChild($title);

    const $artist = document.createElement("span");
    $artist.textContent = "Artist";
    $header.appendChild($artist);

    const $views = document.createElement("span");
    $views.textContent = "views";
    $header.appendChild($views);

    $container.appendChild($header);

    shadow.appendChild($container);

    this.fetchSongs();
  }

  async fetchSongs() {
    const songs = await (await fetch(`${location.href}api/songs`)).json();

    songs.sort((a, b) => b.views - a.views);

    songs.forEach((song) => this.appendSong(song));
  }

  appendSong(song) {
    const $songInfo = document.createElement("li");

    const $title = document.createElement("span");
    $title.textContent = song.title;
    $songInfo.appendChild($title);

    const $artist = document.createElement("span");
    $artist.textContent = song.artist;
    $songInfo.appendChild($artist);

    const $views = document.createElement("span");
    $views.textContent = song.views;
    $songInfo.appendChild($views);

    const container = this.shadowRoot.querySelector(".song-list");
    container.appendChild($songInfo);
  }
}

customElements.define("song-list", SongList);
