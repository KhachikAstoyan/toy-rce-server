import { Request, Response } from "express";
import { Language } from "./types";
import { execute } from "./runners/javascript";

export const runHandler = async (req: Request, res: Response) => {
	const lang = req.body.lang as Language;
	const code = req.body.code as string;

	const output = await execute(code);

	res.json({
		output,
	});
};
