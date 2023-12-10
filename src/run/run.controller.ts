import { Request, Response } from "express";
import { Language } from "./runner/helpers";
import { execute } from "./runner";

export const runHandler = async (req: Request, res: Response) => {
	const lang = req.body.lang as Language;
	const code = req.body.code as string;

	const output = await execute(lang, code);

	res.json({
		output,
	});
};
