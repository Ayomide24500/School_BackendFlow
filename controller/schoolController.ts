import { Request, Response } from "express";
import SchoolModel from "../model/SchoolModel";
import crypto from "crypto";
import { StatusCode } from "../utils/enums";
import jwt from "jsonwebtoken";
export const createSchool = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email } = req.body;

    const id = crypto.randomBytes(2).toString("hex");

    const create = await SchoolModel.create({
      email,
      enrollmentID: id,
      status: "vice principal",
    });
    return res.status(StatusCode.CREATED).json({
      message: "school created successfully",
      data: create,
    });
  } catch (error) {
    return res.status(StatusCode.BAD_REQUEST).json({
      message: "error creating school",
    });
  }
};

export const signInSchool = async (
  req: any,
  res: Response
): Promise<Response> => {
  try {
    const { email, enrollmentID } = req.body;

    const school = await SchoolModel.findOne({ email });

    if (school) {
      if (school.enrollmentID === enrollmentID) {
        if (school.verify) {
          const verify = jwt.sign({ status: school.status }, "school", {
            expiresIn: "1d",
          });
          (req.session.isAuth = true), (req.session.schoolID = school._id);

          return res.status(StatusCode.OK).json({
            message:
              "School has been verify please verify, you can veriy now..!! 🚀🚀",
            data: verify,
          });
        } else {
          return res.status(StatusCode.BAD_REQUEST).json({
            message: "School hasn't been verify please verify",
          });
        }
      } else {
        return res.status(StatusCode.BAD_REQUEST).json({
          message: "Error reading token / id",
        });
      }
    } else {
      return res.status(StatusCode.BAD_REQUEST).json({
        message: "Error find school",
      });
    }
  } catch (error) {
    return res.status(StatusCode.BAD_REQUEST).json({
      message: "Error verifying school",
    });
  }
};

export const verifySchool = async (req: Request, res: Response) => {
  try {
    const { schoolID } = req.params;
    const getSchool = await SchoolModel.findById(schoolID);

    if (getSchool) {
      const verifySchool = await SchoolModel.findByIdAndUpdate(
        schoolID,
        { verify: true },
        { new: true }
      );
      return res.status(StatusCode.OK).json({
        message: "school verify successfully..!👍",
        data: verifySchool,
      });
    }
  } catch (error) {
    return res.status(StatusCode.BAD_REQUEST).json({
      message: "error verifying school",
    });
  }
};

export const viewSchoolstatus = async (req: Request, res: Response) => {
  try {
    const { schoolID } = req.params;

    const findSchool = await SchoolModel.findById(schoolID);

    return res.status(StatusCode.OK).json({
      message: "school gotten successfully by it's ID ..!🚀",
      data: findSchool,
    });
  } catch (error) {
    return res.status(StatusCode.OK).json({
      message: "error school finding school by it's ID ..!",
    });
  }
};

export const logoutSchool = async (
  req: any,
  res: Response
): Promise<Response> => {
  try {
    req.session.destroy();
    return res.status(StatusCode.BAD_REQUEST).json({
      message: "destroying school session ..☹️",
    });
  } catch (error) {
    return res.status(StatusCode.BAD_REQUEST).json({
      message: "error destroying school session ..☹️",
    });
  }
};

export const deleteSchool = async (req: Request, res: Response) => {
  try {
    const { schoolID } = req.params;

    const deleteschool = await SchoolModel.findByIdAndDelete(schoolID);

    return res.status(StatusCode.OK).json({
      message: "deleting school go well..!",
      data: deleteschool,
    });
  } catch (error) {
    return res.status(StatusCode.OK).json({
      message: "deleting school go well..!",
    });
  }
};

export const getSchoolCookie = async (req: any, res: Response) => {
  try {
    const readSchool = req.session.isSchoolID;
    return res.status(StatusCode.OK).json({
      message: "viewing school cookie",
      data: readSchool,
    });
  } catch (error) {
    return res.status(StatusCode.BAD_REQUEST).json({
      message: "error viewing school cookies school",
    });
  }
};

export const changeSchoolName = async (req: Request, res: Response) => {
  try {
    const { schoolID } = req.params;
    const { schoolName } = req.body;

    const getSchool = await SchoolModel.findById(schoolID);
    if (getSchool) {
      const updateName = await SchoolModel.findByIdAndUpdate(
        schoolID,
        { schoolName },
        { new: true }
      );

      return res.status(StatusCode.OK).json({
        message: "schoolName updated successfully...!🚀👍",
        data: updateName,
      });
    }
  } catch (error) {
    return res.status(StatusCode.BAD_REQUEST).json({
      message: "error updating schoolName...!🪶",
    });
  }
};
export const changeSchoolAddress = async (req: Request, res: Response) => {
  try {
    const { schoolID } = req.params;
    const { address } = req.body;

    const getSchool = await SchoolModel.findById(schoolID);
    if (getSchool) {
      const updateAddress = await SchoolModel.findByIdAndUpdate(
        schoolID,
        { address },
        { new: true }
      );

      return res.status(StatusCode.OK).json({
        message: "school address updated successfully...!🚀👍",
        data: updateAddress,
      });
    }
  } catch (error) {
    return res.status(StatusCode.BAD_REQUEST).json({
      message: "error updating school address...!🪶",
    });
  }
};

export const getAllSchool = async (
  req: any,
  res: Response
): Promise<Response> => {
  try {
    const allSchool = await SchoolModel.find();
    return res.status(StatusCode.BAD_REQUEST).json({
      message: "viewing all school ..☹️",
      data: allSchool,
    });
  } catch (error) {
    return res.status(StatusCode.BAD_REQUEST).json({
      message: "error viewing all school ..☹️",
    });
  }
};
