<template>
  <div>
    <div class="list">
      <div v-for="(item, index) in listData" :key="index" class="item">
        <div class="titel">{{ item.title }}</div>
      </div>
    </div>
    <div v-if="listLoading">记载中</div>
    <div v-if="listFinished">没有更多了</div>
  </div>
</template>

<script setup lang="ts">
import usePaginatedList from '@/hooks/usePaginatedList'
import { weeklyMustRead } from '@/apis/base'
import { onAppDataReady } from '@/utils/lifecycle'

const props = defineProps({
  type: String
})

const { getListData, listData, listLoading, listFinished } = usePaginatedList<IWeeklyMustRead>(weeklyMustRead, () => ({ type: props.type }))

onAppDataReady(() => {
  getListData()
})
</script>
