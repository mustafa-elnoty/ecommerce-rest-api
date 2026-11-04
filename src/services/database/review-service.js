import productModel from "../../models/product-model.js";
import reviewModel from "../../models/review-model.js";
import ApiError from "../../utils/api-error.js";
import * as factory from "./crud-service.js";
import * as reviewFields from "../../constants/review-fields.js";

export const getDoc = factory.getDoc({
  Model: reviewModel,
  modelName: "Review",
});

export const getDocs = factory.getDocs({
  Model: reviewModel,
  parent: {
    parentModel: productModel,
    paramField: "productId",
    referenceField: "product",
  },
  defaultFields: reviewFields.ALLOWED_REVIEW_SELECT_FIELDS.join(" "),
  filterFields: reviewFields.ALLOWED_REVIEW_FILTER_FIELDS,
  sortFields: reviewFields.ALLOWED_REVIEW_SORT_FIELDS,
  selectFields: reviewFields.ALLOWED_REVIEW_SELECT_FIELDS,
});

export const create = async ({ userId, productId, verifiedFields }) => {
  const product = await productModel.exists({ _id: productId });
  if (!product) throw new ApiError(`Product not found`, 404);

  return reviewModel.create({
    ...verifiedFields,
    user: userId,
    product: productId,
  });
};

export const update = async ({ userId, reviewId, verifiedFields }) => {
  const userReview = await reviewModel.findOne({
    _id: reviewId,
    user: userId,
  });

  if (!userReview) throw new ApiError(`Review not found`, 404);

  Object.assign(userReview, verifiedFields);

  await userReview.save();

  return userReview;
};

export const deleteReview = async ({ userId, userRole, reviewId }) => {
  const filter =
    userRole === "admin" ? { _id: reviewId } : { _id: reviewId, user: userId };

  const review = await reviewModel.findOneAndDelete(filter);
  if (!review) throw new ApiError(`Review not found`, 404);
};
