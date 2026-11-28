import express from "express";

import * as authMiddleware from "../middlewares/auth-middleware.js";
import * as multerUploadMiddleware from "../middlewares/multer-upload-middleware.js";
import * as localUploadMiddleware from "../middlewares/local-upload-middleware.js";
import * as profileController from "../controllers/profile-controller.js";
import * as profileValidator from "../validators/profile-validator.js";

const uploadCoverImage =
  multerUploadMiddleware.uploadSingleImage("profileImage");

const resizeCoverImage = localUploadMiddleware.uploadSingleImageToLocalStorage(
  "profileImage",
  "users",
);

const router = express.Router();

router.use(authMiddleware.protect);

router.get("/", profileController.getProfile);

router.patch(
  "/",
  uploadCoverImage,
  profileValidator.updateProfileValidator,
  resizeCoverImage,
  profileController.updateProfile,
);

router.patch(
  "/password",
  profileValidator.updatePasswordValidator,
  profileController.updatePassword,
);

router.patch("/deactivate", profileController.deactivateProfile);

export default router;
