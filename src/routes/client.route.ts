import { Router } from "express";
import {
  getAllClients,
  createNewClient,
  updateClient,
} from "../controllers/client.controller";

const clientRouter = Router();

clientRouter.get("/", getAllClients);
clientRouter.post("/", createNewClient);
clientRouter.put("/:id", updateClient);
export default clientRouter;
