import React, { SVGAttributes } from "react";
import styled from "@emotion/styled";

export enum IconVariant {
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
