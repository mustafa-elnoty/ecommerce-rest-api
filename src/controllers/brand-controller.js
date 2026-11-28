import * as factory from "./crud-controller.js";
import * as brandService from "../services/database/brand-service.js";
import { ALLOWED_BRAND_FIELDS } from "../constants/brand-fields.js";

export const getBrands = factory.getDocs({ service: brandService });

export const getBrand = factory.getDoc({
  service: brandService,
  fieldParamId: "brandId",
});

export const createBrand = factory.create({
  service: brandService,
  fieldsToCreate: ALLOWED_BRAND_FIELDS,
});

export const updateBrand = factory.update({
  service: brandService,
  fieldParamId: "brandId",
  fieldsToUpdate: ALLOWED_BRAND_FIELDS,
  imageField: "image",
  folderName: "brands",
});

export const deleteBrand = factory.del({
  service: brandService,
  fieldParamId: "brandId",
  imageFields: ["image"],
  folderName: "brands",
});
