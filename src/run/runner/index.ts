import { spawn } from "child_process";
import { randomUUID } from "crypto";
import fs from "node:fs";
import fsAsync from "node:fs/promises";
import os from "os";
import path from "path";
import { Language, getExtention, getFileName, supportedLanguages } from "./helpers";

const solutionDirectory = path.join(os.tmpdir(), "submissions");

export const execute = (lang: Language, code: string): Promise<string> => {
	if (!supportedLanguages.includes(lang as any)) {
		throw new Error("Language not supported");
	}

	return new Promise(async (res, rej) => {
		let output = "";
		const id = randomUUID();
		const fileExtension: string = getExtention(lang);
		console.log(solutionDirectory);
		const filePath = path.join(solutionDirectory, `${id}.${fileExtension}`);

		if (!fs.existsSync(solutionDirectory)) {
			await fsAsync.mkdir(solutionDirectory);
		}
		await fsAsync.writeFile(filePath, code, { encoding: "utf-8" });

		const flags = [
			"--rm",
			"--network",
			"none",
			"-v",
			`${filePath}:/${getFileName(lang)}.${fileExtension}:ro`,
		];

		const container = spawn("docker", ["run", ...flags, `toyrce:${lang}`]);

		const timeout = setTimeout(() => {
			container.kill();
			res("Request timed out");
		}, 20000);

		container.stdout.on("data", (data) => (output += data));
		container.stderr.on("data", (data) => (output += data));

		container.on("exit", async () => {
			clearTimeout(timeout);
			await fsAsync.unlink(filePath);
			res(output);
		});

		container.on("error", () => rej("Error executing code"));
	});
};
