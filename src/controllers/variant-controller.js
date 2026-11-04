import asyncHandler from "express-async-handler";

import * as variantService from "../services/database/variant-service.js";
import pickAllowedFields from "../helpers/pick-allowed-fields.js";
import * as variantFields from "../constants/variant-fields.js";

export const addVariant = asyncHandler(async (req, res) => {
  const allowedFields = pickAllowedFields(
    variantFields.ALLOWED_VARIANT_CREATE_FIELDS,
    req.body,
  );

  const variant = await variantService.addVariant({
    productId: req.params.productId,
    variantData: allowedFields,
  });

  res.status(201).json({ data: variant });
});

export const updateVariant = asyncHandler(async (req, res) => {
  const { productId, variantId } = req.params;

  const allowedFields = pickAllowedFields(
    variantFields.ALLOWED_VARIANT_UPDATE_FIELDS,
    req.body,
  );

  const variant = await variantService.updateVariant({
    productId,
    variantId,
    fieldsToUpdate: allowedFields,
  });

  res.status(200).json({ data: variant });
});
