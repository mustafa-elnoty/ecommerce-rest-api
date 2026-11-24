import express from "express";

import * as authMiddleware from "../middlewares/auth-middleware.js";
import * as userValidator from "../validators/user-validator.js";
import * as userController from "../controllers/user-controller.js";

const router = express.Router();

router.use(authMiddleware.protect, authMiddleware.allowedTo("admin"));

router.route("/").get(userController.getUsers);

router
  .route("/:userId")
  .get(userValidator.getUser, userController.getUser)
  .delete(userValidator.deleteUser, userController.deleteUser);

router.patch(
  "/:userId/role",
  userValidator.updateUserRole,
  userController.updateUserRole,
);

router.patch(
  "/:userId/activeStatus",
  userValidator.updateUserActiveStatus,
  userController.updateUserActiveStatus,
);

export default router;
