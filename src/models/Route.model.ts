import { Schema } from "mongoose";
import { RouteDocumentInterface } from "../types/route.types";
import { townSchema } from "./Town.model";

export const routeSchema = new Schema<RouteDocumentInterface>({
  name: { type: String, required: true },
  towns: [townSchema],
});
