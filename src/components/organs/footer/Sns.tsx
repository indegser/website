import Link from 'next/link';
import { Fragment } from 'react';
import { SiNotion, SiTwitter, SiGithub } from 'react-icons/si';

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
    <div className="grid grid-flow-col items-center justify-center gap-2">
      {snsList.map((sns, index) => (
        <Fragment key={sns.link}>
          {index > 0 ? (
            <div className="h-0.5 w-0.5 rounded-full bg-gray-500" />
          ) : null}
          <Link href={sns.link} title={sns.alt}>
            <div className="p-1 text-gray-500">{sns.icon}</div>
          </Link>
        </Fragment>
      ))}
    </div>
  );
};
