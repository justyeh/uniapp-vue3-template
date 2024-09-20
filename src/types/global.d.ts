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

// 分页参数
interface ListFunctionParams {
  pageNum: number
  pageSize: number
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

// 每周必读
interface IWeeklyMustReadParams extends ListFunctionParams {
  type: 'GESTATION'
}

interface IWeeklyMustRead {
  id: number
  title: string
  cardList: {
    cardTitle: string
    cardContent: string
  }[]
}
