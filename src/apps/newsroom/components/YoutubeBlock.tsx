import { CustomYoutube } from "types/editor.types";
import { RenderElementProps } from "slate-react";
import YouTube from "react-youtube";
import getYoutubeId from "get-youtube-id";
import { css } from "@emotion/css";
import styled from "@emotion/styled";

interface Props extends RenderElementProps {
  element: CustomYoutube;
}

export const YoutubeBlock = (props: Props) => {
  const { attributes, children, element } = props;
  const { url } = element;

  return (
    <div {...attributes}>
      <YoutubeWrapper contentEditable={false}>
        <YouTube
          opts={{ width: "100%", height: "100%" }}
          containerClassName={containerClassName}
          videoId={getYoutubeId(url)}
        />
      </YoutubeWrapper>
      {children}
    </div>
  );
};

const YoutubeWrapper = styled.div`
  position: relative;
  padding-bottom: calc(9 / 16 * 100%);
  margin: 3rem 0;
`;

const containerClassName = css`
  position: absolute;
  width: 100%;
  height: 100%;
`;
