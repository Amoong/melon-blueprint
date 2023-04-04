import express from "express";
import { home, insert } from "../controllers/songController.js";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.get("/insert", insert);

export default rootRouter;
