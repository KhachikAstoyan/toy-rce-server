import { Request, Response } from "express";
import { Language } from "./runner/helpers";
import { execute } from "./runner";

export const runHandler = async (req: Request, res: Response) => {
	const lang = req.body.lang as Language;
	const code = req.body.code as string;

	console.log(`Executing ${lang}`);
	const start = Date.now();
	const output = await execute(lang, code);
	const end = Date.now();
	console.log(`Execution time: ${end - start}ms`);

	res.json({
		output,
	});
};
