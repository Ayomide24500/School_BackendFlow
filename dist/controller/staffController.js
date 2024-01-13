"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSchoolTeacherByVicePrincipal = exports.createSchoolTeacherByPrincipal = exports.createSchoolTeacherByAdmin = exports.createVicePrincipal = exports.createSchoolPrincipal = void 0;
const SchoolModel_1 = __importDefault(require("../model/SchoolModel"));
const staffModel_1 = __importDefault(require("../model/staffModel"));
const enums_1 = require("../utils/enums");
const mongoose_1 = require("mongoose");
const createSchoolPrincipal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { schoolID } = req.params;
        const { staffName } = req.body;
        const school = yield SchoolModel_1.default.findById(schoolID);
        if (school && school.schoolName && school.status === "school-admin") {
            const staff = yield staffModel_1.default.create({
                staffName,
                role: enums_1.staffDuty.PRINCIPAL,
                schoolName: school.schoolName,
            });
            school.staff.push(new mongoose_1.Types.ObjectId(staff._id));
            school.save();
            return res.status(enums_1.StatusCode.CREATED).json({
                message: "principal created successfully",
                data: staff,
            });
        }
    }
    catch (error) {
        return res.status(enums_1.StatusCode.BAD_REQUEST).json({
            message: "error creating principal",
        });
    }
});
exports.createSchoolPrincipal = createSchoolPrincipal;
const createVicePrincipal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { schoolID } = req.params;
        const { staffName } = req.body;
        const school = yield SchoolModel_1.default.findById(schoolID);
        if (school && school.schoolName && school.status === "school-admin") {
            const staff = yield staffModel_1.default.create({
                staffName,
                role: enums_1.staffDuty.VICE_PRINCIPAL,
                schoolName: school.schoolName,
            });
            school.staff.push(new mongoose_1.Types.ObjectId(staff._id));
            school.save();
            return res.status(enums_1.StatusCode.CREATED).json({
                message: "staff created successfully",
                data: staff,
            });
        }
        else {
            return res.status(enums_1.StatusCode.CREATED).json({
                message: "error find school",
            });
        }
    }
    catch (error) {
        return res.status(enums_1.StatusCode.BAD_REQUEST).json({
            message: "error creating staff",
        });
    }
});
exports.createVicePrincipal = createVicePrincipal;
const createSchoolTeacherByAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { schoolID } = req.params;
        const { staffName } = req.body;
        const school = yield SchoolModel_1.default.findById(schoolID);
        if (school && school.schoolName && school.status === "school-admin") {
            const staff = yield staffModel_1.default.create({
                staffName,
                role: enums_1.staffDuty.TEACHER,
                schoolName: school.schoolName,
            });
            school.staff.push(new mongoose_1.Types.ObjectId(staff._id));
            school.save();
            return res.status(enums_1.StatusCode.CREATED).json({
                message: "teacher created successfully",
                data: staff,
            });
        }
        else {
            return res.status(enums_1.StatusCode.CREATED).json({
                message: "error find school",
            });
        }
    }
    catch (error) {
        return res.status(enums_1.StatusCode.BAD_REQUEST).json({
            message: "error creating teacher",
        });
    }
});
exports.createSchoolTeacherByAdmin = createSchoolTeacherByAdmin;
const createSchoolTeacherByPrincipal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { schoolID } = req.params;
        const { staffName } = req.body;
        const staff = yield staffModel_1.default.findById(schoolID);
        const school = yield SchoolModel_1.default.findOne({ schoolName: staff === null || staff === void 0 ? void 0 : staff.schoolName });
        if (school && school.schoolName && school.status === "principal") {
            const staff = yield staffModel_1.default.create({
                staffName,
                role: enums_1.staffDuty.TEACHER,
                schoolName: school.schoolName,
            });
            school.staff.push(new mongoose_1.Types.ObjectId(staff._id));
            school.save();
            return res.status(enums_1.StatusCode.CREATED).json({
                message: "teacher created successfully",
                data: staff,
            });
        }
        else {
            return res.status(enums_1.StatusCode.CREATED).json({
                message: "error find school",
            });
        }
    }
    catch (error) {
        return res.status(enums_1.StatusCode.BAD_REQUEST).json({
            message: "error creating teacher",
        });
    }
});
exports.createSchoolTeacherByPrincipal = createSchoolTeacherByPrincipal;
const createSchoolTeacherByVicePrincipal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { schoolID } = req.params;
        const { staffName } = req.body;
        const staff = yield staffModel_1.default.findById(schoolID);
        const school = yield SchoolModel_1.default.findOne({ schoolName: staff === null || staff === void 0 ? void 0 : staff.schoolName });
        if (school && school.schoolName && school.status === "vice-principal") {
            const staff = yield staffModel_1.default.create({
                staffName,
                role: enums_1.staffDuty.TEACHER,
                schoolName: school.schoolName,
            });
            school.staff.push(new mongoose_1.Types.ObjectId(staff._id));
            school.save();
            return res.status(enums_1.StatusCode.CREATED).json({
                message: "teacher created successfully",
                data: staff,
            });
        }
        else {
            return res.status(enums_1.StatusCode.CREATED).json({
                message: "error find school",
            });
        }
    }
    catch (error) {
        return res.status(enums_1.StatusCode.BAD_REQUEST).json({
            message: "error creating teacher",
        });
    }
});
exports.createSchoolTeacherByVicePrincipal = createSchoolTeacherByVicePrincipal;
