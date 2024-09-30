"use client";

import { useEffect } from "react";
import Image, { type ImageProps } from "next/image";
import { motion } from "framer-motion";

interface Props extends Pick<ImageProps, "src" | "alt"> {
  layoutId: string;
  closeModal: () => void;
}

const ImageModal: React.FC<Props> = ({
  layoutId,
  closeModal,
  ...restProps
}) => {
  useEffect(() => {
    const preventScroll = (e: WheelEvent) => e.preventDefault();

    window.addEventListener("wheel", preventScroll, { passive: false });
    return () => window.removeEventListener("wheel", preventScroll);
  }, []);

  return (
    <>
      <div className="fixed inset-0 z-[11] bg-black/60" />

      <motion.div
        layoutId={layoutId}
        className="fixed inset-0 z-[11] flex cursor-pointer items-center justify-center"
        onClick={closeModal}
      >
        <figure className="relative aspect-video w-[90%] max-w-7xl object-contain">
          <Image {...restProps} />
        </figure>
      </motion.div>
    </>
  );
};

export default ImageModal;
