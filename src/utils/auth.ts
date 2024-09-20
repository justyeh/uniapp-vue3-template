import { getUserInfo, login } from '@/apis/basic'
import { AppId } from '@/utils/config'
import { userInfoStore } from '@/store/index'

const TokenKey = 'token-key'
const TokenValue = 'token-value'
const TokenExpire = 'token-expire'

// 检查是否登录
export function isLogin() {
  const key = uni.getStorageSync(TokenKey) || ''
  const value = uni.getStorageSync(TokenValue) || ''
  const expire = Number(uni.getStorageSync(TokenExpire)) || 1
  return key && value && Date.now() < expire
}

// 设置token
export function setToken(key: string, value: string) {
  uni.setStorageSync(TokenKey, key)
  uni.setStorageSync(TokenValue, value)

  const time = 7 * 24 * 60 * 60 * 1000 // 设置token 7天有效期
  uni.setStorageSync(TokenExpire, Date.now() + time)
}

// 获取token
export function getToken() {
  const key = uni.getStorageSync(TokenKey) || ''
  const value = uni.getStorageSync(TokenValue) || ''
  return { key, value }
}

// 清除token
export function clearToken() {
  uni.removeStorageSync(TokenKey)
  uni.removeStorageSync(TokenValue)
  uni.removeStorageSync(TokenExpire)
}

// 获取code
export function getWxCode() {
  return new Promise<{ code: string }>((resolve, reject) => {
    uni.login({
      success: (res) => {
        resolve(res)
      },
      fail: (e) => {
        reject(e)
      }
    })
  })
}

// 登录+初始化用户信息
export async function initApp() {
  try {
    // 登录
    if (!isLogin) {
      await clearToken()
      const { code } = await getWxCode()
      const loginRes = await login({ appId: AppId, code, decryptPhoneCode: '' })
      const { jwtHeadKey = '', jwt = '' } = loginRes.body || {}
      setToken(jwtHeadKey, jwt)
    }

    // 获取用户信息
    const userInfo = userInfoStore()
    if (!userInfo.patientId) {
      const userInfoRes = await getUserInfo()
      userInfo.$patch(userInfoRes.body || {})
    }

    return true
  } catch (err) {
    console.error(err)
    uni.showToast({ title: '服务器开小差，请稍后重试', icon: 'none' })
    return false
  }
}
