'use client';

import { easeIn, motion, useScroll, useTransform } from 'framer-motion';

interface Props {
  src: string;
  alt: string;
}

const createSrcSet = (orientation: 'landscape' | 'portrait', src: string) => {
  const widths = orientation === 'landscape' ? [1679, 3180] : [800, 1600];

  return widths
    .map((width, index) => {
      const url = new URL(src);
      const fragments = url.pathname.split('/');
      const spliceIndex = fragments.findIndex((value) => /v\d+/.test(value));
      const params = [
        'f_auto',
        'c_fill',
        'w_' + width,
        'g_auto',
        'q_auto',
        orientation === 'landscape' ? 'ar_16:9' : 'ar_2:3',
      ];

      fragments.splice(spliceIndex, 1, params.join(','));
      url.pathname = fragments.join('/');

      return url + ` ${index + 1}x`;
    })
    .join(',');
};

export const ContentCover = ({ src, alt }: Props) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 900], {
    ease: easeIn,
  });

  return (
    <div className="absolute inset-0">
      <Motion style={{ y }}>
        <MotionImage
          className="object-cover"
          style={{
            y,
          }}
        >
          <source
            media={`(orientation: landscape)`}
            srcSet={createSrcSet('landscape', src)}
            type="image/webp"
          ></source>
          <source
            media={`(orientation: portrait)`}
            srcSet={createSrcSet('portrait', src)}
            type="image/webp"
          />
          <img src={src} alt={alt} />
        </MotionImage>
      </Motion>
    </div>
  );
};

const Motion = motion.div;
const MotionImage = motion.picture;
