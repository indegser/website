import { PropsWithChildren } from "react";

import { useAppTheme, useInitAmplitude } from "./BaseApp.hooks";

export const BaseApp = ({ children }: PropsWithChildren<{}>) => {
  useAppTheme();
  useInitAmplitude();

  return <>{children}</>;
};
