"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const SchoolModel = new mongoose_1.Schema({
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
            type: mongoose_1.Types.ObjectId,
            ref: "sessions",
        },
    ],
    staff: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "staffs",
        },
    ],
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("schools", SchoolModel);
