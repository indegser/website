'use client';

import config from '@/lib/sanity/sanity.config';
import { ThemeProvider } from '@sanity/ui';
import { buildTheme } from '@sanity/ui/theme';
import { NextStudio } from 'next-sanity/studio';
import { StudioLayout, StudioProvider } from 'sanity';

const theme = buildTheme();

export default function StudioPage() {
  return (
    <NextStudio config={config}>
      <StudioProvider config={config}>
        <ThemeProvider theme={theme}>
          <StudioLayout />
        </ThemeProvider>
      </StudioProvider>
    </NextStudio>
  );
}
