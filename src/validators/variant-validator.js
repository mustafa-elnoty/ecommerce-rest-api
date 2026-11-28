import { body, param } from "express-validator";

import { ALLOWED_VARIANT_UPDATE_FIELDS } from "../constants/variant-fields.js";
import requireAtLeastOneField from "../utils/require-at-least-one-field.js";
import requiredOrOptional from "../helpers/required-or-optional.js";
import validatorMiddleware from "../middlewares/validator-middleware.js";

const color = () =>
  body("color")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Color can't be empty")
    .toLowerCase();

const size = () =>
  body("size")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Size can't be empty")
    .toUpperCase();

const quantity = (isRequired = false) =>
  requiredOrOptional("quantity", isRequired, "Quantity is required")
    .isInt({ min: 0 })
    .withMessage("Quantity must be an integer >= 0")
    .toInt();

const isAvailable = () =>
  body("isAvailable")
    .optional()
    .isBoolean()
    .withMessage("isAvailable must be a boolean value")
    .toBoolean();

const productIdParam = () =>
  param("productId").isMongoId().withMessage("Invalid product id");

const variantIdParam = () =>
  param("variantId").isMongoId().withMessage("Invalid variant id");

export const addVariantValidator = [
  productIdParam(),
  color(),
  size(),
  quantity(true),
  isAvailable(),

  validatorMiddleware,
];

export const updateVariantValidator = [
  requireAtLeastOneField(ALLOWED_VARIANT_UPDATE_FIELDS),

  productIdParam(),
  variantIdParam(),
  isAvailable(),
  quantity(),

  validatorMiddleware,
];
