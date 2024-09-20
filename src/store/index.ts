import { defineStore } from 'pinia'

export const userInfoStore = defineStore('userInfo', {
  state: (): IUserInfo => {
    return {
      patientId: 0,
      avatar: '',
      mobile: '',
      nickname: ''
    }
  },
  actions: {
    updateUserInfo(value: IUserInfo) {
      this.$patch(value)
    }
  }
})
