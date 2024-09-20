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
  body?: {
    list: T[]
    total: number
  }
}
