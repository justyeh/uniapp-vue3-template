<template>
  <view class="content">{{ userInfo.name }}</view>
  <tab-bar active="home" />
</template>

<script setup lang="ts">
import { userInfoStore } from '@/store/index'
import tabBar from '@/components/tab-bar/index.vue'
const userInfo = userInfoStore()
</script>
