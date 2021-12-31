// @ts-ignore;
const gtag = process.browser && window.gtag;

/**
 * NEXT_PUBLIC_GA_TRACKING_ID는 production Vercel 환경에만 주입 됨
 */
const trackingId = process.env.NEXT_PUBLIC_GA_TRACKING_ID ?? "";
export namespace Analytics {
  export function pageView(url: string) {
    if (!trackingId) {
      console.info(`Google Analytics disabled. Tracking id is empty`);
      return;
    }
    gtag("config", trackingId, {
      page_path: url,
    });
  }

  export function reportWebVitals({ id, name, label, value }) {
    if (!id) {
      console.info(`Google Analytics disabled. Tracking id is empty`);
      return;
    }

    gtag("send", "event", {
      eventCategory:
        label === "web-vital" ? "Web Vitals" : "Next.js custom metric",
      eventAction: name,
      eventValue: Math.round(name === "CLS" ? value * 1000 : value), // values must be integers
      eventLabel: id, // id unique to current page load
      nonInteraction: true, // avoids affecting bounce rate.
    });
  }
}
