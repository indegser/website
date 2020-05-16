import { useState, useEffect } from "react";

export const useTheme = () => {
  const [theme, setTheme] = useState(undefined);

  const handleChange = ({ value }) => {
    localStorage.setItem("theme", value);
    setTheme(value);
    // @ts-ignore
    window.changeTheme();
  };

  useEffect(() => {
    const theme = document.documentElement.style.getPropertyValue("--theme");
    setTheme(theme);
  }, []);

  return {
    theme,
    handleChange,
  };
};
