<template>
  <view class="content">{{ userInfo.name }}</view>
</template>

<script setup lang="ts">
import { userInfoStore } from '@/store/index'
const userInfo = userInfoStore()
</script>
