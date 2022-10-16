import { Router } from "express";
import {
  registerNewUserController,
  loginUserController,
  updateUserController,
  checkUserController,
} from "../controller/userController.js";

import verifyUserAuthToken from "../middleware/verifyUserAuthToken.js";

const router = Router();

router.post("/register-user", (req, res) => {
  console.log(req.body);
});
router.route("/login-user").post(loginUserController);
router.patch("/update-user", verifyUserAuthToken, updateUserController);
router.post("/check-user", verifyUserAuthToken, checkUserController);

export default router;
