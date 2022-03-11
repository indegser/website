import { CustomYoutube } from "@src/types/editor.types";
import { RenderElementProps, useSlateStatic } from "slate-react";
import YouTube from "react-youtube";
import getYoutubeId from "get-youtube-id";
import { CaptionBlock } from "./CaptionBlock";
import { css, styled } from "@src/common/stitches.config";

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
            containerClassName={containerClassName().className}
            videoId={getYoutubeId(url)}
          />
        </YoutubeWrapper>
        <CaptionBlock parentElement={element} parentEditor={editor} />
      </div>
    </div>
  );
};

const containerClassName = css({
  position: "absolute",
  width: "100%",
  height: "100%",
});

const YoutubeWrapper = styled("div", {
  position: "relative",
  paddingBottom: "calc(9 / 16 * 100%)",
  margin: "1rem 0",
});
