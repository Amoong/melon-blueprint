import express from "express";
import { home } from "../controllers/songController.js";

const rootRouter = express.Router();

rootRouter.get("/", home);

export default rootRouter;
