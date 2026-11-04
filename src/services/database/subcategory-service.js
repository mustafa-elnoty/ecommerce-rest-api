import subCategoryModel from "../../models/subcategory-model.js";
import categoryModel from "../../models/category-model.js";
import * as factory from "./crud-service.js";
import * as subCategoryFields from "../../constants/subcategory-fields.js";
import ApiError from "../../utils/api-error.js";
import writeProcessedFiles from "../storage/local-storage/write-processed-files.js";

const crudConfig = { Model: subCategoryModel, modelName: "SubCategory" };

export const getById = factory.getById(crudConfig);
export const getDoc = factory.getDoc(crudConfig);
export const del = factory.del(crudConfig);

export const getDocs = factory.getDocs({
  Model: subCategoryModel,
  parent: {
    parentModel: categoryModel,
    paramField: "categoryId",
    referenceField: "category",
  },
  defaultFields: "name image slug",
  filterFields: subCategoryFields.ALLOWED_SUBCATEGORY_FILTER_FIELDS,
  sortFields: subCategoryFields.ALLOWED_SUBCATEGORY_SORT_FIELDS,
  selectFields: subCategoryFields.ALLOWED_SUBCATEGORY_SELECT_FIELDS,
});

const assertCategoryExists = async (categoryId) => {
  const categoryExists = await categoryModel.exists({ _id: categoryId });
  if (!categoryExists) throw new ApiError(`Category not found`, 404);
};

export const create = async ({ allowedFields, categoryId, processedImage }) => {
  await assertCategoryExists(categoryId);

  const subCategory = await subCategoryModel.create({
    ...allowedFields,
    category: categoryId,
  });

  if (processedImage) await writeProcessedFiles([processedImage]);

  return subCategory;
};

export const update = async ({
  allowedFields,
  subCategoryId,
  categoryId,
  processedImage,
}) => {
  await assertCategoryExists(categoryId);

  return factory.update(crudConfig)({
    subCategoryId,
    allowedFields,
    processedImage,
  });
};
