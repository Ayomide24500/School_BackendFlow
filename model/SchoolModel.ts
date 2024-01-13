import { Schema, Types, model } from "mongoose";
import { iSchoolData } from "../utils/interface";

const SchoolModel = new Schema<iSchoolData>(
  {
    schoolName: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    address: {
      type: String,
    },
    status: {
      type: String,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    enrollmentID: {
      type: String,
    },
    session: [
      {
        type: Types.ObjectId,
        ref: "sessions",
      },
    ],

    staff: [
      {
        type: Types.ObjectId,
        ref: "staffs",
      },
    ],
  },
  { timestamps: true }
);

export default model<iSchoolData>("schools", SchoolModel);
