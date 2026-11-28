import asyncHandler from "express-async-handler";

import pickAllowedFields from "../helpers/pick-allowed-fields.js";
import * as subCategoryService from "../services/database/subcategory-service.js";
import * as factory from "./crud-controller.js";
import * as subCategoriesFields from "../constants/subcategory-fields.js";

const populateOptions = { path: "category", select: "name slug" };

export const getSubCategories = factory.getDocs({
  service: subCategoryService,
});

export const getSubCategory = factory.getDoc({
  service: subCategoryService,
  fieldParamId: "subCategoryId",
  populateOptions,
});

export const createSubCategory = asyncHandler(async (req, res, next) => {
  const verifiedFields = pickAllowedFields(
    subCategoriesFields.ALLOWED_SUBCATEGORY_CREATE_FIELDS,
    req.body,
  );

  const doc = await subCategoryService.create({
    allowedFields: verifiedFields,
    categoryId: req.params.categoryId,
    processedImage: req.processedImage,
  });

  res.status(201).json({ data: doc });
});

export const updateSubCategory = asyncHandler(async (req, res, next) => {
  const verifiedFields = pickAllowedFields(
    subCategoriesFields.ALLOWED_SUBCATEGORY_UPDATE_FIELDS,
    req.body,
  );

  const doc = await subCategoryService.update({
    allowedFields: verifiedFields,
    subCategoryId: req.params.subCategoryId,
    categoryId: req.body.category,
    processedImage: req.processedImage,
  });

  res.status(200).json({ data: doc });
});

export const deleteSubCategory = factory.del({
  service: subCategoryService,
  fieldParamId: "subCategoryId",
  imageFields: ["image"],
  folderName: "subcategories",
});
