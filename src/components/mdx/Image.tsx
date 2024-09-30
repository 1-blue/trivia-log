"use client";

import { useCallback, useState } from "react";
import NextImage, { ImageProps } from "next/image";
import { motion } from "framer-motion";

import ImageModal from "#/components/mdx/ImageModal";

interface Props extends ImageProps {
  layoutId: string;
}

const Image: React.FC<Props> = ({ layoutId, ...restProps }) => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  return (
    <>
      <motion.div
        layoutId={layoutId}
        onClick={openModal}
        className="relative z-[5] cursor-pointer"
      >
        <figure className="relative my-2 aspect-video rounded-md object-contain">
          <NextImage {...restProps} />
        </figure>
      </motion.div>

      {isOpen && (
        <ImageModal
          layoutId={layoutId}
          closeModal={closeModal}
          {...restProps}
        />
      )}
    </>
  );
};

export default Image;
