import { model, Schema } from "mongoose";
import {
  RouteDocumentInterface,
  RouteModelInterface,
} from "../types/route.types";
import { townSchema } from "./Town.model";

export const routeSchema = new Schema<RouteDocumentInterface>({
  name: { type: String, required: true },
  towns: { type: [townSchema], required: true, default: [] },
});

export default model<RouteDocumentInterface, RouteModelInterface>(
  "route",
  routeSchema
);
