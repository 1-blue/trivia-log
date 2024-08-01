import ProfileSection from "#/app/blog/(default)/_components/sections/ProfileSection";
import BioSection from "#/app/blog/(default)/_components/sections/BioSection";
import CalendarSection from "#/app/blog/(default)/_components/sections/CalendarSection";

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
