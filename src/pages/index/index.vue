<script lang="ts" setup>
import { useThemeStore } from '@/store'
import { safeAreaInsets } from '@/utils/systemInfo'

defineOptions({
  name: 'Home',
})
definePage({
  // 使用 type: "home" 属性设置首页，其他页面不需要设置，默认为page
  type: 'home',
  style: {
    // 'custom' 表示开启自定义导航栏，默认 'default'
    navigationStyle: 'custom',
    navigationBarTitleText: '首页',
  },
})

const themeStore = useThemeStore()

// 页面跳转方法
function navigateToProject() {

    uni.navigateTo({
    url: `/pages-register/accept-oneParty/index`
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
    <!-- 顶部标题区域 -->
    <view class="flex flex-1 flex-col items-center justify-center px-8">
      <!-- 主标题 -->
      <view class="mb-16 text-center">
        <view class="mb-2 text-6xl text-white font-bold">
          你是?
        </view>
        <view class="text-lg text-white opacity-80">
          Are you complaining?
        </view>
      </view>

      <!-- 选择按钮区域 -->
      <view class="mb-20 flex items-center justify-center gap-20">
        <!-- 项目方按钮 -->
        <view class="flex flex-col items-center" style="cursor: pointer;" @tap="navigateToProject">
          <view class="mb-6 h-20 w-20 flex items-center justify-center rounded-full bg-white shadow-lg">
            <image
              src="@img/index/projectParty.png"
              class="h-20 w-20"
              mode="aspectFit"
            />
          </view>
          <text class="text-xl text-white font-medium">项目方</text>
        </view>

        <!-- 接单方按钮 -->
        <view class="flex flex-col items-center" style="cursor: pointer;" @tap="navigateToAccept">
          <view class="mb-6 h-20 w-20 flex items-center justify-center rounded-full bg-white shadow-lg">
            <image
              src="@img/index/acceptOneParty.png"
              class="h-20 w-20"
              mode="aspectFit"
            />
          </view>
          <text class="text-xl text-white font-medium">接单方</text>
        </view>
      </view>
    </view>

    <!-- 底部装饰图片 -->
    <view class="flex justify-center">
      <image
        src="@img/index/indexbottom.png"
        class="h-32 w-full"
        mode="widthFix"
      />
    </view>
  </view>
</template>
