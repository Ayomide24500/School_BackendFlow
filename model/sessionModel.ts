import { Schema, Types, model } from "mongoose";
import { iSessionData } from "../utils/interface";

const sessionModel = new Schema<iSessionData>(
  {
    year: {
      type: String,
    },

    term: {
      type: String,
    },

    totalStudents: {
      type: Number,
      default: 0,
    },

    totalExpense: {
      type: Number,
      default: 0,
    },

    totalAmountRecieved: {
      type: Number,
      default: 0,
    },

    profit: {
      type: Number,
      default: 0,
    },

    school: {
      type: Types.ObjectId,
      ref: "schools",
    },
  },
  { timestamps: true }
);

export default model<iSessionData>("sessions", sessionModel);
