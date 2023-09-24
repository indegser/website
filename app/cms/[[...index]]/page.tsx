'use client';

import config from '@/sanity.config';
import { NextStudio } from 'next-sanity/studio';

export default function CMSPage() {
  return <NextStudio config={config} />;
}
