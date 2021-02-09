import { useState, useEffect } from "react";
import { ThemeType } from "style.types";

export const useTheme = () => {
  const [theme, setTheme] = useState<ThemeType>(undefined);

  const handleChange = () => {
    const nextValue = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", nextValue);
    setTheme(nextValue);
    // @ts-ignore
    window.changeTheme();
  };

  useEffect(() => {
    const theme = document.documentElement.style.getPropertyValue(
      "--theme"
    ) as ThemeType;
    setTheme(theme);
  }, []);

  return {
    theme,
    handleChange,
  };
};
