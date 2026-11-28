import { param, body } from "express-validator";

import { ALLOWED_REVIEW_FIELDS } from "../constants/review-fields.js";
import requireAtLeastOneField from "../utils/require-at-least-one-field.js";
import requiredOrOptional from "../helpers/required-or-optional.js";
import validatorMiddleware from "../middlewares/validator-middleware.js";

const title = () =>
  body("title")
    .trim()
    .optional()
    .isLength({ min: 4, max: 400 })
    .withMessage("Title must be between 4 and 400 characters");

const rating = (isRequired = false) =>
  requiredOrOptional("rating", isRequired, "Rating is required")
    .isFloat({ min: 1, max: 5 })
    .withMessage("Rating must be between 1.0 and 5.0")
    .toFloat();

const reviewIdParam = () =>
  param("reviewId").isMongoId().withMessage("Invalid review id format");

const productParamId = () =>
  param("productId").isMongoId().withMessage("Invalid product id format");

export const getReviewsValidator = [productParamId(), validatorMiddleware];

export const getReviewValidator = [reviewIdParam(), validatorMiddleware];

export const createReviewValidator = [
  productParamId(),

  title(),
  rating(true),

  validatorMiddleware,
];

export const updateReviewValidator = [
  requireAtLeastOneField(ALLOWED_REVIEW_FIELDS),

  reviewIdParam(),
  title(),
  rating(),

  validatorMiddleware,
];

export const deleteReviewValidator = [reviewIdParam(), validatorMiddleware];
