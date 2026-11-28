import { param, body } from "express-validator";
import mongoose from "mongoose";

import { ALLOWED_PRODUCT_UPDATE_FIELDS } from "../constants/product-fields.js";
import requireAtLeastOneField from "../utils/require-at-least-one-field.js";
import requiredOrOptional from "../helpers/required-or-optional.js";
import validatorMiddleware from "../middlewares/validator-middleware.js";

const title = (isRequired = false) =>
  requiredOrOptional("title", isRequired, "You must enter the title")
    .isLength({ min: 3, max: 500 })
    .withMessage("product title must be between 3 and 500");

const description = (isRequired = false) =>
  requiredOrOptional(
    "description",
    isRequired,
    "You must enter the description",
  )
    .isLength({ min: 20, max: 2000 })
    .withMessage("Product description must be between 20 and 2000");

const quantity = (isRequired = false) =>
  requiredOrOptional("quantity", isRequired, "You must enter the quantity")
    .isInt({ min: 0 })
    .withMessage("Product quantity can't be negative")
    .toInt();

const price = (isRequired = false) =>
  requiredOrOptional("price", isRequired, "You must enter the price")
    .isFloat({ min: 0.01, max: 1e6 })
    .withMessage("Price must be between 0.01 and 1,000,000")
    .toFloat();

const discountPercentage = ({ min, msg }) =>
  body("discountPercentage")
    .optional()
    .isInt({ min, max: 100 })
    .withMessage(msg)
    .toInt();

const variant = () => [
  body("variants")
    .isArray({ min: 1 })
    .withMessage("variants must be a non-empty array"),

  body("variants.*").isObject().withMessage("Each variant must be an object"),

  body("variants.*.color")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .toLowerCase(),

  body("variants.*.size").optional().isString().trim().notEmpty().toUpperCase(),

  body("variants.*.quantity")
    .notEmpty()
    .withMessage("Variant quantity is required")
    .bail()
    .isInt({ min: 0 })
    .withMessage("Quantity must be an integer >= 0")
    .toInt(),

  body("variants.*.isAvailable")
    .optional()
    .isBoolean()
    .withMessage("isAvailable must be a boolean value")
    .toBoolean(),
];

const images = (isRequired = false) =>
  body("images")
    .optional()
    .custom((val, { req }) => {
      if (isRequired && !req.files?.images?.length)
        throw new Error("You must upload at least one image");

      if (req.files?.images?.length > 5)
        throw new Error("images field cannot exceed 5 photos");

      return true;
    });

const category = (isRequired = false) =>
  requiredOrOptional(
    "category",
    isRequired,
    "Product must be belong to parent category",
  )
    .isMongoId()
    .withMessage("Invalid category id format");

const subCategories = () =>
  body("subCategories")
    .optional()
    .isArray({ min: 1 })
    .withMessage("subCategories must be a non-empty array")
    .custom((ids) => {
      const isValidIds = ids.every((id) => mongoose.Types.ObjectId.isValid(id));
      if (!isValidIds) throw new Error("Invalid subCategories ids format");

      const uniqueIds = new Set(ids);
      if (uniqueIds.size !== ids.length)
        throw new Error("Duplicate subCategories ids are not allowed");

      return true;
    });

const brand = () =>
  body("brand").optional().isMongoId().withMessage("Invalid brand id format");

const productIdParam = () =>
  param("productId").isMongoId().withMessage("Invalid product id format");

export const getProductValidator = [productIdParam(), validatorMiddleware];

export const createProductValidator = [
  title(true),
  description(true),
  quantity(true),
  price(true),
  discountPercentage({
    min: 1,
    msg: "Discount percentage must be between 1 and 100",
  }),
  ...variant(),
  images(),
  category(true),
  subCategories(),
  brand(),

  body("imageCover").custom((val, { req }) => {
    if (!req.files?.imageCover)
      throw new Error("You must enter the image Cover");

    if (req.files.imageCover.length > 1)
      throw new Error("imageCover must contain exactly one image");

    return true;
  }),

  validatorMiddleware,
];

export const updateProductValidator = [
  productIdParam(),

  requireAtLeastOneField(ALLOWED_PRODUCT_UPDATE_FIELDS),

  title(),
  description(),
  quantity(),
  price(),
  discountPercentage({
    min: 0,
    msg: "Discount percentage must be between 0 and 100",
  }),
  category(),
  subCategories(),
  brand(),

  validatorMiddleware,
];

export const deleteProductValidator = [productIdParam(), validatorMiddleware];

export const deleteProductImageValidator = [
  productIdParam(),

  param("imageName")
    .isString()
    .withMessage("Image name must be a string")
    .trim()
    .notEmpty()
    .withMessage("Image name is required"),

  validatorMiddleware,
];

export const addProductImagesValidator = [
  productIdParam(),

  images(true),

  validatorMiddleware,
];
