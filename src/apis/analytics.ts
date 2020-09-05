// @ts-ignore;
const gtag = process.browser && window.gtag;

export namespace Analytics {
  export const id = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

  export function pageView(url) {
    gtag("config", id, {
      page_path: url,
    });
  }

  export function reportWebVitals({ id, name, label, value }) {
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
