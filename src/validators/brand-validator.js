import { param } from "express-validator";

import { ALLOWED_BRAND_FIELDS } from "../constants/brand-fields.js";
import requireAtLeastOneField from "../utils/require-at-least-one-field.js";
import requiredOrOptional from "../helpers/required-or-optional.js";
import validatorMiddleware from "../middlewares/validator-middleware.js";

const name = (isRequired = false) =>
  requiredOrOptional("name", isRequired, "You must enter the name")
    .isLength({ min: 2, max: 32 })
    .withMessage("Brand name must be between 2 and 32");

const brandIdParam = () =>
  param("brandId").isMongoId().withMessage("Invalid brand id format");

export const getBrandValidator = [brandIdParam(), validatorMiddleware];

export const createBrandValidator = [name(true), validatorMiddleware];

export const updateBrandValidator = [
  requireAtLeastOneField(ALLOWED_BRAND_FIELDS),

  brandIdParam(),
  name(),

  validatorMiddleware,
];

export const deleteBrandValidator = [brandIdParam(), validatorMiddleware];
