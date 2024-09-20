<template>
  <div class="page">
    <div>{{ userInfo.name }}</div>
    <input type="text" v-model="nameInput" @input="onNameUpdate" />
  </div>
  <tab-bar active="mine" />
</template>

<script setup lang="ts">
import { userInfoStore } from '@/store/index'
import { ref } from 'vue'
import tabBar from '@/components/tab-bar/index.vue'

const userInfo = userInfoStore()

const nameInput = ref(userInfo.name)
function onNameUpdate() {
  userInfo.updateUserInfo({ id: userInfo.id, name: nameInput.value })
}
</script>

<style lang="less" scoped>
.page {
  padding: 20rpx;
  input {
    border: solid 2px #ddd;
  }
}
</style>
