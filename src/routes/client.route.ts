import { Router } from "express";
import {
  getAllClients,
  createNewClient,
  updateClient,
  createNewClientByTown,
  deleteClient,
} from "../controllers/client.controller";

const clientRouter = Router();

clientRouter.get("/", getAllClients);
clientRouter.post("/", createNewClient);
clientRouter.post("/:id", createNewClientByTown);
clientRouter.put("/:id", updateClient);
clientRouter.delete("/:id", deleteClient);

export default clientRouter;
