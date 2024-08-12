import {
  backendSkills,
  etcSkills,
  frontendSkills,
  languages,
  TOOLS,
} from "#/constants/skills";

import Accordion from "#/app/portfolio/_components/Accordion";
import Skill from "#/app/portfolio/_components/Skill";

const Skills = () => {
  return (
    <article id="skills" className="px-[4vw] pb-20 pt-12 lg:px-[16vw]">
      <div className="mb-4 rounded-md bg-main-500 p-4 text-center text-lg font-bold text-white">
        수정예정) 진짜 색상 고르는게 제일 어렵다 어려워 뭘로하냐 진짜 어떻게
        하냐
      </div>
      <section className="mx-auto max-w-[1080px] space-y-8">
        <h3 className="text-center text-4xl font-bold text-white drop-shadow-lg">{`<Skills />`}</h3>

        {/* Tool */}
        <Accordion title="🪛 도구 🪛">
          {TOOLS.map((tool) => (
            <Skill key={tool.name} {...tool} />
          ))}
        </Accordion>

        {/* Language */}
        <Accordion title="📖 언어 📖">
          {languages.map((language) => (
            <Skill key={language.name} {...language} />
          ))}
        </Accordion>

        {/* FE */}
        <Accordion title="📤 프론트엔드 📤" defaultOpen>
          {frontendSkills.map((skill) => (
            <Skill key={skill.name} {...skill} />
          ))}
        </Accordion>

        {/* BE */}
        <Accordion title="📥 백엔드 📥" defaultOpen>
          {backendSkills.map((skill) => (
            <Skill key={skill.name} {...skill} />
          ))}
        </Accordion>

        {/* ETC */}
        <Accordion title="🎲 사용 경험만 있는 🎲">
          {etcSkills.map((skill) => (
            <Skill key={skill.name} {...skill} />
          ))}
        </Accordion>
      </section>
    </article>
  );
};

export default Skills;
