import { body, param } from "express-validator";
import validatorMiddleware from "../middlewares/validator-middleware.js";

const productId = () =>
  body("productId")
    .notEmpty()
    .withMessage("Product id is required")
    .isMongoId()
    .withMessage("Invalid product id format");

const productIdParam = () =>
  param("productId").isMongoId().withMessage("Invalid product id format");

export const addProductValidator = [productId(), validatorMiddleware];

export const removeProductValidator = [productIdParam(), validatorMiddleware];
