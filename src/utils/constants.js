export const USER_ROLES = {
  superAdmin: "super admin",
  admin: "admin",
  editor: "editor",
  basic: "basic",
  user: "user",
}

export const getAllowRoles = (onlyAdmin, onlyEditor = false) => {
  return [
    USER_ROLES.superAdmin,
    USER_ROLES.admin,
    USER_ROLES.editor,
    !onlyEditor && USER_ROLES.basic,
    !onlyAdmin && USER_ROLES.user,
  ]
}

export const AUTH_OPTIONS = {
  google: "google",
  chanchan: "chanchan-api",
}

export const USER_STATUS = {
  active: "active",
  blocked: "blocked",
  temporary: "temporary",
  inactive: "inactive",
}
