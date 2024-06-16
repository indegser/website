import * as sdk from '@amplitude/analytics-browser';

import { isProduction, isServer } from 'lib/constants';

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
          event,
        );
      }
      return event;
    },
  };
};

async function init() {
  if (isServer) return;

  sdk.init(process.env.NEXT_PUBLIC_AMPLITUDE_KEY, undefined, {
    defaultTracking: {
      formInteractions: false,
    },
  });
  sdk.add(enrichPageUrlPlugin());
}

init();

export const amplitude = sdk;
