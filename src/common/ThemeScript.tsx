import {
  AdaptiveTheme,
  generateAdaptiveTheme,
  NamedColorScale,
} from "@adobe/leonardo-contrast-colors";
import { palette } from "style.types";

const colorScales = Object.keys(palette).map((name) => ({
  name,
  colorspace: "RGB",
  ...palette[name],
})) as NamedColorScale[];

const adaptiveTheme = generateAdaptiveTheme({
  colorScales,
  baseScale: "bg",
});

const createThemeVariables = (...args: Parameters<AdaptiveTheme>) => {
  const rules = adaptiveTheme(...args);
  if (!Array.isArray(rules)) return [];

  const res = [];

  for (const rule of rules) {
    if ("values" in rule) {
      for (const v of rule.values) {
        const { name, value } = v;
        res.push([`--${name}`, value]);
      }
    }
  }

  return res;
};

const themes = {
  light: createThemeVariables(99, 1),
  dark: createThemeVariables(12, 1),
};

const ThemeScript = () => {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
      window.THEME = ${JSON.stringify(themes)}
      function changeTheme() {
        let theme = localStorage.getItem("theme");
        if (!theme) {
          if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            theme = 'dark';
          } else {
            theme = 'light';
          }
        }
        
        let rules = THEME[theme];
        let root = document.querySelector(':root').style;
        for (const [property, value] of rules) {
          root.setProperty(property, value);
        }

        root.setProperty('--theme', theme);
      }

      changeTheme();
    `,
      }}
    ></script>
  );
};

export default ThemeScript;
