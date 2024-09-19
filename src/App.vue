<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import { sleep, checkVersionUpdate } from '@/utils/common'

onLaunch(() => {
  sleep().then(() => {
    checkVersionUpdate()
  })
  console.log('App Launch')
})

onShow(() => {
  console.log('App Show')
})

onHide(() => {
  console.log('App Hide')
})
</script>
