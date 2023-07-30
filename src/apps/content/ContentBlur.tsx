'use client';

import {
  useScroll,
  useSpring,
  useTransform,
  useMotionTemplate,
  motion,
} from 'framer-motion';

const MASK_IMAGE =
  'linear-gradient(to bottom,transparent,rgba(0,0,0,.068) 3.3%,rgba(0,0,0,.145) 5.9%,rgba(0,0,0,.227) 8.1%,rgba(0,0,0,.313) 10.1%,rgba(0,0,0,.401) 12.1%,rgba(0,0,0,.49) 14.6%,rgba(0,0,0,.578) 17.7%,rgba(0,0,0,.661) 21.8%,rgba(0,0,0,.74) 27.1%,rgba(0,0,0,.812) 33.9%,rgba(0,0,0,.875) 42.4%,rgba(0,0,0,.927) 53%,rgba(0,0,0,.966) 66%,rgba(0,0,0,.991) 81.5%,rgba(0,0,0,.991) 100%)';

export const ContentBlur = () => {
  const { scrollY } = useScroll();
  const springY = useSpring(scrollY);
  const saturate = useTransform(springY, (value) =>
    Math.max(190 + value * -0.01, 0),
  );

  // const blur = useTransform(springY, (value) => value * 0.32 + 60);
  const backdropFilter = useMotionTemplate`saturate(${saturate}%) blur(60px)`;

  return (
    <motion.div
      className="absolute inset-0"
      style={{
        maskImage: MASK_IMAGE,
        WebkitMaskImage: MASK_IMAGE,
        backdropFilter,
        WebkitBackdropFilter: backdropFilter,
      }}
    />
  );
};
