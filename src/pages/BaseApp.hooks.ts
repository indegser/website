import { darkTheme } from "@src/design/theme/stitches.config";
import { useThemeStore } from "@src/design/theme/themeStore";
import { useIsomorphicLayoutEffect } from "@src/hooks/useIsomorphicLayoutEffect";
import { amplitudeSdk } from "@src/sdks/amplitude";

export const useInitAmplitude = () => {
  useIsomorphicLayoutEffect(() => {
    amplitudeSdk.getInstance().init(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY);
  }, []);
};

export const useAppTheme = () => {
  const theme = useThemeStore((s) => s.theme);
  const restoreCachedTheme = useThemeStore((s) => s.restoreCachedTheme);

  useIsomorphicLayoutEffect(() => {
    restoreCachedTheme();
  }, []);

  useIsomorphicLayoutEffect(() => {
    const darkCss = darkTheme.toString();

    switch (theme) {
      case "light": {
        document.body.classList.remove(darkCss);
        break;
      }
      case "dark": {
        document.body.classList.add(darkCss);
        break;
      }
    }
  }, [theme]);
};
