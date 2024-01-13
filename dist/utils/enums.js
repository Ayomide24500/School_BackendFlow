"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.staffDuty = exports.Teacher_Roles = exports.StatusCode = void 0;
var StatusCode;
(function (StatusCode) {
    StatusCode[StatusCode["OK"] = 200] = "OK";
    StatusCode[StatusCode["CREATED"] = 201] = "CREATED";
    StatusCode[StatusCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
})(StatusCode || (exports.StatusCode = StatusCode = {}));
var Teacher_Roles;
(function (Teacher_Roles) {
    Teacher_Roles["HEAD_TEACHER"] = "head teacher";
    Teacher_Roles["SUBJECT_TEACHER"] = "subject of teacher";
    Teacher_Roles["ASSISTANT_TEACHER"] = "assistant of a teacher";
})(Teacher_Roles || (exports.Teacher_Roles = Teacher_Roles = {}));
var staffDuty;
(function (staffDuty) {
    staffDuty["VICE_PRINCIPAL"] = "vice principal, ";
    staffDuty["PRINCIPAL"] = "principal";
    staffDuty["TEACHER"] = "teacher";
})(staffDuty || (exports.staffDuty = staffDuty = {}));
