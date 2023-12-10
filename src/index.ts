import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { runRouter } from "./run/run.router";
dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/run", runRouter);

async function main() {
	app.listen(PORT, () => {
		console.log("App listening on port " + PORT);
	});
}

main();
