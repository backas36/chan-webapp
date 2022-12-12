import { AUTH_OPTIONS } from "../../../utils/constants"

export const checkUserIdentityType = (identityType) => {
  if (identityType) {
    return identityType === AUTH_OPTIONS.chanchan
  }
}
