import { createContext, useContext } from "react";

import { SeriesType } from "@src/types/series.types";

const StoreContext = createContext<{ series: Record<string, SeriesType> }>(
  null
);

export const StoreProvider = StoreContext.Provider;

export const useSeriesStore = () => {
  const { series } = useContext(StoreContext);
  return series;
};
