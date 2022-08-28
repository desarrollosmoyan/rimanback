import { Router } from "express";
import { createRoute, updateRoute } from "../controllers/route.controller";

const routeRouter = Router();

routeRouter.post("/:id", createRoute);
routeRouter.put("/:id", updateRoute);
export default routeRouter;
