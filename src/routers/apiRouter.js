import express from "express";
import { getAll, getPopuler } from "../controllers/songController.js";
import { signup } from "../controllers/userController.js";

const apiRouter = express.Router();

apiRouter.get("/songs", getAll);
apiRouter.get("/populer", getPopuler);
apiRouter.post("/signup", signup);

export default apiRouter;
