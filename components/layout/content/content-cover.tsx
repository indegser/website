'use client';

import { tailwindTheme } from '@/components/style-config';
import { easeIn, motion, useScroll, useTransform } from 'framer-motion';

interface Props {
  src: string;
  alt: string;
}

const createSrcSet = (
  orientation: 'landscape' | 'portrait',
  src: string,
  base: number,
) => {
  const widths = [base, base * 2];

  return widths
    .map((width, index) => {
      const url = new URL(src.replace('.png', '.webp'));
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

const mediaSet = [
  {
    max: parseInt(tailwindTheme.screens.md) - 1,
    orientation: 'portrait' as const,
    base: 800,
  },
  {
    min: parseInt(tailwindTheme.screens.md),
    max: parseInt(tailwindTheme.screens.lg) - 1,
    base: parseInt(tailwindTheme.screens.lg) - 1,
  },
  {
    min: parseInt(tailwindTheme.screens.lg),
    max: parseInt(tailwindTheme.screens.xl) - 1,
    base: parseInt(tailwindTheme.screens.xl) - 1,
  },
  {
    min: parseInt(tailwindTheme.screens.xl),
    base: parseInt(tailwindTheme.screens['2xl']) - 1,
  },
];

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
          {mediaSet.map(({ max, min, base, orientation }) => {
            const media = [
              max && `(max-width: ${max}px)`,
              min && `(min-width: ${min}px)`,
            ]
              .filter(Boolean)
              .join(' and ');

            return (
              <source
                key={media}
                media={media}
                srcSet={createSrcSet(orientation || 'landscape', src, base)}
                type="image/webp"
              />
            );
          })}
          <img src={src} alt={alt} className="h-full w-full" />
        </MotionImage>
      </Motion>
    </div>
  );
};

const Motion = motion.div;
const MotionImage = motion.picture;
