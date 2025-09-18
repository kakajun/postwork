<script lang="ts" setup>
import { useThemeStore } from '@/store'
import { safeAreaInsets } from '@/utils/systemInfo'

defineOptions({
  name: 'Home',
})
definePage({
  style: {
    // 'custom' 表示开启自定义导航栏，默认 'default'
    navigationStyle: 'custom',
    navigationBarTitleText: '项目大厅',
  },
})

const themeStore = useThemeStore()

// 页面跳转方法
function navigateToProject() {
  uni.showToast({
    title: '项目方功能开发中',
    icon: 'none',
  })
}

function navigateToAccept() {
  uni.showToast({
    title: '接单方功能开发中',
    icon: 'none',
  })
}

console.log('index/index 首页打印了')

onLoad(() => {
  console.log('测试 uni API 自动引入: onLoad')
})
</script>

<template>
  <view
    class="min-h-screen flex flex-col"
    :style="{
      background: 'linear-gradient(180deg, #FF6F00 0%, #FFD014 100%)',
      paddingTop: `${safeAreaInsets?.top}px`,
    }"
  >
    projectHall
  </view>
</template>
