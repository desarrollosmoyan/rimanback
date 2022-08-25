import { Router } from "express";
import { signin, signup } from "../controllers/auth.controller";
import { checkExistingUser } from "../middlewares/checkSignup";
const authRouter = Router();

authRouter.post("/signup", [checkExistingUser], signup);
authRouter.post("/signin", signin);

export default authRouter;
