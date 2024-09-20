const BASE_URL = 'https://akyy.aikangcloud.com'

enum ContentTypeEnum {
  'json' = 'application/json',
  'form' = 'application/x-www-form-urlencoded'
}

function request<ResponseData>(config: HttpRequestConfig): Promise<ResponseData> {
  const showLoading = config.showLoading || true
  const loadingText = config.loadingText || '加载中'
  const showFailToast = config.showFailToast || true

  if (showLoading) {
    uni.showLoading({ title: loadingText, icon: 'none' })
  }

  return new Promise((resolve, reject) => {
    uni.request({
      url: BASE_URL + config.url,
      data: config.data,
      header: {
        'content-type': config.contentType
      },
      method: config.method,
      success: (response) => {
        console.error(response)
      },
      fail: (error) => {
        reject(error)
        if (error.toString().indexOf('Error: timeout') !== -1 && showFailToast) {
          uni.showToast({ title: '网络连接异常，请检查网络', icon: 'none' })
        } else {
          uni.showToast({ title: '网络请求错误', icon: 'none' })
        }
      },
      complete() {
        if (showLoading) {
          uni.hideLoading()
        }
      }
    })
  })
}

export function getRequest<T>(config: HttpRequestConfig): Promise<T> {
  return request(
    Object.assign(config, {
      method: 'GET',
      contentType: ContentTypeEnum.json
    })
  )
}

export function jsonRequest<T>(config: HttpRequestConfig): Promise<T> {
  return request(
    Object.assign(config, {
      method: 'POST',
      contentType: ContentTypeEnum.json
    })
  )
}

export function formRequest<T>(config: HttpRequestConfig): Promise<T> {
  return request(
    Object.assign(config, {
      method: 'POST',
      contentType: ContentTypeEnum.form
    })
  )
}

// 待实现
export function uplaodFile() {}
