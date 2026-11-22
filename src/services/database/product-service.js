import productModel from "../../models/product-model.js";
import categoryModel from "../../models/category-model.js";
import subcategoryModel from "../../models/subcategory-model.js";
import writeProcessedFiles from "../storage/local-storage/write-processed-files.js";
import ApiError from "../../utils/api-error.js";
import * as factory from "./crud-service.js";
import * as productFields from "../../constants/product-fields.js";

const crudConfig = { Model: productModel, modelName: "Product" };

export const getById = factory.getById(crudConfig);
export const hardDelete = factory.del(crudConfig);
export const addImage = factory.addImage(crudConfig);
export const deleteImage = factory.deleteImage(crudConfig);

export const validateProductRelations = async ({
  category,
  subCategories,
  currentProduct,
}) => {
  if (category) {
    const categoryExist = await categoryModel.exists({ _id: category });
    if (!categoryExist) throw new ApiError("Category not found", 404);
  }

  const targetCategory = category || currentProduct?.category;
  const categoryChanged =
    category && String(category) !== String(currentProduct?.category);

  const idsToCheck =
    subCategories ??
    (categoryChanged ? currentProduct?.subCategories : undefined);

  if (!idsToCheck?.length) return;

  if (!targetCategory) {
    throw new ApiError("Product must belong to a parent category", 400);
  }

  const uniqueIds = [...new Set(idsToCheck.map(String))];

  const count = await subcategoryModel.countDocuments({
    _id: { $in: uniqueIds },
    category: targetCategory,
  });

  if (count !== uniqueIds.length) {
    throw new ApiError(
      "Some subCategories don't exist or don't belong to product category",
      400,
    );
  }
};

export const getDocs = factory.getDocs({
  Model: productModel,
  baseFilter: { isDeleted: false },
  defaultFields:
    "title price slug imageCover discountPercentage priceAfterDiscount avgRatings ratingsCount",
  filterFields: productFields.ALLOWED_PRODUCT_FILTER_FIELDS,
  sortFields: productFields.ALLOWED_PRODUCT_SORT_FIELDS,
  selectFields: productFields.ALLOWED_PRODUCT_SELECT_FIELDS,
});

export const getDoc = factory.getDoc({
  Model: productModel,
  modelName: "Product",
  baseFilter: { isDeleted: false },
});

export const create = async ({
  fieldsToCreate,
  processedImage,
  processedImages,
}) => {
  const { category, subCategories } = fieldsToCreate;

  await validateProductRelations({ category, subCategories });

  return factory.create({ Model: productModel })({
    fieldsToCreate,
    processedImage,
    processedImages,
  });
};

export const update = async ({ productId, fieldsToUpdate, processedImage }) => {
  const product = await productModel.findOne({
    _id: productId,
    isDeleted: false,
  });

  if (!product) throw new ApiError("Product not found", 404);

  const { category, subCategories } = fieldsToUpdate;

  await validateProductRelations({
    category,
    subCategories,
    currentProduct: product,
  });

  product.set(fieldsToUpdate);

  if (processedImage) await writeProcessedFiles([processedImage]);

  await product.save();

  return product;
};

export const del = async ({ productId }) => {
  const result = await productModel.updateOne(
    { _id: productId, isDeleted: false },
    { isDeleted: true, deletedAt: new Date() },
  );
  if (!result.matchedCount) throw new ApiError("Product not found", 404);
};
