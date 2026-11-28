import express from "express";

import * as authController from "../controllers/auth-controller.js";
import * as authValidator from "../validators/auth-validator.js";

const router = express.Router();

router.post(
  "/signup",
  authValidator.registerValidator,
  authController.register,
);
router.post("/login", authValidator.loginValidator, authController.login);
router.post("/refreshAccessToken", authController.refreshAccessToken);
router.post("/logout", authController.logout);

router.post(
  "/forgotPassword",
  authValidator.forgotPasswordValidator,
  authController.forgotPassword,
);
router.post(
  "/verifyResetCode",
  authValidator.verifyResetCodeValidator,
  authController.verifyResetCode,
);
router.patch(
  "/resetPassword",
  authValidator.resetPasswordValidator,
  authController.resetPassword,
);

export default router;
