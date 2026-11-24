import { body } from "express-validator";

import PROFILE_FIELDS from "../constants/profile-fields.js";
import requireAtLeastOneField from "../utils/require-at-least-one-field.js";
import validatorMiddleware from "../middlewares/validator-middleware.js";

const firstName = () =>
  body("firstName")
    .trim()
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage("First name must be between 2 and 50");

const lastName = () =>
  body("lastName")
    .trim()
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage("Last name must be between 2 and 50");

const email = () =>
  body("email").trim().optional().isEmail().withMessage("Invalid email");

const phone = () =>
  body("phone")
    .optional()
    .isMobilePhone(["ar-EG"])
    .withMessage("Phone number must be a valid Egyptian mobile number");

const currentPassword = () =>
  body("currentPassword")
    .trim()
    .notEmpty()
    .withMessage("Current password is required")
    .isLength({ min: 8 })
    .withMessage("The password must be at least 8 characters long");

const newPassword = () =>
  body("newPassword")
    .trim()
    .notEmpty()
    .withMessage("New password is required")
    .isLength({ min: 8 })
    .withMessage("The New password must be at least 8 characters long");

const newPasswordConfirm = () =>
  body("newPasswordConfirm")
    .trim()
    .notEmpty()
    .withMessage("Password confirm is required")
    .custom((val, { req }) => {
      if (val !== req.body.newPassword)
        throw new Error("Password confirmation does not match new password");
      return true;
    });

export const updateProfile = [
  requireAtLeastOneField(PROFILE_FIELDS),

  firstName(),
  lastName(),
  email(),
  phone(),

  validatorMiddleware,
];

export const updatePassword = [
  currentPassword(),
  newPassword(),
  newPasswordConfirm(),

  validatorMiddleware,
];
