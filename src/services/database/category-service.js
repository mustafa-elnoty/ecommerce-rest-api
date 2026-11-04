import categoryModel from "../../models/category-model.js";
import * as factory from "./crud-service.js";
import * as categoryFields from "../../constants/category-fields.js";

const crudConfig = { Model: categoryModel, modelName: "Category" };

export const getById = factory.getById(crudConfig);
export const getDocs = factory.getDocs({
  Model: categoryModel,
  defaultFields: "-__v",
  filterFields: categoryFields.ALLOWED_CATEGORY_FILTER_FIELDS,
  sortFields: categoryFields.ALLOWED_CATEGORY_SORT_FIELDS,
  selectFields: categoryFields.ALLOWED_CATEGORY_SELECT_FIELDS,
});
export const getDoc = factory.getDoc(crudConfig);
export const create = factory.create({ Model: categoryModel });
export const update = factory.update(crudConfig);
export const del = factory.del(crudConfig);
