import * as sdk from '@amplitude/analytics-browser';

import { isProduction, isServer } from '@src/types/env.types';

if (!isServer) {
  sdk.init(process.env.NEXT_PUBLIC_AMPLITUDE_KEY, {
    logLevel: isProduction ? sdk.Types.LogLevel.None : sdk.Types.LogLevel.Debug,
  });
}

export const amplitude = sdk;
