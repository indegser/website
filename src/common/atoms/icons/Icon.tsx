import React, { SVGAttributes } from "react";
import styled from "@emotion/styled";

export enum IconVariant {
  logo = "logo",
  facebook = "facebook-logo",
  google = "google-logo",
  github = "github-logo",
  twitter = "twitter-logo",
  logoSimple = "logo-simple",
  link = "link",
  arrowDown = "arrow-down",
  footnoteLink = "footnote-link",
  close = "close",
  more = "more",
  lightTheme = "light-theme",
  darkTheme = "dark-theme",
  english = "english",
  korean = "korean",
  select = "select",
  loadMore = "load-more",
}

interface IIconProps extends SVGAttributes<SVGSVGElement> {
  variant: keyof typeof IconVariant;
  height?: number;
  width?: number;
  color?: string;
  style?: object;
}

const IconBox = styled.span`
  svg {
    display: block;
  }
`;

const Icon: React.FC<IIconProps> = ({ variant, color, ...props }) => {
  const filename = IconVariant[variant];
  const Component = require(`./${filename}.svg`).default;
  return (
    <IconBox style={{ color }}>
      <Component {...props} />
    </IconBox>
  );
};

export default Icon;
