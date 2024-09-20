<template>
  <div class="title">测试store</div>
  <div class="content">{{ userInfo.nickname }}</div>

  <div class="title">测试列表</div>
  <div @click="goList">跳转到列表页面</div>
  <tab-bar active="home" />
</template>

<script setup lang="ts">
import { userInfoStore } from '@/store/index'
import tabBar from '@/components/tab-bar/index.vue'
import { onAppDataReady } from '@/utils/lifecycle'
const userInfo = userInfoStore()

onAppDataReady(() => {
  console.error('app准备完毕了，可以安全的调用接口，获取用户信息')
})

function goList() {
  uni.navigateTo({ url: '/pages-main/list/index?type=GESTATION' })
}
</script>

<style lang="less" scoped>
.title {
  font-weight: bold;
  padding-bottom: 10rpx;
}
view + .title {
  padding-top: 100rpx;
}
</style>
