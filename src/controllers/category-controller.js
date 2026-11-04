import * as factory from "./crud-controller.js";
import * as categoryService from "../services/database/category-service.js";
import { ALLOWED_CATEGORY_FIELDS } from "../constants/category-fields.js";

/**
 *@desc        Get Categories
 *@route       GET /api/v1/categories
 * @access      Public
 */
export const getAllCategories = factory.getDocs({ service: categoryService });

/**
 *@desc        Get Category
 *@route       GET /api/v1/categories/:categoryId
 *@access      Public
 */
export const getCategory = factory.getDoc({
  service: categoryService,
  fieldParamId: "categoryId",
});

/**
 *@desc        Create Category
 *@route       POST /api/v1/categories
 *@access      Private
 */
export const createCategory = factory.create({
  service: categoryService,
  fieldsToCreate: ALLOWED_CATEGORY_FIELDS,
});

/**
 *@desc        Update Category
 *@route       PATCH /api/v1/categories/:categoryId
 *@access      Private
 */
export const updateCategory = factory.update({
  service: categoryService,
  fieldParamId: "categoryId",
  fieldsToUpdate: ALLOWED_CATEGORY_FIELDS,
  imageField: "image",
  folderName: "categories",
});

/**
 *@desc        Delete Category
 *@route       DELETE /api/v1/categories/:categoryId
 *@access      Private
 */
export const deleteCategory = factory.del({
  service: categoryService,
  fieldParamId: "categoryId",
  imageFields: ["image"],
  folderName: "categories",
});
