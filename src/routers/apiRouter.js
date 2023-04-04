import express from "express";
import { getAll } from "../controllers/songController.js";

const apiRouter = express.Router();

apiRouter.get("/songs", getAll);

export default apiRouter;
