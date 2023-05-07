import styled from '@emotion/styled';
import Link from 'next/link';
import { Fragment } from 'react';
import { SiNotion, SiTwitter, SiGithub } from 'react-icons/si';

import { theme } from '@src/design/theme';

const snsList = [
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
  return (
    <Links>
      {snsList.map((sns, index) => (
        <Fragment key={sns.link}>
          {index > 0 ? <MidDot /> : null}
          <Link href={sns.link} title={sns.alt}>
            <LinkIcon>{sns.icon}</LinkIcon>
          </Link>
        </Fragment>
      ))}
    </Links>
  );
};

const Links = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: relative;
  grid-area: sns;
`;

const LinkIcon = styled.div`
  padding: 4px;
  color: ${theme.colors.gray10.computedValue};
  fill: currentColor;

  & svg {
    display: block;
  }

  &:hover {
    color: ${theme.colors.gray12.computedValue};
  }
`;

const MidDot = styled.div`
  width: 2px;
  height: 2px;
  background: ${theme.colors.gray10.computedValue};
  border-radius: 999rem;
`;
