import asyncHandler from "express-async-handler";

import pickAllowedFields from "../helpers/pick-allowed-fields.js";
import * as factory from "./crud-controller.js";
import * as reviewService from "../services/database/review-service.js";
import { ALLOWED_REVIEW_FIELDS } from "../constants/review-fields.js";

const populateOptions = {
  path: "user",
  select: "firstName lastName profileImage",
};

export const getReviews = factory.getDocs({
  service: reviewService,
});

export const getReview = factory.getDoc({
  service: reviewService,
  fieldParamId: "reviewId",
  populateOptions,
});

export const createReview = asyncHandler(async (req, res, next) => {
  const verifiedFields = pickAllowedFields(ALLOWED_REVIEW_FIELDS, req.body);

  const review = await reviewService.create({
    userId: req.user._id,
    productId: req.params.productId,
    verifiedFields,
  });

  res.status(201).json({ data: review });
});

export const updateReview = asyncHandler(async (req, res, next) => {
  const verifiedFields = pickAllowedFields(ALLOWED_REVIEW_FIELDS, req.body);

  const review = await reviewService.update({
    userId: req.user._id,
    reviewId: req.params.reviewId,
    verifiedFields,
  });

  res.status(200).json({ data: review });
});

export const deleteReview = asyncHandler(async (req, res, next) => {
  const { _id, role } = req.user;

  await reviewService.deleteReview({
    userId: _id,
    userRole: role,
    reviewId: req.params.reviewId,
  });

  res.status(204).send();
});
