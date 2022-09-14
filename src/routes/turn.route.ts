import { Router } from "express";
import { endTurn } from "../controllers/turn.controller";
const turnRouter = Router();

turnRouter.post("/", endTurn);

export default turnRouter;
