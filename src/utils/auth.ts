import { getUserInfo, login } from '@/apis/basic'

const TokenKey = 'token'
const TokenExpireKey = 'token-expire'

// 检查是否登录
export function isLogin() {
  const token = uni.getStorageSync(TokenKey) || ''
  const expire = Number(uni.getStorageSync(TokenExpireKey)) || 1
  return token && Date.now() < expire
}

// 设置token
export function setToken(token: string) {
  const time = 7 * 24 * 60 * 60 * 1000 // 设置token 7天有效期
  uni.setStorageSync(TokenKey, token)
  uni.setStorageSync(TokenExpireKey, Date.now() + time)
}

// 获取token
export function getToken() {
  return uni.getStorageSync(TokenKey)
}

// 清除token
export function clearToken() {
  uni.removeStorageSync(TokenKey)
  uni.removeStorageSync(TokenExpireKey)
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
  if (isLogin()) {
    return
  }
  try {
    await clearToken()
    const { code } = await getWxCode()
    await login({ appId: 'wx4087c84f37397472', code, decryptPhoneCode: '' })

    const userInfo = await getUserInfo()
    console.error(userInfo)
    return true
  } catch (err) {
    console.error(err)
    uni.showToast({ title: '服务器开小差，请稍后重试', icon: 'none' })
    return false
  }
}
