import { useEffect, useLayoutEffect } from 'react';

import { isServer } from '@src/types/env.types';

export const useIsomorphicLayoutEffect = isServer ? useEffect : useLayoutEffect;
