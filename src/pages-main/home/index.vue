<template>
  <view class="content">{{ userInfo.nickname }}</view>
  <tab-bar active="home" />
</template>

<script setup lang="ts">
import { userInfoStore } from '@/store/index'
import tabBar from '@/components/tab-bar/index.vue'
import { initApp } from '@/utils/auth'
import { onMounted } from 'vue'

const userInfo = userInfoStore()

onMounted(() => {
  initApp()
})
</script>
