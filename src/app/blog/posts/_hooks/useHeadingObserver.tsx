import { useEffect, useRef, useState } from "react";

import useScrollDirection from "#/hooks/useScrollDirection";

interface Props {
  query: string;
  headings: string[];
}

export const useHeadingsObserver = ({ query, headings }: Props) => {
  const { direction } = useScrollDirection();
  const observer = useRef<IntersectionObserver>();
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const scrollMarginOption: IntersectionObserverInit = {
      rootMargin: "-32px 0px -80px 0px",
    };

    const handleObserver: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        const targetId = `#${entry.target.id}`;

        // 헤딩 태그가 뷰포트에 들어온 경우
        if (entry.isIntersecting) {
          // 스크롤 방향이 위인 경우
          // 특정 제목이 들어오는 순간 이전 제목 포커스
          if (direction === "up") {
            const targetIndex = headings.findIndex((v) => v === targetId);
            setActiveId(headings[targetIndex - 1]);
          }
          // 스크롤 방향이 아래인 경우
          // 특정 제목에서 나가는 순간 다음 제목 포커스
          else {
            setActiveId(targetId);
          }
        }
      });
    };

    observer.current = new IntersectionObserver(
      handleObserver,
      scrollMarginOption,
    );

    // 게시글의 제목이 <h1>이라서 제외시킴
    const elements = document.querySelectorAll(query);
    [...elements].slice(1).forEach((elem) => observer.current?.observe(elem));

    return () => observer.current?.disconnect();
  }, [direction, headings, query]);

  return activeId;
};
