import userModel from "../../models/user-model.js";
import * as factory from "./crud-service.js";
import ApiError from "../../utils/api-error.js";
import * as usersFields from "../../constants/user-fields.js";

const crudConfig = { Model: userModel, modelName: "User" };

export const getDocs = factory.getDocs({
  Model: userModel,
  defaultFields:
    "firstName lastName email phone role active profileImage createdAt",
  filterFields: usersFields.ALLOWED_USERS_FILTER_FIELDS,
  sortFields: usersFields.ALLOWED_USERS_SORT_FIELDS,
  selectFields: usersFields.ALLOWED_USERS_SELECT_FIELDS,
});
export const getDoc = factory.getDoc(crudConfig);
export const del = factory.del(crudConfig);
export const getById = factory.getById(crudConfig);

export const updateRole = async ({ id, role }) => {
  const doc = await userModel.findOneAndUpdate(
    { _id: id },
    { role },
    { returnDocument: "after", runValidators: true },
  );

  if (!doc) throw new ApiError(`user not found`, 404);

  return doc;
};

export const updateUserActiveStatus = async ({ id, active }) => {
  const result = await userModel.updateOne({ _id: id }, { active });
  if (!result.matchedCount) throw new ApiError(`User not found`, 404);
};
