import { spawn } from "child_process";
import { randomUUID } from "crypto";
import fs from "fs";
import os from "os";
import path from "path";

const solutionDirectory = path.join(os.homedir(), "solutions");

export const execute = async (code: string): Promise<string> => {
	return new Promise((res, rej) => {
		let output = "";
		const id = randomUUID();
		const filePath = path.join(solutionDirectory, `${id}.js`);
		console.log(filePath);

		if (!fs.existsSync(solutionDirectory)) {
			fs.mkdirSync(solutionDirectory);
		}

		fs.writeFileSync(filePath, code, { encoding: "utf-8" });

		const process = spawn("node", [filePath]);

		const timeout = setTimeout(() => {
			process.kill();
			res("nice try :)");
		}, 5000);

		process.stdout.on("data", (data) => (output += data));
		process.stderr.on("data", (data) => (output += data));
		process.on("exit", () => {
			console.log("finished execution");
			clearTimeout(timeout);
			fs.unlinkSync(filePath);
			res(output);
		});
	});
};
