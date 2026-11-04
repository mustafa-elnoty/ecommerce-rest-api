import bcrypt from "bcryptjs";

import userModel from "../../models/user-model.js";
import * as factory from "./crud-service.js";
import ApiError from "../../utils/api-error.js";
import * as userFields from "../../constants/user-fields.js";

const crudConfig = { Model: userModel, modelName: "User" };

export const getDocs = factory.getDocs({
  Model: userModel,
  defaultFields:
    "firstName lastName email phone role active profileImage createdAt",
  filterFields: userFields.ALLOWED_USER_FILTER_FIELDS,
  sortFields: userFields.ALLOWED_USER_SORT_FIELDS,
  selectFields: userFields.ALLOWED_USER_SELECT_FIELDS,
});
export const getDoc = factory.getDoc(crudConfig);
export const del = factory.del(crudConfig);
export const getById = factory.getById(crudConfig);
export const create = factory.create({ Model: userModel });
export const update = factory.update(crudConfig);

export const updateRole = async ({ id, role }) => {
  const doc = await userModel.findOneAndUpdate(
    { _id: id },
    { role },
    { returnDocument: "after", runValidators: true },
  );

  if (!doc) throw new ApiError(`user not found`, 404);

  return doc;
};

export const changePassword = async ({ id, reqBody }) => {
  const { currentPassword, newPassword } = reqBody;

  const user = await userModel.findOne({ _id: id }).select("+password");

  if (!user) throw new ApiError(`User not found`, 404);

  const correctPassword = await bcrypt.compare(currentPassword, user.password);

  if (!correctPassword) throw new ApiError("Incorrect current password", 400);

  user.password = newPassword;
  user.refreshTokenHash = undefined;
  user.loggedOutAt = Date.now();

  await user.save();
};

export const deactivateUser = async ({ id }) => {
  const doc = await userModel.findOneAndUpdate(
    { _id: id },
    { active: false },
    { returnDocument: "after" },
  );
  if (!doc) throw new ApiError(`User not found`, 404);
};
