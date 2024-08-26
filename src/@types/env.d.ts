declare namespace NodeJS {
  interface ProcessEnv {
    /** 실행 타입 */
    NODE_ENV: "development" | "production" | "test";

    /** 배포 `URL` */
    readonly NEXT_PUBLIC_CLIENT_URL: string;

    /** `Supabase URL` */
    readonly NEXT_PUBLIC_SUPABASE_URL: string;
    /** `Supabase Anon Key` */
    readonly NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
    /** `Supabase Project ID` ( `typescript`를 위한 타입 생성에 사용 ) */
    readonly SUPABASE_PROJECT_ID: string;

    /** `[OAuth - GitHub]` `supabase`에서만 사용 */
    readonly GITHUB_CLIENT_ID: string;
    /** `[OAuth - GitHub]` `supabase`에서만 사용 */
    readonly GITHUB_CLIENT_SECRET: string;
    
    /** `[OAuth - Google]` `supabase`에서만 사용 */
    readonly GOOGLE_CLIENT_ID: string;
    /** `[OAuth - Google]` `supabase`에서만 사용 */
    readonly GOOGLE_CLIENT_SECRET: string;
    
    /** `[OAuth - KakaoTalk]` `supabase`에서만 사용 */
    readonly KAKAOTALK_REST_API_KEY: string;
    /** `[OAuth - KakaoTalk]` `supabase`에서만 사용 */
    readonly KAKAOTALK_CLIENT_SECRET_CODE: string;
  }
}
