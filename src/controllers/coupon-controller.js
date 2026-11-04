import * as factory from "./crud-controller.js";
import * as couponService from "../services/database/coupon-service.js";
import { ALLOWED_COUPON_FIELDS } from "../constants/coupon-fields.js";

export const getCoupons = factory.getDocs({ service: couponService });
export const getCoupon = factory.getDoc({
  service: couponService,
  fieldParamId: "couponId",
});
export const createCoupon = factory.create({
  service: couponService,
  fieldsToCreate: ALLOWED_COUPON_FIELDS,
});
export const updateCoupon = factory.update({
  service: couponService,
  fieldParamId: "couponId",
  fieldsToUpdate: ALLOWED_COUPON_FIELDS,
});
export const deleteCoupon = factory.del({
  service: couponService,
  fieldParamId: "couponId",
});
