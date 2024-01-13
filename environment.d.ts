declare namespace NodeJS {
  interface ProcessEnv {
    [key: string]: string | undefined
    DATABASE_URL: string
    NEXT_PUBLIC_API_BASE_URL: string
  }
}