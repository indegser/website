import { darkTheme, theme } from "./stitches.config";

export const noFlash = `
// https://github.com/donavon/use-dark-mode/blob/develop/noflash.js.txt
// Insert this script in your index.html right after the <body> tag.
// This will help to prevent a flash if dark mode is the default.

(function() {
  var classNameDark = '${darkTheme.toString()}';
  var classNameLight = '${theme.toString()}';

  function setClassOnDocumentBody(darkMode) {
    document.documentElement.classList.add(darkMode ? classNameDark : classNameLight);
    document.documentElement.classList.remove(darkMode ? classNameLight : classNameDark);
  }
  
  var preferDarkQuery = '(prefers-color-scheme: dark)';
  var mql = window.matchMedia(preferDarkQuery);
  var supportsColorSchemeQuery = mql.media === preferDarkQuery;
  setClassOnDocumentBody(mql.matches);
})();`
