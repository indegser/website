import { isServer } from "@src/types/env.types";

const gtag = !isServer && window.gtag;

const trackingId = process.env.NEXT_PUBLIC_GA_TRACKING_ID ?? "";

export namespace Analytics {
  export const id = trackingId;

  export function pageView(url: string) {
    if (!trackingId) {
      console.info(`Google Analytics disabled. Tracking id is empty`);
      return;
    }

    gtag("config", trackingId, {
      page_path: url,
    });
  }

  export function event(action: string, params: Gtag.EventParams) {
    gtag("event", action, params);
  }
}
