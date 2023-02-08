import { useEffect, useLayoutEffect } from 'react';

import { isServer } from '@src/types/env';

export const useIsomorphicLayoutEffect = isServer ? useEffect : useLayoutEffect;
