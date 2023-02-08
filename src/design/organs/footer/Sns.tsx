import Link from 'next/link';
import { Fragment, MouseEvent } from 'react';
import { SiNotion, SiTwitter, SiGithub } from 'react-icons/si';

import { styled, theme } from '@src/design/theme/stitches.config';

const snsList = [
  // {
  //   key: "email",
  //   link: "mailto:indegser@gmail.com",
  //   alt: "indegser",
  //   icon: <SiGmail />,
  //   onClick: (event: MouseEvent<HTMLAnchorElement>) => {
  //     event.preventDefault();
  //     copyTextToClipboard("indegser@gmail.com");
  //     toast.success("Copied E-mail address to clipboard!", {
  //       icon: "😃",
  //       style: { fontSize: 14 },
  //     });
  //   },
  // },
  {
    key: 'twitter',
    link: 'https://twitter.com/indegser',
    alt: 'Twitter @indegser',
    icon: <SiTwitter />,
  },
  {
    key: 'notion',
    link: 'https://gold-fine-6e5.notion.site/Resume-4c00854e08364af89a7b5e4d0aa9055c',
    alt: 'Resume',
    icon: <SiNotion />,
  },
  {
    key: 'github',
    link: 'https://github.com/indegser',
    alt: 'Github',
    icon: <SiGithub />,
  },
];

export const Sns = () => {
  const handleSnsClick = (
    event: MouseEvent<HTMLAnchorElement>,
    sns: (typeof snsList)[number]
  ) => {};

  return (
    <Links>
      {snsList.map((sns, index) => (
        <Fragment key={sns.link}>
          {index > 0 ? <MidDot /> : null}
          <Link
            href={sns.link}
            title={sns.alt}
            onClick={(event) => handleSnsClick(event, sns)}
          >
            <LinkIcon>{sns.icon}</LinkIcon>
          </Link>
        </Fragment>
      ))}
    </Links>
  );
};

const Links = styled('div', {
  display: 'grid',
  gridAutoFlow: 'column',
  gridAutoColumns: 'max-content',
  alignItems: 'center',
  justifyContent: 'center',
  gridGap: '8px',
  position: 'relative',
  gridArea: 'sns',
});

const LinkIcon = styled('div', {
  padding: '4px',
  color: theme.colors.gray10,
  fill: theme.colors.gray10,

  ['& svg']: {
    display: 'block',
  },

  ['&:hover']: {
    color: theme.colors.gray12,
    fill: theme.colors.gray12,
  },
});

const MidDot = styled('div', {
  width: 2,
  height: 2,
  background: theme.colors.gray10,
  borderRadius: '999rem',
});
