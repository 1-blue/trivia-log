"use client";

import { useState } from "react";
import Image from "next/image";
import { isMobile } from "react-device-detect";
import { type Variants, motion } from "framer-motion";

import Tooltip from "#/app/portfolio/_components/Tooltip";

const variants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

import type { Skill as SkillType } from "#/constants/skills";
interface Props extends SkillType {}

const Skill: React.FC<Props> = ({
  name,
  color,
  displayName,
  description,
  link,
}) => {
  const [isHover, setIsHover] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  return (
    <motion.figure
      className="relative h-20 w-20"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onTouchStart={() => setIsTouch((prev) => !prev)}
      variants={variants}
      role="button"
    >
      <Image
        src={`https://cdn.simpleicons.org/${name}/${color}`}
        alt={`${name} 아이콘`}
        width="80"
        height="80"
        className="rounded-md border-2 p-2"
        style={{ borderColor: color }}
      />

      <Tooltip
        show={isMobile ? isTouch : isHover}
        title={displayName}
        description={description}
        link={link}
        horizon="center"
        vertical="top"
        backgroundColor={color}
      />
    </motion.figure>
  );
};

export default Skill;
