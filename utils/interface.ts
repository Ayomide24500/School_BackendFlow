import { Document } from "mongoose";

interface iSchool {
  email: string;
  verify: boolean;
  enrollmentID: string;
  status: string;
  schoolName: string;
  address: string;
  session: Array<{}>;
  staff: Array<{}>;
}

interface iStaff {
  staffName: string;
  schoolName: string;
  staffRole: string;

  phone: string;
  school: {};
}

interface iSession {
  year: string;
  term: string;
  totalStudents: number;
  totalExpense: number;
  totalAmountRecieved: number;
  profit: number;

  school: {};
}

export interface iSessionData extends iSession, Document {}

export interface iStaffData extends iStaff, Document {}

export interface iSchoolData extends iSchool, Document {}
