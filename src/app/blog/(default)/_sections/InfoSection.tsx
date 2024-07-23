import ProfileSection from "./ProfileSection";
import BioSection from "./BioSection";
import CalendarSection from "./CalendarSection";

interface Props {
  dates: Record<string, number>;
}

const InfoSection: React.FC<Props> = ({ dates }) => {
  return (
    <>
      <ProfileSection />

      {/* 자기소개 및 캘린더 */}
      <section className="flex flex-1 flex-col gap-4">
        <BioSection />
        <CalendarSection dates={dates} />
      </section>
    </>
  );
};

export default InfoSection;
