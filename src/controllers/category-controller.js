import * as factory from "./crud-controller.js";
import * as categoryService from "../services/database/category-service.js";
import { ALLOWED_CATEGORY_FIELDS } from "../constants/category-fields.js";

export const getCategories = factory.getDocs({ service: categoryService });

export const getCategory = factory.getDoc({
  service: categoryService,
  fieldParamId: "categoryId",
});

export const createCategory = factory.create({
  service: categoryService,
  fieldsToCreate: ALLOWED_CATEGORY_FIELDS,
});

export const updateCategory = factory.update({
  service: categoryService,
  fieldParamId: "categoryId",
  fieldsToUpdate: ALLOWED_CATEGORY_FIELDS,
  imageField: "image",
  folderName: "categories",
});

export const deleteCategory = factory.del({
  service: categoryService,
  fieldParamId: "categoryId",
  imageFields: ["image"],
  folderName: "categories",
});
