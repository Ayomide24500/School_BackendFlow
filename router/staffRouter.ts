import { Router } from "express";
import {
  createSchoolPrincipal,
  createSchoolTeacherByAdmin,
  createSchoolTeacherByPrincipal,
  createSchoolTeacherByVicePrincipal,
  createVicePrincipal,
} from "../controller/staffController";

const router: Router = Router();

router.route("/create-school-principal/:schoolID").post(createSchoolPrincipal);
router
  .route("/create-school-vice-principal/:schoolID")
  .post(createVicePrincipal);
router
  .route("/create-school-teacher-admin/:schoolID")
  .post(createSchoolTeacherByAdmin);
router
  .route("/create-school-teacher-principal/:schoolID")
  .post(createSchoolTeacherByPrincipal);
router
  .route("/create-school-teacher-vice-principal/:schoolID")
  .post(createSchoolTeacherByVicePrincipal);

export default router;
