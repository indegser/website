import { SunIcon, MoonIcon } from "@radix-ui/react-icons";

import { styled, theme } from "@src/design/theme/stitches.config";
import { useThemeStore } from "@src/design/theme/themeStore";
import { trackEvent } from "@src/utils/analytics/trackEvent";

export const Theme = () => {
  const menus = [
    // { name: "시스템 설정 사용", value: "system" },
    { name: "라이트 모드", value: "light" },
    { name: "다크 모드", value: "dark" },
  ] as const;

  const currentMenu = useThemeStore((s) =>
    menus.find((menu) => menu.value === s.theme)
  );
  const setTheme = useThemeStore((s) => s.setTheme);

  const switchTheme = () => {
    const nextTheme = menus.find((menu) => menu.value !== currentMenu.value);

    trackEvent("switch_theme", {
      theme: nextTheme.value,
    });

    setTheme(nextTheme.value);
  };

  return (
    <ThemeItem>
      <Button onClick={switchTheme}>
        <ThemeTitle>
          {currentMenu.value === "light" ? (
            <SunIcon width={16} height={16} />
          ) : (
            <MoonIcon />
          )}
        </ThemeTitle>
      </Button>
    </ThemeItem>
  );
};

const ThemeItem = styled("div", {
  display: "flex",
  alignItems: "center",
});

const Button = styled("div", {
  padding: `4px 2px 4px 6px`,
});

const ThemeTitle = styled("div", {
  color: theme.colors.gray12,
  fontSize: 16,
  flex: "1 1",

  ["svg"]: {
    display: "block",
  },
});
