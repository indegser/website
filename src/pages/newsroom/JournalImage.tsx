import { ImageAsset } from "@sanity/types";
import Image from "next/image";

import { styled } from "@src/design/theme/stitches.config";

interface Props {
  asset: ImageAsset;
}

export const JournalImage = (props: Props) => {
  const { asset } = props;
  const { width, height } = asset.metadata.dimensions;

  return (
    <Container style={{ aspectRatio: `${width} / ${height}` }}>
      <Image src={asset.url} alt="" fill blurDataURL={asset.metadata.lqip} />
    </Container>
  );
};

const Container = styled("div", {
  width: "100%",
  position: "relative",
});
