'use client';

import * as RadioGroup from '@radix-ui/react-radio-group';
import { useInView } from 'framer-motion';
import Image from 'next/image';
import { ElementRef, useEffect, useRef } from 'react';

import starStruck from './star_struck.svg';
import thumbsUp from './thumbs_up.svg';
import yawning from './yawning.svg';

import { PageContent } from '@src/components/atoms/Container';
import { amplitude } from '@src/sdks/analytics';

const reactions = [
  {
    type: '유익해요',
    src: starStruck,
  },
  {
    type: '좋아요',
    src: thumbsUp,
  },
  {
    type: '지루해요',
    src: yawning,
  },
];

export const Feedback = () => {
  const ref = useRef<ElementRef<'div'>>(null);
  const isInView = useInView(ref, { amount: 'all', once: true });

  const handleSubmit = (type: string) => {
    amplitude.track('submit_feedback', {
      type,
    });
  };

  useEffect(() => {
    if (!isInView) return;

    amplitude.track('view_feedback');
  }, [isInView]);

  return (
    <PageContent>
      <div
        ref={ref}
        className="mt-8 grid justify-center gap-2 border-y py-4 dark:border-gray-700"
      >
        <div className="text-center text-sm font-semibold text-gray-800 dark:text-gray-400">
          도움이 되었나요?
        </div>
        <RadioGroup.Root onValueChange={(value) => handleSubmit(value)}>
          <div className="grid auto-cols-max grid-flow-col gap-2">
            {reactions.map(({ type, src }) => {
              return (
                <RadioGroup.Item key={type} value={type}>
                  <div className="grid cursor-pointer justify-items-center gap-1 p-2">
                    <RadioGroup.Indicator
                      asChild
                      forceMount
                      className="transition-all data-[state=checked]:scale-105 data-[state=checked]:!saturate-100"
                    >
                      <div className="saturate-0">
                        <Image alt={type} src={src} width={24} height={24} />
                      </div>
                    </RadioGroup.Indicator>
                    <div className="text-xs text-gray-500">{type}</div>
                  </div>
                </RadioGroup.Item>
              );
            })}
          </div>
        </RadioGroup.Root>
      </div>
    </PageContent>
  );
};
