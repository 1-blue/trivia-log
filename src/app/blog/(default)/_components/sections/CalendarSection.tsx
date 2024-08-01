import Calendar from "#/app/blog/(default)/_components/Calendar";

interface Props {
  dates: Record<string, number>;
}

const CalendarSection: React.FC<Props> = ({ dates }) => {
  return (
    <section className="section-style flex flex-1 flex-col gap-4 xl:flex-row">
      <Calendar dates={dates} />
    </section>
  );
};

export default CalendarSection;
