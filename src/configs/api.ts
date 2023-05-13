import { APIHost, APIUrl } from "../utils/constants"

enum APIService {
  auth,
  protected,
  public,
}

function getBaseUrl(service: APIService) {
  if (service === APIService.auth) {
    return `${APIHost}/auth`
  } else if (service === APIService.protected) {
    return `${APIHost}/protected`
  } else if (service === APIService.public) {
    return `${APIUrl}`
  }

  return ""
}

export const API_PATHS = {
  signIn: `${getBaseUrl(APIService.auth)}/login`,
  register: `${getBaseUrl(APIService.auth)}/register`,
  userProfile: `${getBaseUrl(APIService.public)}/user`,
  location: `${getBaseUrl(APIService.public)}/api/v1/location`,
  city: `${getBaseUrl(APIService.public)}/api/v1/location?pid=`,
}
