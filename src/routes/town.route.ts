import { Router } from "express";
import { createTown } from "../controllers/town.controller";
const townRouter = Router();

townRouter.post("/:id", createTown);

export default townRouter;
