import { param, body } from "express-validator";

import ALLOWED_ADDRESS_FIELDS from "../constants/address-fields.js";
import requireAtLeastOneField from "../utils/require-at-least-one-field.js";
import requiredOrOptional from "../helpers/required-or-optional.js";
import validatorMiddleware from "../middlewares/validator-middleware.js";

const alias = (isRequired = false) =>
  requiredOrOptional("alias", isRequired, "You must enter the alias")
    .isLength({ min: 2, max: 50 })
    .withMessage("Alias must be between 2 and 50 characters");

const details = (isRequired = false) =>
  requiredOrOptional("details", isRequired, "You must enter the details")
    .isLength({ min: 5, max: 200 })
    .withMessage("Details must be between 5 and 200 characters");

const city = (isRequired = false) =>
  requiredOrOptional("city", isRequired, "You must enter the city")
    .isLength({ min: 2, max: 50 })
    .withMessage("City must be between 2 and 50 characters");

const landmark = () =>
  body("landmark")
    .trim()
    .optional()
    .isLength({ min: 3, max: 100 })
    .withMessage("Landmark must be between 3 and 100 characters");

const recipientFirstName = (isRequired = false) =>
  requiredOrOptional(
    "recipientFirstName",
    isRequired,
    "You must enter the recipient's first name",
  )
    .isLength({ min: 2, max: 50 })
    .withMessage("Recipient first name must be between 2 and 50 characters");

const recipientLastName = (isRequired = false) =>
  requiredOrOptional(
    "recipientLastName",
    isRequired,
    "You must enter the recipient's last name",
  )
    .isLength({ min: 2, max: 50 })
    .withMessage("Recipient last name must be between 2 and 50 characters");

const phone = (isRequired = false) =>
  requiredOrOptional(
    "phone",
    isRequired,
    "You must enter the recipient's phone number",
  )
    .isMobilePhone(["ar-EG"])
    .withMessage("Phone number must be a valid Egyptian mobile number");

const addressIdParam = () =>
  param("addressId").isMongoId().withMessage("Invalid address id format");

export const addAddressValidator = [
  alias(true),
  details(true),
  city(true),
  landmark(),
  recipientFirstName(true),
  recipientLastName(true),
  phone(true),

  validatorMiddleware,
];

export const updateAddressValidator = [
  requireAtLeastOneField(ALLOWED_ADDRESS_FIELDS),

  addressIdParam(),
  alias(),
  details(),
  city(),
  landmark(),
  recipientFirstName(),
  recipientLastName(),
  phone(),

  validatorMiddleware,
];

export const removeAddressValidator = [addressIdParam(), validatorMiddleware];

export const setDefaultAddressValidator = [
  addressIdParam(),
  validatorMiddleware,
];
