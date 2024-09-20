type RequestData = string | AnyObject

interface HttpRequestConfig {
  url: string
  data?: RequestData
  contentType?: ContentTypeEnum
  method?: 'GET' | 'POST'
  showLoading?: boolean
  loadingText?: string
  showFailToast?: boolean
}

interface ResponseData<T> {
  retcode: number | string
  errMsg: string
  body?: T
}

interface PaginatedResponseData<T> extends ResponseData {
  body: {
    list: T[]
    total: number
  }
}

// jwt信息
interface ITokenInfo {
  jwt: string
  jwtHeadKey: string
}

// 用户信息
interface IUserInfo {
  patientId: number
  avatar: string
  mobile: string
  nickname: string
}
