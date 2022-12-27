import { PortableText, PortableTextReactComponents } from "@portabletext/react";

import { JournalImage } from "./JournalImage";

import { Embed } from "@src/design/organs/content/embed/Embed";
import { mq } from "@src/design/theme/mediaQueries";
import { styled, theme } from "@src/design/theme/stitches.config";
import { JournalType } from "@src/types/cms";

interface Props {
  journal: JournalType;
}

const components: Partial<PortableTextReactComponents> = {
  block: {
    normal: ({ children }) => <Paragraph>{children}</Paragraph>,
  },
  types: {
    image: ({ value }) => {
      return <JournalImage asset={value.asset} />;
    },
    embed: ({ value }) => {
      return <Embed url={value.url} />;
    },
  },
};

export const JournalContent = (props: Props) => {
  const { journal } = props;

  return (
    <Content>
      <PortableText value={journal.content} components={components} />
    </Content>
  );
};

const Content = styled("div", {
  fontSize: 16,
  lineHeight: "26px",
  letterSpacing: "-0.008em",
  color: theme.colors.gray12,
});

const Paragraph = styled("div", {
  ["& + &"]: {
    marginTop: "1em",
  },

  [mq("sm")]: {
    fontSize: 17,
  },
});
