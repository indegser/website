import { useEffect } from 'react';

import { amplitudeSdk } from '@src/sdks/amplitude';

export const usePageTracking = (event: string, data?: any) => {
  useEffect(() => {
    if (!event) return;

    amplitudeSdk.getInstance().logEvent(event, data);
  }, [event, data]);
};
