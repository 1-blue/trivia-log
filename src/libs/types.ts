/** `supabase` + `tanstack-query`를 사용한 커스텀훅의 반환타입을 추출하는 타입 */
export type CustomHookReturnType<T extends (...args: any) => any> = Exclude<
  Exclude<ReturnType<T>["data"], undefined>["data"],
  null
>[number];
