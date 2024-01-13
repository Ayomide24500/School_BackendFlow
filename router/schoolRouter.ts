import { Router } from "express";
import {
  changeSchoolAddress,
  changeSchoolName,
  createSchool,
  deleteSchool,
  getAllSchool,
  getSchoolCookie,
  signInSchool,
  verifySchool,
  viewSchoolstatus,
} from "../controller/schoolController";

const router: Router = Router();

router.route("/create-school").post(createSchool);
router.route("/log_in-school").post(signInSchool);
router.route("/verify-school/:schoolID").patch(verifySchool);
router.route("/view-school-status/:schoolID").get(viewSchoolstatus);
router.route("/logOut-school").delete(deleteSchool);
router.route("/read-school-cookie").get(getSchoolCookie);
router.route("/read-schools").get(getAllSchool);
router.route("/update-schoolname").patch(changeSchoolName);
router.route("/update-schooladdress").patch(changeSchoolAddress);

export default router;
