'use client';

import config from '@/lib/sanity/sanity.config';
import { NextStudio } from 'next-sanity/studio';
import { StudioLayout, StudioProvider } from 'sanity';

export default function StudioPage() {
  return (
    <NextStudio config={config}>
      <StudioProvider config={config}>
        <StudioLayout />
      </StudioProvider>
    </NextStudio>
  );
}
