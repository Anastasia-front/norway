import { format } from "date-fns";
import { enUS } from "date-fns/locale";

export const formateDate = (date: Date|string) => {
  const formattedDate = format(date, "EEE, d MMM", { locale: enUS });

  return formattedDate;
};
