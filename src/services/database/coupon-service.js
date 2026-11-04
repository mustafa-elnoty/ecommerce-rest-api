import couponModel from "../../models/coupon-model.js";
import ApiError from "../../utils/api-error.js";
import * as factory from "./crud-service.js";
import * as couponFields from "../../constants/coupon-fields.js";

const crudConfig = { Model: couponModel, modelName: "Coupon" };

export const getDocs = factory.getDocs({
  Model: couponModel,
  defaultFields: couponFields.ALLOWED_COUPON_FIELDS.join(" "),
  filterFields: couponFields.ALLOWED_COUPON_FILTER_FIELDS,
  sortFields: couponFields.ALLOWED_COUPON_SORT_FIELDS,
  selectFields: couponFields.ALLOWED_COUPON_SELECT_FIELDS,
});
export const getDoc = factory.getDoc(crudConfig);
export const create = factory.create(crudConfig);
export const del = factory.del(crudConfig);

export const update = async ({ id, fieldsToUpdate }) => {
  const coupon = await couponModel.findById(id);

  if (!coupon) {
    throw new ApiError(`Coupon not found`, 404);
  }

  coupon.set(fieldsToUpdate);

  if (coupon.discountType === "fixed") {
    coupon.maxDiscount = undefined;
  }

  await coupon.save();

  return coupon;
};
