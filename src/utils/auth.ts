const TokenKey = 'admin-token'

export function isLogin() {
  return !!uni.getStorageSync(TokenKey)
}

export function getToken() {
  return uni.getStorageSync(TokenKey)
}

export function setToken(token: string) {
  uni.setStorageSync(TokenKey, token)
}

export function clearToken() {
  uni.removeStorageSync(TokenKey)
}
