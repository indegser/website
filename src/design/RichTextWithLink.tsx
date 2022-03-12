import { PropsWithChildren } from "react";

import { styled, theme } from "@src/common/stitches.config";

interface Props {
  link: { url: string } | null;
}

export const RichTextWithLink = ({
  link,
  children,
}: PropsWithChildren<Props>) => {
  if (link === null) {
    return <>{children}</>;
  }

  return <Link href={link.url}>{children}</Link>;
};

const Link = styled("a", {
  cursor: "pointer",
  textDecoration: "none",
  color: theme.colors.accentFg,

  ["&:hover"]: {
    textDecoration: "underline",
  },
});
