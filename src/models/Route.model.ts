import { model, Schema, Types } from "mongoose";
import {
  RouteDocumentInterface,
  RouteModelInterface,
} from "../types/route.types";
import { townSchema } from "./Town.model";

export const routeSchema = new Schema<RouteDocumentInterface>({
  name: { type: String, required: true },
  towns: [{ type: Types.ObjectId, required: true, ref: "town" }],
  user_id: { type: Types.ObjectId, ref: "user" },
});

export default model<RouteDocumentInterface, RouteModelInterface>(
  "route",
  routeSchema
);
