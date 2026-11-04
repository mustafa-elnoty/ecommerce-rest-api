export const PROFILE_FIELDS = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "profileImage",
];
export const ADMIN_FIELDS = [...PROFILE_FIELDS, "role"];
export const AUTH_RESPONSE_FIELDS = [
  "_id",
  "firstName",
  "lastName",
  "email",
  "role",
  "profileImageUrl",
];

// (getDocs) for admin only
export const ALLOWED_USER_FILTER_FIELDS = ["role", "email", "phone"];
export const ALLOWED_USER_SORT_FIELDS = ["createdAt", "firstName", "lastName"];
export const ALLOWED_USER_SELECT_FIELDS = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "profileImage",
  "role",
  "active",
  "createdAt",
];
