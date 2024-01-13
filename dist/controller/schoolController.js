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
exports.getAllSchool = exports.changeSchoolAddress = exports.changeSchoolName = exports.getSchoolCookie = exports.deleteSchool = exports.logoutSchool = exports.viewSchoolstatus = exports.verifySchool = exports.signInSchool = exports.createSchool = void 0;
const SchoolModel_1 = __importDefault(require("../model/SchoolModel"));
const crypto_1 = __importDefault(require("crypto"));
const enums_1 = require("../utils/enums");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createSchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const id = crypto_1.default.randomBytes(2).toString("hex");
        const create = yield SchoolModel_1.default.create({
            email,
            enrollmentID: id,
            status: "vice principal",
        });
        return res.status(enums_1.StatusCode.CREATED).json({
            message: "school created successfully",
            data: create,
        });
    }
    catch (error) {
        return res.status(enums_1.StatusCode.BAD_REQUEST).json({
            message: "error creating school",
        });
    }
});
exports.createSchool = createSchool;
const signInSchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, enrollmentID } = req.body;
        const school = yield SchoolModel_1.default.findOne({ email });
        if (school) {
            if (school.enrollmentID === enrollmentID) {
                if (school.verify) {
                    const verify = jsonwebtoken_1.default.sign({ status: school.status }, "school", {
                        expiresIn: "1d",
                    });
                    (req.session.isAuth = true), (req.session.schoolID = school._id);
                    return res.status(enums_1.StatusCode.OK).json({
                        message: "School has been verify please verify, you can veriy now..!! 🚀🚀",
                        data: verify,
                    });
                }
                else {
                    return res.status(enums_1.StatusCode.BAD_REQUEST).json({
                        message: "School hasn't been verify please verify",
                    });
                }
            }
            else {
                return res.status(enums_1.StatusCode.BAD_REQUEST).json({
                    message: "Error reading token / id",
                });
            }
        }
        else {
            return res.status(enums_1.StatusCode.BAD_REQUEST).json({
                message: "Error find school",
            });
        }
    }
    catch (error) {
        return res.status(enums_1.StatusCode.BAD_REQUEST).json({
            message: "Error verifying school",
        });
    }
});
exports.signInSchool = signInSchool;
const verifySchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { schoolID } = req.params;
        const getSchool = yield SchoolModel_1.default.findById(schoolID);
        if (getSchool) {
            const verifySchool = yield SchoolModel_1.default.findByIdAndUpdate(schoolID, { verify: true }, { new: true });
            return res.status(enums_1.StatusCode.OK).json({
                message: "school verify successfully..!👍",
                data: verifySchool,
            });
        }
    }
    catch (error) {
        return res.status(enums_1.StatusCode.BAD_REQUEST).json({
            message: "error verifying school",
        });
    }
});
exports.verifySchool = verifySchool;
const viewSchoolstatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { schoolID } = req.params;
        const findSchool = yield SchoolModel_1.default.findById(schoolID);
        return res.status(enums_1.StatusCode.OK).json({
            message: "school gotten successfully by it's ID ..!🚀",
            data: findSchool,
        });
    }
    catch (error) {
        return res.status(enums_1.StatusCode.OK).json({
            message: "error school finding school by it's ID ..!",
        });
    }
});
exports.viewSchoolstatus = viewSchoolstatus;
const logoutSchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.session.destroy();
        return res.status(enums_1.StatusCode.BAD_REQUEST).json({
            message: "destroying school session ..☹️",
        });
    }
    catch (error) {
        return res.status(enums_1.StatusCode.BAD_REQUEST).json({
            message: "error destroying school session ..☹️",
        });
    }
});
exports.logoutSchool = logoutSchool;
const deleteSchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { schoolID } = req.params;
        const deleteschool = yield SchoolModel_1.default.findByIdAndDelete(schoolID);
        return res.status(enums_1.StatusCode.OK).json({
            message: "deleting school go well..!",
            data: deleteschool,
        });
    }
    catch (error) {
        return res.status(enums_1.StatusCode.OK).json({
            message: "deleting school go well..!",
        });
    }
});
exports.deleteSchool = deleteSchool;
const getSchoolCookie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const readSchool = req.session.isSchoolID;
        return res.status(enums_1.StatusCode.OK).json({
            message: "viewing school cookie",
            data: readSchool,
        });
    }
    catch (error) {
        return res.status(enums_1.StatusCode.BAD_REQUEST).json({
            message: "error viewing school cookies school",
        });
    }
});
exports.getSchoolCookie = getSchoolCookie;
const changeSchoolName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { schoolID } = req.params;
        const { schoolName } = req.body;
        const getSchool = yield SchoolModel_1.default.findById(schoolID);
        if (getSchool) {
            const updateName = yield SchoolModel_1.default.findByIdAndUpdate(schoolID, { schoolName }, { new: true });
            return res.status(enums_1.StatusCode.OK).json({
                message: "schoolName updated successfully...!🚀👍",
                data: updateName,
            });
        }
    }
    catch (error) {
        return res.status(enums_1.StatusCode.BAD_REQUEST).json({
            message: "error updating schoolName...!🪶",
        });
    }
});
exports.changeSchoolName = changeSchoolName;
const changeSchoolAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { schoolID } = req.params;
        const { address } = req.body;
        const getSchool = yield SchoolModel_1.default.findById(schoolID);
        if (getSchool) {
            const updateAddress = yield SchoolModel_1.default.findByIdAndUpdate(schoolID, { address }, { new: true });
            return res.status(enums_1.StatusCode.OK).json({
                message: "school address updated successfully...!🚀👍",
                data: updateAddress,
            });
        }
    }
    catch (error) {
        return res.status(enums_1.StatusCode.BAD_REQUEST).json({
            message: "error updating school address...!🪶",
        });
    }
});
exports.changeSchoolAddress = changeSchoolAddress;
const getAllSchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allSchool = yield SchoolModel_1.default.find();
        return res.status(enums_1.StatusCode.BAD_REQUEST).json({
            message: "viewing all school ..☹️",
            data: allSchool,
        });
    }
    catch (error) {
        return res.status(enums_1.StatusCode.BAD_REQUEST).json({
            message: "error viewing all school ..☹️",
        });
    }
});
exports.getAllSchool = getAllSchool;
