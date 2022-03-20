import * as Primitive from "@radix-ui/react-dropdown-menu";
import { CaretDownIcon, CheckIcon } from "@radix-ui/react-icons";

import { styled, theme } from "@src/common/stitches.config";
import { useThemeStore } from "@src/design/themeStore";

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

  const handleClick = (value: typeof menus[number]["value"]) => {
    setTheme(value);
  };

  return (
    <Primitive.Root>
      <Button asChild>
        <ThemeItem>
          <ThemeTitle>{currentMenu.name}</ThemeTitle>
          <CaretDownIcon color={theme.colors.gray9.toString()} />
        </ThemeItem>
      </Button>
      <ThemeMenuContent align="end" sideOffset={8}>
        {menus.map((menu) => (
          <ThemeMenuItem
            key={menu.value}
            role="button"
            onClick={() => handleClick(menu.value)}
          >
            <ThemeTitle>{menu.name}</ThemeTitle>
            {menu.value === currentMenu.value && (
              <RightSlot>
                <CheckIcon
                  width={18}
                  height={18}
                  fill={theme.colors.gray11.toString()}
                />
              </RightSlot>
            )}
          </ThemeMenuItem>
        ))}
      </ThemeMenuContent>
    </Primitive.Root>
  );
};

const ThemeItem = styled("div", {
  display: "flex",
  alignItems: "center",
});

const Button = styled(Primitive.Trigger, {
  padding: `4px 2px 4px 6px`,
});

const ThemeMenuContent = styled(Primitive.Content, {
  padding: 4,
  borderRadius: 4,
  minWidth: 140,
  background: theme.colors.gray1,
  border: "1px solid",
  borderColor: theme.colors.gray5,
  boxShadow: `0px 0px 10px ${theme.colors.popoverShadow}`,
});

const ThemeMenuItem = styled(Primitive.Item, {
  display: "flex",
  alignItems: "center",
  color: theme.colors.gray12,
  padding: `4px 12px`,
  borderRadius: 4,
  fontSize: 14,
  cursor: "pointer",

  ["&:hover"]: {
    background: theme.colors.gray4,
  },
});

const RightSlot = styled("div", {
  flex: "0 0 auto",
  marginRight: -4,

  ["svg"]: {
    display: "block",
  },
});

const ThemeTitle = styled("div", {
  color: theme.colors.gray12,
  fontSize: 14,
  flex: "1 1",
});
