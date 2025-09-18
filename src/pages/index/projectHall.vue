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

// 当前选中的底部导航索引
const currentTabIndex = ref(0)

// 底部导航数据
const tabBarList = [
  { text: '项目大厅', icon: 'home' },
  { text: '发布', icon: 'add' },
  { text: '我的', icon: 'user' },
]

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

// 项目点击事件
function onProjectClick(project: any) {
  uni.showToast({
    title: `点击了项目：${project.title}`,
    icon: 'none',
  })
}

// 底部导航点击事件
function onTabClick(index: number) {
  currentTabIndex.value = index
  if (index === 1) {
    // 发布按钮
    uni.showToast({
      title: '发布功能开发中',
      icon: 'none',
    })
  } else if (index === 2) {
    // 我的按钮
    uni.showToast({
      title: '我的功能开发中',
      icon: 'none',
    })
  }
}

onLoad(() => {
  console.log('项目大厅页面加载')
})
</script>

<template>
  <view class="min-h-screen flex flex-col bg-gray-50">
    <!-- 顶部标题栏 -->
    <view 
      class="flex items-center justify-between px-4 py-3 bg-orange-400"
      :style="{ paddingTop: `${safeAreaInsets?.top + 12}px` }"
    >
      <view class="text-white text-lg font-medium">我发布的项目</view>
      <view class="w-6 h-6 flex items-center justify-center">
        <view class="w-1 h-1 bg-white rounded-full mb-1"></view>
        <view class="w-1 h-1 bg-white rounded-full mb-1"></view>
        <view class="w-1 h-1 bg-white rounded-full"></view>
      </view>
    </view>

    <!-- 项目列表 -->
    <scroll-view 
      scroll-y 
      class="flex-1 px-4 py-4"
      style="height: calc(100vh - 120px);"
    >
      <wd-cell-group 
        v-for="project in projectList" 
        :key="project.id"
        class="mb-3 rounded-lg overflow-hidden shadow-sm"
        @click="onProjectClick(project)"
      >
        <wd-cell 
          :title="project.title"
          :label="`发布日期：${project.publishDate}`"
          class="bg-white"
        >
          <template #icon>
            <view class="w-2 h-2 bg-red-500 rounded-full mr-3"></view>
          </template>
          <template #default>
            <view class="flex flex-col items-end">
              <view class="text-sm text-gray-600 mb-1">
                {{ project.status }}
              </view>
              <view class="text-sm text-gray-600">
                {{ project.statusCount }}
              </view>
            </view>
          </template>
        </wd-cell>
      </wd-cell-group>
    </scroll-view>

    <!-- 底部导航栏 -->
    <wd-tabbar 
      v-model="currentTabIndex" 
      fixed
      placeholder
      inactive-color="#999999"
      active-color="#FF6F00"
    >
      <wd-tabbar-item 
        v-for="(tab, index) in tabBarList" 
        :key="index"
        :title="tab.text"
        @click="onTabClick(index)"
      >
        <template #icon>
          <view class="w-6 h-6 flex items-center justify-center">
            <view 
              v-if="tab.icon === 'home'"
              class="w-5 h-5 border-2 border-current rounded"
            ></view>
            <view 
              v-else-if="tab.icon === 'add'"
              class="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center"
            >
              <view class="w-4 h-0.5 bg-white"></view>
              <view class="w-0.5 h-4 bg-white absolute"></view>
            </view>
            <view 
              v-else-if="tab.icon === 'user'"
              class="w-5 h-5 border-2 border-current rounded-full"
            ></view>
          </view>
        </template>
      </wd-tabbar-item>
    </wd-tabbar>
  </view>
</template>
