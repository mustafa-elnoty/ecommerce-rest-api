import { param, body } from "express-validator";

import { ALLOWED_SUBCATEGORY_UPDATE_FIELDS } from "../constants/subcategory-fields.js";
import requireAtLeastOneField from "../utils/require-at-least-one-field.js";
import requiredOrOptional from "../helpers/required-or-optional.js";
import validatorMiddleware from "../middlewares/validator-middleware.js";

const name = (isRequired = false) =>
  requiredOrOptional("name", isRequired, "You must enter the subcategory name")
    .isLength({ min: 2, max: 32 })
    .withMessage("name must be between 2 and 32");

const category = () =>
  body("category").optional().isMongoId().withMessage("Invalid category id");

const subCategoryIdParam = () =>
  param("subCategoryId")
    .isMongoId()
    .withMessage("Invalid subCategory id format");

const categoryIdParam = () =>
  param("categoryId").isMongoId().withMessage("Invalid category id format");

export const getSubCategoriesValidator = [
  categoryIdParam(),

  validatorMiddleware,
];

export const getSubCategoryValidator = [
  subCategoryIdParam(),

  validatorMiddleware,
];

export const createSubCategoryValidator = [
  categoryIdParam(),
  name(true),

  validatorMiddleware,
];

export const updateSubCategoryValidator = [
  requireAtLeastOneField(ALLOWED_SUBCATEGORY_UPDATE_FIELDS),

  subCategoryIdParam(),
  name(),
  category(),

  validatorMiddleware,
];

export const deleteSubCategoryValidator = [
  subCategoryIdParam(),

  validatorMiddleware,
];
