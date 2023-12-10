import { spawn } from "child_process";
import { randomUUID } from "crypto";
import fs from "fs";
import os from "os";
import path from "path";
import { Language, getExtention, getFileName, supportedLanguages } from "./helpers";

const solutionDirectory = os.homedir();

export const execute = async (lang: Language, code: string): Promise<string> => {
	if (!supportedLanguages.includes(lang as any)) {
		throw new Error("Language not supported");
	}

	return new Promise((res, rej) => {
		let output = "";
		const id = randomUUID();
		const fileExtension: string = getExtention(lang);
		const filePath = path.join(solutionDirectory, `${id}.${fileExtension}`);

		if (!fs.existsSync(solutionDirectory)) {
			fs.mkdirSync(solutionDirectory);
		}

		fs.writeFileSync(filePath, code, { encoding: "utf-8" });

		const container = spawn("docker", [
			"run",
			"--rm",
			"--network",
			"none",
			"-v",
			`${filePath}:/${getFileName(lang)}.${fileExtension}:ro`,
			`toyrce:${lang}`,
		]);

		const timeout = setTimeout(() => {
			container.kill();
			res("Request timed out");
		}, 10000);

		container.stdout.on("data", (data) => (output += data));
		container.stderr.on("data", (data) => (output += data));
		container.on("exit", () => {
			clearTimeout(timeout);
			fs.unlinkSync(filePath);
			res(output);
		});

		container.on("error", () => rej("Error executing code"));
	});
};
