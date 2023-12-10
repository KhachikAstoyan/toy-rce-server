export const supportedLanguages = ["javascript", "rust", "typescript", "go"] as const;
export type Language = (typeof supportedLanguages)[number];

export const langToExtention: { [key in Language]: string } = {
	javascript: "js",
	rust: "rs",
	typescript: "ts",
	go: "go",
} as const;
