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

export const getUser = [
  param("id").isMongoId().withMessage("Invalid user id format"),

  validatorMiddleware,
];

export const updateUserRole = [
  param("id").isMongoId().withMessage("Invalid user id format"),

  role(),

  validatorMiddleware,
];

export const updateUserActiveStatus = [
  param("id").isMongoId().withMessage("Invalid user id format"),

  active(),

  validatorMiddleware,
];

export const deleteUser = [
  param("id").isMongoId().withMessage("Invalid user id format"),

  validatorMiddleware,
];
