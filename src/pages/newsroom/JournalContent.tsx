import { PortableText, PortableTextReactComponents } from "@portabletext/react";

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
};

export const JournalContent = (props: Props) => {
  const { journal } = props;

  return <PortableText value={journal.content} components={components} />;
};

const Paragraph = styled("div", {
  fontSize: 16,
  lineHeight: "26px",
  letterSpacing: "-0.008em",
  color: theme.colors.gray12,

  ["& + &"]: {
    marginTop: "1em",
  },

  [mq("sm")]: {
    fontSize: 17,
  },
});
