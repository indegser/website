import styled from "@emotion/styled";
import { mediaQueries } from "common/theme";
import { colors } from "types/style.types";
import { useTheme } from "./Theme.hooks";

const Box = styled.div`
  flex: 0 0 auto;
  grid-area: theme;
  max-width: 140px;
  padding: 0 16px;
  justify-self: flex-end;
`;

const ThemeButton = styled.div`
  padding: 4px;
  border-radius: 4px;
  transition: 0.1s background ease;
  color: ${colors.gray500};
  cursor: pointer;

  ${mediaQueries.hoverable} {
    &:hover {
      color: ${colors.gray600};
      background-color: ${colors.bgIconHover};
    }
  }
`;

const ThemeIcon = styled.div`
  svg {
    width: 18px;
    height: 18px;
    display: block;
  }
`;

const Theme = () => {
  const { theme, handleChange } = useTheme();
  if (!theme) return null;

  const day = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
        clipRule="evenodd"
      />
    </svg>
  );

  const night = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
    </svg>
  );

  return (
    <Box>
      <ThemeButton onClick={handleChange}>
        <ThemeIcon>{theme === "light" ? day : night}</ThemeIcon>
      </ThemeButton>
    </Box>
  );
};

export default Theme;
