import fs from "fs/promises";
import fsSync from "fs";
import path from "path";
import util from "util";
import { spawn } from "child_process";

const dockerFileDir = "./Dockerfiles";

// fs.readdir(dockerFileDir, (err, folders) => {
// 	folders.forEach((file) => console.log(file));
// });

async function main() {
	try {
		const folders = await fs.readdir(dockerFileDir);

		folders.forEach(async (folder) => {
			const languageDir = path.join(dockerFileDir, folder);
			const dockerfilePath = path.join(languageDir, "Dockerfile");

			if (fsSync.existsSync(dockerfilePath)) {
				console.log(`BUILDING ${folder} IMAGE`);
				const process = spawn("docker", ["build", "-t", `toyrce:${folder}`, languageDir]);

				process.stdout.on("data", function (data) {
					console.log("stdout: " + data.toString());
				});

				process.stderr.on("data", function (data) {
					console.log("stderr: " + data.toString());
				});

				process.on("exit", (code) => {
					console.log(`child procesz exited with code ${code}`);
					console.log(`FINISH BUILD ${folder} IMAGE`);
				});
			}
		});
	} catch (error) {
		console.error("An error occured while building images", error);
	}
}

main();
