import express from "express";
import { getAll, getPopuler } from "../controllers/songController.js";

const apiRouter = express.Router();

apiRouter.get("/songs", getAll);
apiRouter.get("/populer", getPopuler);

export default apiRouter;
