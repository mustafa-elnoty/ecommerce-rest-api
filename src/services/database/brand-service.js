import brandModel from "../../models/brand-model.js";
import * as factory from "./crud-service.js";
import * as brandFields from "../../constants/brand-fields.js";

const crudConfig = { Model: brandModel, modelName: "Brand" };

export const getById = factory.getById(crudConfig);
export const getDocs = factory.getDocs({
  Model: brandModel,
  defaultFields: "-__v",
  filterFields: brandFields.ALLOWED_BRAND_FILTER_FIELDS,
  sortFields: brandFields.ALLOWED_BRAND_SORT_FIELDS,
  selectFields: brandFields.ALLOWED_BRAND_SELECT_FIELDS,
});
export const getDoc = factory.getDoc(crudConfig);
export const create = factory.create({ Model: brandModel });
export const update = factory.update(crudConfig);
export const del = factory.del(crudConfig);
