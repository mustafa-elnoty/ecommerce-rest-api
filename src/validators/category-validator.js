import { param } from "express-validator";

import { ALLOWED_CATEGORY_FIELDS } from "../constants/category-fields.js";
import requireAtLeastOneField from "../utils/require-at-least-one-field.js";
import requiredOrOptional from "../helpers/required-or-optional.js";
import validatorMiddleware from "../middlewares/validator-middleware.js";

const name = (isRequired = false) =>
  requiredOrOptional("name", isRequired, "You must enter the name")
    .isLength({ min: 3, max: 32 })
    .withMessage("Category name must be between 3 and 32");

const categoryIdParam = () =>
  param("categoryId").isMongoId().withMessage("Invalid category id format");

export const getCategoryValidator = [categoryIdParam(), validatorMiddleware];

export const createCategoryValidator = [name(true), validatorMiddleware];

export const updateCategoryValidator = [
  requireAtLeastOneField(ALLOWED_CATEGORY_FIELDS),

  categoryIdParam(),
  name(),

  validatorMiddleware,
];

export const deleteCategoryValidator = [categoryIdParam(), validatorMiddleware];
