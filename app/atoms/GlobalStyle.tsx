export default () => {
  return (
    <style jsx global>{`
      :root {
        --font-sans: system-ui, -apple-system, BlinkMacSystemFont, Roboto,
          Segoe UI, Ubuntu, 'Helvetica Neue', sans-serif;
      }

      html {
        font-family: var(--font-sans);
        font-size: 16px;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
      }

      body {
        margin: 0;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-kerning: normal;
        -moz-font-feature-settings: 'kern', 'liga', 'clig', 'calt';
        -ms-font-feature-settings: 'kern', 'liga', 'clig', 'calt';
        -webkit-font-feature-settings: 'kern', 'liga', 'clig', 'calt';
        font-feature-settings: 'kern', 'liga', 'clig', 'calt';
      }

      input,
      textarea {
        font: inherit;
      }

      :root {
        --divider-color: #dfe4ec;
        --title-color: #1f252d;
        --desc-color: #7e8ba0;
        --caption-color: #777;
        --primary-color: #0a46ff;
        --link-color: #286ed0;
        --skill-bg-color: #edf4fe;
        --bullet-default-color: rgba(136, 136, 136, 0.4);
        --bullet-active-color: #888;

        /* button rules */
        --icon-button-padding: 8px;
      }

      #z100 {
        z-index: 100;
      }

      @media print {
        .no-print {
          display: none !important;
        }
      }

      a {
        text-decoration: none;
        color: inherit;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        margin: 0;
      }

      .fixed {
        overflow: hidden;
        position: fixed;
        width: 100vw;
        left: 0;
        bottom: 0;
        right: 0;
      }
    `}</style>
  )
}
