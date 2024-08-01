/** 하나의 제목 영역 */
export interface ISection {
  /** 제목 텍스트 */
  text: string;
  /** 제목 경로 ( 텍스트와 유사하지만 특수문자들 특수 처리 ) */
  link: string;
}

/** 하나의 TOC */
export interface ITableOfContent extends ISection {
  subSections: ISection[];
}
