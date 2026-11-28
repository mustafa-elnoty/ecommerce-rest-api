import { param, body } from "express-validator";

import validatorMiddleware from "../middlewares/validator-middleware.js";

const role = () =>
  body("role")
    .notEmpty()
    .withMessage("Role is required")
    .isIn(["user", "admin"])
    .withMessage("Role must be either 'user' or 'admin'");

const active = () =>
  body("active")
    .trim()
    .notEmpty()
    .withMessage("Active field is required")
    .toBoolean()
    .isBoolean()
    .withMessage("Active field must be a boolean value");

const userIdParam = () =>
  param("id").isMongoId().withMessage("Invalid user id format");

export const getUserValidator = [userIdParam(), validatorMiddleware];

export const updateUserRoleValidator = [
  userIdParam(),
  role(),

  validatorMiddleware,
];

export const updateUserActiveStatusValidator = [
  userIdParam(),
  active(),

  validatorMiddleware,
];

export const deleteUserValidator = [userIdParam(), validatorMiddleware];
