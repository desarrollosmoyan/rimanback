import { Router } from "express";
import { getUser, signin, signup } from "../controllers/auth.controller";
import { checkExistingUser } from "../middlewares/checkSignup";
const authRouter = Router();

authRouter.post("/signup", [checkExistingUser], signup);
authRouter.post("/signin", signin);
authRouter.get("/user/:id", getUser);

export default authRouter;
