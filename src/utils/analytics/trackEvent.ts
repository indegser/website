import { amplitudeSdk } from "@src/sdks/amplitude";

export const trackEvent = (event: string, data?: any) => {
  if (!event) return;

  amplitudeSdk.getInstance().logEvent(event, data);
};
