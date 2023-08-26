import * as sdk from '@amplitude/analytics-browser';

import { isProduction, isServer } from '@src/types/env.types';

const enrichPageUrlPlugin = (): sdk.Types.EnrichmentPlugin => {
  return {
    execute: async (event: sdk.Types.Event) => {
      event.event_properties = {
        ...event.event_properties,
        page_url: location.href,
        page_title: document.title,
      };

      if (!isProduction) {
        console.log(
          `%c [Amplitude]`,
          'color: #888;',
          `${event.event_type}`,
          event.event_properties,
        );
      }
      return event;
    },
  };
};

if (!isServer) {
  sdk.init(process.env.NEXT_PUBLIC_AMPLITUDE_KEY);
  sdk.add(enrichPageUrlPlugin());
}

export const amplitude = sdk;
