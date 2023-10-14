'use client';

import { useInView } from 'framer-motion';
import Link from 'next/link';
import { ElementRef, Fragment, useEffect, useRef } from 'react';
import { SiGithub, SiTwitter } from 'react-icons/si';

import { amplitude } from 'lib/amplitude';

const snsList = [
  {
    key: 'twitter',
    link: 'https://twitter.com/indegser',
    alt: 'Twitter @indegser',
    icon: <SiTwitter />,
  },
  {
    key: 'github',
    link: 'https://github.com/indegser',
    alt: 'Github',
    icon: <SiGithub />,
  },
];

export const Sns = () => {
  const ref = useRef<ElementRef<'div'>>(null);
  const inView = useInView(ref, { once: true });

  const handleClick = (type: string) => {
    amplitude.track('click_sns', {
      type,
    });
  };

  useEffect(() => {
    if (!inView) return;
    amplitude.track('view_sns');
  }, [inView]);

  return (
    <div
      ref={ref}
      className="grid grid-flow-col items-center justify-center gap-2"
    >
      {snsList.map((sns, index) => (
        <Fragment key={sns.link}>
          {index > 0 ? (
            <div className="h-0.5 w-0.5 rounded-full bg-gray-500" />
          ) : null}
          <Link
            href={sns.link}
            title={sns.alt}
            onClick={() => handleClick(sns.key)}
          >
            <div className="p-1 text-gray-500">{sns.icon}</div>
          </Link>
        </Fragment>
      ))}
    </div>
  );
};
