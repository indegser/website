import Image from "next/image";

import { useNotionFileUrl } from "@src/design/notion/useNotionFileUrl";
import { mq } from "@src/design/theme/mediaQueries";
import { styled, theme } from "@src/design/theme/stitches.config";
import { CDN_ORIGIN } from "@src/types/const.types";
import { NewsPageType } from "@src/types/news.types";

interface Props {
  news: NewsPageType;
}

export const NewsCover = ({ news }: Props) => {
  const { cover } = news;
  const { getUrl } = useNotionFileUrl();

  if (cover === null) return null;

  const src = getUrl({ file: cover });
  const isFromCDN = src.includes(CDN_ORIGIN);

  return (
    <Container>
      <ImageBox>
        {isFromCDN ? (
          <Image src={src} layout="fill" objectFit="cover" alt="Title" />
        ) : (
          <picture>
            <source srcSet={src} />
            <PlainImage src={src} alt="Title" />
          </picture>
        )}
      </ImageBox>
    </Container>
  );
};

const Container = styled("div", {
  width: 132,
  height: 132,
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

const PlainImage = styled("img", {
  objectFit: "cover",
  width: "100%",
  height: "100%",
});
