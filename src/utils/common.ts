// 检查更新
export function checkVersionUpdate() {
  const updateManager = uni.getUpdateManager()

  updateManager.onCheckForUpdate(function (res) {
    if (res.hasUpdate) {
      updateManager.onUpdateReady(function () {
        uni.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success: function (res) {
            if (res.confirm) {
              updateManager.applyUpdate()
            }
          }
        })
      })
    }
  })
}

// 延迟执行
export function sleep(time: number = 1000) {
  return new Promise<void>((resolve) => {
    const timer = setTimeout(() => {
      clearTimeout(timer)
      resolve()
    }, time)
  })
}

// 获取当前页面路径
export function getCurrentPagePath(): string {
  const pages = getCurrentPages()
  if (pages.length === 0) {
    return ''
  }
  const currentPage = pages[pages.length - 1]
  return currentPage.route ? '/' + currentPage.route : ''
}
