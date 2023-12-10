import express, { Router } from "express";
import * as runController from "./run.controller";

export const runRouter = Router();

runRouter.post("/", runController.runHandler);
