import { Schema, Types, model } from "mongoose";
import { iStaffData } from "../utils/interface";

const staffModel = new Schema<iStaffData>(
  {
    staffName: {
      type: String,
    },
    schoolName: {
      type: String,
    },
    staffRole: {
      type: String,
    },
    phone: {
      type: String,
    },
    school: {
      type: Types.ObjectId,
      ref: "schools",
    },
  },
  { timestamps: true }
);

export default model<iStaffData>("staffs", staffModel);
