<template>
  <div class="tab-bar">
    <div class="inner">
      <div class="item" :class="{ active: active === 'home' }" @click="switchTab('home')">首页</div>
      <div class="item" :class="{ active: active === 'mine' }" @click="switchTab('mine')">我的</div>
    </div>
    <safe-area-bottom />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import safeAreaBottom from '@/components/safe-area/bottom.vue'

// active高亮的path
defineProps({ active: String })

function switchTab(tabName: string) {
  uni.switchTab({
    url: `/pages-main/${tabName}/index`
  })
}
</script>

<style scoped lang="less">
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  border-top: solid 1px #ddd;
}
.inner {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 20px;
}
.item {
  color: #999;
}
.item.active {
  color: #000;
  font-weight: bold;
}
</style>
