import Image from "next/image";

import { useNotionFileUrl } from "@src/design/notion/useNotionFileUrl";
import { mq } from "@src/design/theme/mediaQueries";
import { styled, theme } from "@src/design/theme/stitches.config";
import { NewsType } from "@src/types/notion.types";

interface Props {
  news: NewsType;
}

export const NewsCover = ({ news }: Props) => {
  const { cover } = news;
  const { getUrl } = useNotionFileUrl();

  if (cover === null) return null;

  return (
    <Container>
      {cover && (
        <ImageBox>
          <Image
            src={getUrl({ file: cover })}
            layout="fill"
            objectFit="cover"
            alt="Title"
          />
        </ImageBox>
      )}
    </Container>
  );
};

const Container = styled("div", {
  width: 132,
  height: 132,
  borderRadius: 16,
  flex: "0 0 auto",
  background: theme.colors.gray3,
  overflow: "hidden",

  [mq("md")]: {
    width: 105,
    height: 105,
  },
});

const ImageBox = styled("div", {
  width: "100%",
  height: "100%",
  position: "relative",
});
