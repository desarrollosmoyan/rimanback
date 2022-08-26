import { model, Schema } from "mongoose";
import { TurnDocumentInterface } from "../types/turn.types";
import { userSchema } from "./User.model";
const turnSchema = new Schema<TurnDocumentInterface>({
  endDate: { type: Date, required: true },
  startDate: { type: Date, required: true },
  user: userSchema,
});

export default model("turn", turnSchema);
