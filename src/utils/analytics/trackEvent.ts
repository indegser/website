import { amplitudeSdk } from "@src/sdks/amplitude";
import { Analytics } from "@src/sdks/analytics";

export const trackEvent = (event: string, data?: any) => {
  if (!event) return;
  
  amplitudeSdk.getInstance().logEvent(event, data)
  Analytics.event(event, data)
}