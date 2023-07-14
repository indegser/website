'use client';

import { easeIn, motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

interface Props {
  src: string;
  alt: string;
}

export const ContentCover = ({ src, alt }: Props) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 900], {
    ease: easeIn,
  });

  return (
    <div className="absolute inset-0">
      <MotionImage
        src={src}
        fill
        alt={alt}
        fetchPriority="high"
        className="object-cover"
        style={{
          y,
        }}
      />
    </div>
  );
};

const MotionImage = motion(Image);
