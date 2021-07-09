import styled from "@emotion/styled";
import { spacingVariables } from "common/variables";
import { mq } from "common/theme";
import { colors } from "style.types";
import { HTMLProps } from "react";

interface Props extends HTMLProps<HTMLImageElement> {}

const Image = styled.figure`
  --padding-x: 0px;

  ${mq(664)} {
    --padding-x: calc(var(${spacingVariables.pagePadding}) * -1);
  }

  display: block;
  margin: 3em var(--padding-x);

  img {
    max-width: 100%;
    display: block;
    height: auto;
    margin: 0 auto;
  }

  figcaption {
    display: block;
    padding-top: 12px !important;
    font-size: 13px;
    padding: 0 calc(var(--padding-x) * -1);
    color: ${colors.textFigcaption};
    letter-spacing: 0.03px;
  }
`;

const ImageRenderer = ({ alt, src }: Props) => {
  return (
    <Image>
      <img src={src} alt={alt} />
      <figcaption>{alt}</figcaption>
    </Image>
  );
};

export default ImageRenderer;
