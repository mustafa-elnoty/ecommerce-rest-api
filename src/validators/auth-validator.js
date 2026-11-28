import { body } from "express-validator";
import validatorMiddleware from "../middlewares/validator-middleware.js";

const email = () =>
  body("email")
    .trim()
    .notEmpty()
    .withMessage("You must enter your email")
    .isEmail()
    .withMessage("Invalid email format");

const password = () =>
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters");

const firstName = () =>
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("You must enter your first name")
    .isLength({ min: 2, max: 50 })
    .withMessage("First name must be between 2 and 50");

const lastName = () =>
  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("You must enter your last name")
    .isLength({ min: 2, max: 50 })
    .withMessage("Last name must be between 2 and 50");

const resetCode = () =>
  body("resetCode")
    .trim()
    .notEmpty()
    .withMessage("Reset code is required")
    .isLength({ min: 6, max: 6 })
    .withMessage("Reset code must be 6 digits");

const resetToken = () =>
  body("resetToken")
    .trim()
    .notEmpty()
    .withMessage("Reset token is required")
    .isLength({ min: 64, max: 64 })
    .withMessage("Invalid or expire reset token");

const newPassword = () =>
  body("newPassword")
    .trim()
    .notEmpty()
    .withMessage("New password is required")
    .isLength({ min: 8 })
    .withMessage("The password must be at least 8 characters long");

const newPasswordConfirm = () =>
  body("newPasswordConfirm")
    .trim()
    .notEmpty()
    .withMessage("Password confirmation is required")
    .custom((val, { req }) => {
      if (val !== req.body.newPassword)
        throw new Error("Password confirmation does not match new password");
      return true;
    });

export const registerValidator = [
  firstName(),
  lastName(),
  email(),
  password(),

  validatorMiddleware,
];

export const loginValidator = [email(), password(), validatorMiddleware];

export const forgotPasswordValidator = [email(), validatorMiddleware];

export const verifyResetCodeValidator = [
  email(),
  resetCode(),
  validatorMiddleware,
];

export const resetPasswordValidator = [
  resetToken(),
  newPassword(),
  newPasswordConfirm(),

  validatorMiddleware,
];
