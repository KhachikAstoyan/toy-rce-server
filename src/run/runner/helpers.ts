export const supportedLanguages = [
	"javascript",
	"rust",
	"typescript",
	"go",
	"c",
	"cpp",
	"python",
	"java",
  "bash"
] as const;
export type Language = (typeof supportedLanguages)[number];

const langToExtention: { [key in Language]?: string } = {
	javascript: "js",
	rust: "rs",
	typescript: "ts",
	python: "py",
  bash: "sh",
} as const;

const langToName: { [key in Language]?: string } = {
	java: "Main",
};

export const getExtention = (lang: Language) => langToExtention[lang] ?? lang;
export const getFileName = (lang: Language) => langToName[lang] ?? "solution";
