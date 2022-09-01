import { Router } from "express";
import {
  getUser,
  patchUser,
  signin,
  signup,
} from "../controllers/auth.controller";
import { checkExistingUser } from "../middlewares/checkSignup";
const authRouter = Router();

authRouter.post("/signup", [checkExistingUser], signup);
authRouter.post("/signin", signin);
authRouter.get("/user/:id", getUser);
authRouter.patch("/user", patchUser);
export default authRouter;
