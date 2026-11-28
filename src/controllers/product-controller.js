import asyncHandler from "express-async-handler";

import * as factory from "./crud-controller.js";
import * as productService from "../services/database/product-service.js";
import * as productFields from "../constants/product-fields.js";
import * as variantFields from "../constants/variant-fields.js";
import pickAllowedFields from "../helpers/pick-allowed-fields.js";

import { deleteOldSingleImage } from "../services/storage/local-storage/delete-files.js";

const populateOptions = {
  path: "category brand subCategories",
  select: "name slug",
};

export const getProducts = factory.getDocs({ service: productService });

export const getProduct = factory.getDoc({
  service: productService,
  fieldParamId: "productId",
  populateOptions,
});

export const createProduct = asyncHandler(async (req, res, next) => {
  const fieldsToCreate = pickAllowedFields(
    productFields.ALLOWED_PRODUCT_CREATE_FIELDS,
    req.body,
  );

  fieldsToCreate.variants = fieldsToCreate.variants.map((variant) =>
    pickAllowedFields(variantFields.ALLOWED_VARIANT_CREATE_FIELDS, variant),
  );

  const doc = await productService.create({
    fieldsToCreate,
    processedImage: req.processedImage,
    processedImages: req.processedImages,
  });

  res.status(201).json({ data: doc });
});

export const updateProduct = factory.update({
  service: productService,
  fieldParamId: "productId",
  fieldsToUpdate: productFields.ALLOWED_PRODUCT_UPDATE_FIELDS,
});

export const deleteProduct = asyncHandler(async (req, res, next) => {
  await productService.del({ productId: req.params.productId });

  res.status(204).send();
});

export const addProductImage = asyncHandler(async (req, res, next) => {
  await productService.addImage({
    id: req.params.productId,
    newImages: req.body.images,
    processedImages: req.processedImages,
  });

  res.status(204).send();
});

export const deleteProductImage = asyncHandler(async (req, res, next) => {
  const { productId, imageName } = req.params;

  await productService.deleteImage({
    id: productId,
    imageFieldName: "images",
    folderName: "products",
    imageName,
  });

  res.status(204).send();
});
