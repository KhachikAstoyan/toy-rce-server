export const supportedLanguages = ["javascript"] as const;
export type Language = (typeof supportedLanguages)[number];
