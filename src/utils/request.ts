import { getCurrentPagePath } from '@/utils/common'
import { clearToken, getToken } from '@/utils/auth'

enum ContentTypeEnum {
  'json' = 'application/json',
  'form' = 'application/x-www-form-urlencoded'
}

function request<T>(config: HttpRequestConfig): Promise<T> {
  const BASE_URL = import.meta.env.VITE_BASE_URL
  const showLoading = config.showLoading || true
  const loadingText = config.loadingText || '加载中...'
  const showFailToast = config.showFailToast || true

  if (showLoading) {
    uni.showLoading({ title: loadingText, icon: 'none' })
  }

  // 设置header
  const header: AnyObject = {
    'content-type': config.contentType
  }
  const { key, value } = getToken()
  if (key && value) {
    header['aky_authorization_jwt'] = key
    header[key] = value
  }

  return new Promise((resolve, reject) => {
    uni.request({
      url: BASE_URL + config.url,
      data: config.data,
      header,
      method: config.method,
      success: (response) => {
        const data = (response.data || {}) as AnyObject
        const code = Number(data?.retcode)
        const errMsg = data?.errMsg || '系统开小差，请稍后再试'

        if (code === 0) {
          resolve(data as T)
          return
        }

        if (code === 399) {
          clearToken()
          const currentPagePath = getCurrentPagePath()
          if (currentPagePath) {
            uni.reLaunch({ url: currentPagePath })
          }
          return
        }

        if (showFailToast) {
          uni.showToast({ title: errMsg, icon: 'none' })
        }
        reject(data)
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
