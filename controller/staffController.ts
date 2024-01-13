import { Request, Response } from "express";
import SchoolModel from "../model/SchoolModel";
import staffModel from "../model/staffModel";
import { StatusCode, staffDuty } from "../utils/enums";
import { Types } from "mongoose";

export const createSchoolPrincipal = async (req: Request, res: Response) => {
  try {
    const { schoolID } = req.params;
    const { staffName } = req.body;

    const school = await SchoolModel.findById(schoolID);

    if (school && school.schoolName && school.status === "school-admin") {
      const staff = await staffModel.create({
        staffName,
        role: staffDuty.PRINCIPAL,
        schoolName: school.schoolName,
      });
      school.staff.push(new Types.ObjectId(staff._id));
      school.save();
      return res.status(StatusCode.CREATED).json({
        message: "principal created successfully",
        data: staff,
      });
    }
  } catch (error) {
    return res.status(StatusCode.BAD_REQUEST).json({
      message: "error creating principal",
    });
  }
};
export const createVicePrincipal = async (req: Request, res: Response) => {
  try {
    const { schoolID } = req.params;
    const { staffName } = req.body;

    const school = await SchoolModel.findById(schoolID);

    if (school && school.schoolName && school.status === "school-admin") {
      const staff = await staffModel.create({
        staffName,
        role: staffDuty.VICE_PRINCIPAL,
        schoolName: school.schoolName,
      });

      school.staff.push(new Types.ObjectId(staff._id));
      school.save();

      return res.status(StatusCode.CREATED).json({
        message: "staff created successfully",
        data: staff,
      });
    } else {
      return res.status(StatusCode.CREATED).json({
        message: "error find school",
      });
    }
  } catch (error) {
    return res.status(StatusCode.BAD_REQUEST).json({
      message: "error creating staff",
    });
  }
};
export const createSchoolTeacherByAdmin = async (
  req: Request,
  res: Response
) => {
  try {
    const { schoolID } = req.params;
    const { staffName } = req.body;

    const school = await SchoolModel.findById(schoolID);

    if (school && school.schoolName && school.status === "school-admin") {
      const staff = await staffModel.create({
        staffName,
        role: staffDuty.TEACHER,
        schoolName: school.schoolName,
      });

      school.staff.push(new Types.ObjectId(staff._id));
      school.save();

      return res.status(StatusCode.CREATED).json({
        message: "teacher created successfully",
        data: staff,
      });
    } else {
      return res.status(StatusCode.CREATED).json({
        message: "error find school",
      });
    }
  } catch (error) {
    return res.status(StatusCode.BAD_REQUEST).json({
      message: "error creating teacher",
    });
  }
};
export const createSchoolTeacherByPrincipal = async (
  req: Request,
  res: Response
) => {
  try {
    const { schoolID } = req.params;
    const { staffName } = req.body;

    const staff = await staffModel.findById(schoolID);
    const school = await SchoolModel.findOne({ schoolName: staff?.schoolName });

    if (school && school.schoolName && school.status === "principal") {
      const staff = await staffModel.create({
        staffName,
        role: staffDuty.TEACHER,
        schoolName: school.schoolName,
      });

      school.staff.push(new Types.ObjectId(staff._id));
      school.save();

      return res.status(StatusCode.CREATED).json({
        message: "teacher created successfully",
        data: staff,
      });
    } else {
      return res.status(StatusCode.CREATED).json({
        message: "error find school",
      });
    }
  } catch (error) {
    return res.status(StatusCode.BAD_REQUEST).json({
      message: "error creating teacher",
    });
  }
};
export const createSchoolTeacherByVicePrincipal = async (
  req: Request,
  res: Response
) => {
  try {
    const { schoolID } = req.params;
    const { staffName } = req.body;

    const staff = await staffModel.findById(schoolID);
    const school = await SchoolModel.findOne({ schoolName: staff?.schoolName });

    if (school && school.schoolName && school.status === "vice-principal") {
      const staff = await staffModel.create({
        staffName,
        role: staffDuty.TEACHER,
        schoolName: school.schoolName,
      });

      school.staff.push(new Types.ObjectId(staff._id));
      school.save();

      return res.status(StatusCode.CREATED).json({
        message: "teacher created successfully",
        data: staff,
      });
    } else {
      return res.status(StatusCode.CREATED).json({
        message: "error find school",
      });
    }
  } catch (error) {
    return res.status(StatusCode.BAD_REQUEST).json({
      message: "error creating teacher",
    });
  }
};
