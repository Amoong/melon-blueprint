export const html = (...args) => {
  const template = document.createElement("template");

  template.innerHTML = String.raw`
    <style>
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      * {
        margin: 0;
      }

      html,
      body {
        height: 100%;
      }

      body {
        line-height: 1.5;
        -webkit-font-smoothing: antialiased;
      }

      img,
      picture,
      video,
      canvas,
      svg {
        display: block;
        max-width: 100%;
      }

      input,
      button,
      textarea,
      select {
        font: inherit;
      }

      p,
      span,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        overflow-wrap: break-word;
        font-family: 'Inter', sans-serif;
      }

      #root,
      #__next {
        isolation: isolate;
      }
    </style>
    ${String.raw(...args)}`;

  return template;
};
