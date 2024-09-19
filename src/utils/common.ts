export function checkVersionUpdate() {
  // 获取小程序更新管理器实例
  const updateManager = wx.getUpdateManager()

  // 监听小程序更新情况
  updateManager.onCheckForUpdate(function (res) {
    if (res.hasUpdate) {
      // 发现新版本，提示用户更新
      updateManager.onUpdateReady(function () {
        wx.showModal({
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

export function sleep(time: number = 1000) {
  return new Promise<void>((resolve) => {
    const timer = setTimeout(() => {
      resolve()
    }, time)
  })
}
