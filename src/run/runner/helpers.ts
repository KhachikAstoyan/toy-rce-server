export const supportedLanguages = [
	"javascript",
	"rust",
	"typescript",
	"go",
	"c",
	"cpp",
	"python",
] as const;
export type Language = (typeof supportedLanguages)[number];

const langToExtention: { [key in Language]?: string } = {
	javascript: "js",
	rust: "rs",
	typescript: "ts",
	python: "py",
} as const;

export const getExtention = (lang: Language) => langToExtention[lang] ?? lang;
