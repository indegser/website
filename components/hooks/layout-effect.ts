import { useEffect, useLayoutEffect } from 'react';

import { isServer } from 'lib/constants';

export const useIsomorphicLayoutEffect = isServer ? useEffect : useLayoutEffect;
