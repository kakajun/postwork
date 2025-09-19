<script lang="ts" setup>
import { useThemeStore } from '@/store'
import { safeAreaInsets } from '@/utils/systemInfo'

defineOptions({
  name: 'ProjectHall',
})
definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '项目大厅',
  },
})

const themeStore = useThemeStore()

// 项目列表数据
const projectList = ref([
  {
    id: 1,
    title: 'MP4封装',
    publishDate: '2024.7.24',
    status: '推送状态：开启',
    statusCount: '2',
  },
  {
    id: 2,
    title: 'rtsp推流',
    publishDate: '2024.7.24',
    status: '推送状态：开启',
    statusCount: '2',
  },
  {
    id: 3,
    title: 'RK核心板项目设计',
    publishDate: '2024.7.24',
    status: '推送状态：开启',
    statusCount: '2',
  },
  {
    id: 4,
    title: 'UI设计',
    publishDate: '2024.7.24',
    status: '推送状态：开启',
    statusCount: '2',
  },
  {
    id: 5,
    title: 'MP4封装',
    publishDate: '2024.7.24',
    status: '推送状态：开启',
    statusCount: '2',
  },
  {
    id: 6,
    title: 'MP4封装',
    publishDate: '2024.7.24',
    status: '推送状态：开启',
    statusCount: '2',
  },
  {
    id: 7,
    title: 'MP4封装',
    publishDate: '2024.7.24',
    status: '推送状态：开启',
    statusCount: '2',
  },
  {
    id: 8,
    title: 'MP4封装',
    publishDate: '2024.7.24',
    status: '推送状态：开启',
    statusCount: '2',
  },
])

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

// 点击项目卡片跳转详情
function goToProjectDetail(project: any) {
  uni.navigateTo({
    url: `/pages-project/detail/index?id=${project.id}&name=${encodeURIComponent(project.title)}`
  })
}

// 新建项目按钮点击事件
function onCreateProject() {
  uni.navigateTo({
    url: `/pages-project/post/PostProject`
  })
}

onLoad(() => {
  console.log('项目大厅页面加载')
})
</script>

<template>
  <view class="min-h-screen flex flex-col bg-gray-50">
    <!-- 顶部标题栏 -->
    <view
      class="flex items-center justify-between px-4 py-3 bg-orange-400 fixed top-0 left-0 right-0 z-99"
      :style="{ paddingTop: `${safeAreaInsets?.top + 4}px` }"
    >
      <view class="text-white text-lg font-medium">我发布的项目</view>

      <!-- 右上角新建按钮 -->
      <!-- #ifdef MP-WEIXIN -->
      <view
        class="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-20"
        @tap="onCreateProject"
      >
        <view class="w-4 h-0.5 bg-white"></view>
        <view class="w-0.5 h-4 bg-white absolute"></view>
      </view>
      <!-- #endif -->
      <!-- #ifndef MP-WEIXIN -->
      <view
        class="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-1"
        @tap="onCreateProject"
      >
        <view class="w-4 h-0.5 bg-white"></view>
        <view class="w-0.5 h-4 bg-white absolute"></view>
      </view>
      <!-- #endif -->
    </view>

    <!-- 项目列表 -->
    <scroll-view
      scroll-y
      class="flex-1 px-4 py-4"
      :style="{ paddingTop: `${(safeAreaInsets?.top || 0) + 60}px` }"
    >
      <wd-cell-group
        v-for="project in projectList"
        :key="project.id"
        class="mb-3 rounded-lg overflow-hidden shadow-sm"
      >
        <wd-cell
          :title="project.title"
          :label="`发布日期：${project.publishDate}`"
          class="bg-white"
          clickable
          @click="goToProjectDetail(project)"
        >
          <template #icon>
            <view class="w-2 h-2 bg-red-500 rounded-full mr-3"></view>
          </template>
          <template #default>
            <view class="flex items-center justify-center w-6 h-6">
              <!-- 向右箭头图标 -->
              <view class="w-2 h-2 border-r-2 border-b-2 border-gray-400 transform rotate-[-45deg]"></view>
            </view>
          </template>
        </wd-cell>
      </wd-cell-group>
    </scroll-view>
  </view>
</template>