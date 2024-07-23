import { twMerge } from "tailwind-merge";

import { SECTION_STYLE } from "../_constant";
import Calendar from "../_components/Calendar";

interface Props {
  dates: Record<string, number>;
}

const CalendarSection: React.FC<Props> = ({ dates }) => {
  return (
    <section
      className={twMerge(
        SECTION_STYLE,
        "flex flex-1 flex-col gap-4 xl:flex-row",
      )}
    >
      <Calendar dates={dates} />
    </section>
  );
};

export default CalendarSection;
