import { Router } from "express";
import {
  getAllClients,
  createNewClient,
  updateClient,
  createNewClientByTown,
} from "../controllers/client.controller";

const clientRouter = Router();

clientRouter.get("/", getAllClients);
clientRouter.post("/", createNewClient);
clientRouter.post("/:id", createNewClientByTown);
clientRouter.put("/:id", updateClient);
export default clientRouter;
