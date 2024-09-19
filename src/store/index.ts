import { defineStore } from 'pinia'

interface IUserInfo {
  id: number
  name: string
}

export const userInfoStore = defineStore('userInfo', {
  state: (): IUserInfo => {
    return { id: 1, name: 'aiyewx' }
  },
  actions: {
    updateUserInfo(value: IUserInfo) {
      this.$patch(value)
    }
  }
})
