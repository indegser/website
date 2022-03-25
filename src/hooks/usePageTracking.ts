import { useEffect } from "react";

import { amplitudeSdk } from "@src/sdks/amplitude";
import { Analytics } from "@src/sdks/analytics";

export const usePageTracking = (event: string, data?: any) => {
  useEffect(() => {
    if (!event) return;

    amplitudeSdk.getInstance().logEvent(event, data);
    Analytics.pageView(location.href);
  }, [event, data]);
};
