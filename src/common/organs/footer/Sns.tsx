import { styled, theme } from "common/stitches.config";
import copyTextToClipboard from "copy-text-to-clipboard";
import Link from "next/link";
import { Fragment, MouseEvent } from "react";
import toast, { Toaster } from "react-hot-toast";
import { SiNotion, SiTwitter, SiGithub, SiGmail } from "react-icons/si";

const snsList = [
  {
    link: "mailto:indegser@gmail.com",
    alt: "indegser",
    icon: <SiGmail />,
    onClick: (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      copyTextToClipboard("indegser@gmail.com");
      toast.success("Copied E-mail address to clipboard!", {
        icon: "😃",
        style: { fontSize: 14 },
      });
    },
  },
  {
    link: "https://twitter.com/indegser",
    alt: "Twitter @indegser",
    icon: <SiTwitter />,
  },
  {
    link: "https://gold-fine-6e5.notion.site/Resume-4c00854e08364af89a7b5e4d0aa9055c",
    alt: "Resume",
    icon: <SiNotion />,
  },
  { link: "https://github.com/indegser", alt: "Github", icon: <SiGithub /> },
];

export const Sns = () => {
  return (
    <Links>
      {snsList.map((sns, index) => (
        <Fragment key={sns.link}>
          {index > 0 ? <MidDot /> : null}
          <Link href={sns.link}>
            <a title={sns.alt} onClick={sns.onClick}>
              <LinkIcon>{sns.icon}</LinkIcon>
            </a>
          </Link>
        </Fragment>
      ))}
      <Toaster />
    </Links>
  );
};

const Links = styled("div", {
  display: "grid",
  gridAutoFlow: "column",
  gridAutoColumns: "max-content",
  alignItems: "center",
  justifyContent: "center",
  gridGap: "8px",
  position: "relative",
  gridArea: "sns",
});

const LinkIcon = styled("div", {
  padding: "4px",
  ["& svg"]: {
    display: "block",
    color: theme.colors.fgMuted,
  },
});

const MidDot = styled("div", {
  width: 2,
  height: 2,
  background: theme.colors.fgMuted,
  borderRadius: "999rem",
});
