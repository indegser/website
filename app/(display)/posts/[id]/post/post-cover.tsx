'use client';

import { urlForImage } from '@/lib/sanity';
import { easeIn, motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Image as SanityImage } from 'sanity';

interface Props {
  image: SanityImage;
  alt: string;
}

export const PostCover = ({ image, alt }: Props) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 900], {
    ease: easeIn,
  });

  const src = urlForImage(image).auto('format').url();

  return (
    <div className="absolute inset-0">
      <Motion style={{ y }} className="h-full w-full">
        <MotionImage
          src={src}
          alt={alt}
          fill
          objectFit="cover"
          priority
          style={{
            y,
          }}
        ></MotionImage>
      </Motion>
    </div>
  );
};

const Motion = motion.div;
const MotionImage = motion(Image);
