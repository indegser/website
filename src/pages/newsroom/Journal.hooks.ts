import dayjs from "dayjs";
import "dayjs/locale/ko";
import calendar from "dayjs/plugin/calendar";
import { useMemo } from "react";

import { JournalType } from "@src/types/cms";

dayjs.extend(calendar);

export const useJournalUpdatedAt = (journal: JournalType) => {
  return useMemo(() => {
    return dayjs(journal._createdAt).locale("ko").calendar(null, {
      sameDay: "[오늘] A h:mm", // The same day ( Today at 2:30 AM )
      lastDay: "[어제] A h:mm", // The day before ( Yesterday at 2:30 AM )
      lastWeek: "[지난] dddd", // Last week ( Last Monday at 2:30 AM )
      sameElse: "YYYY[년] MMMM D[일]", // Everything else ( 17/10/2011 )
    });
  }, [journal._createdAt]);
};
