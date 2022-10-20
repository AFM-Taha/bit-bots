import { Router } from "express";
import {
  // registerNewUserController,
  getUserController,
  createUserController,
  updateUserController,
  // checkUserController,
} from "../controller/userController.js";

import verifyUserAuthToken from "../middleware/verifyUserAuthToken.js";

const router = Router();

// router.route("/register-user").post(registerNewUserController);
router.route("/create-user").post(createUserController);
router.patch("/update-user", updateUserController);
router.get("/single-user", getUserController);
// router.post("/check-user", verifyUserAuthToken, checkUserController);

export default router;
