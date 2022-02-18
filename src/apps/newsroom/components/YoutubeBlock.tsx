import { CustomYoutube } from "types/editor.types";
import { RenderElementProps, useSlateStatic } from "slate-react";
import YouTube from "react-youtube";
import getYoutubeId from "get-youtube-id";
import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { CaptionBlock } from "./CaptionBlock";

interface Props extends RenderElementProps {
  element: CustomYoutube;
}

export const YoutubeBlock = (props: Props) => {
  const { attributes, children, element } = props;
  const { url } = element;
  const editor = useSlateStatic();

  return (
    <div {...attributes}>
      {children}
      <div contentEditable={false}>
        <YoutubeWrapper>
          <YouTube
            opts={{ width: "100%", height: "100%" }}
            containerClassName={containerClassName}
            videoId={getYoutubeId(url)}
          />
        </YoutubeWrapper>
        <CaptionBlock parentElement={element} parentEditor={editor} />
      </div>
    </div>
  );
};

const YoutubeWrapper = styled.div`
  position: relative;
  padding-bottom: calc(9 / 16 * 100%);
  margin: 1rem 0;
`;

const containerClassName = css`
  position: absolute;
  width: 100%;
  height: 100%;
`;
