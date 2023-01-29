import { PropsWithChildren } from "react";

import { useInitAmplitude } from "./BaseApp.hooks";

export const BaseApp = ({ children }: PropsWithChildren<{}>) => {
  useInitAmplitude();

  return <>{children}</>;
};
