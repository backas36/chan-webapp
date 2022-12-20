import { AUTH_OPTIONS, USER_ROLES, USER_STATUS } from "../../../utils/constants"

export const initUserVal = {
  name: "",
  email: "",
  birthDate: null,
  mobile: "",
  lineId: "",
  address: "",
  role: USER_ROLES.user,
  photoUrl: "",
  status: USER_STATUS.temporary,
  identityType: AUTH_OPTIONS.chanchan,
}
