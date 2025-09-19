<script setup lang="ts">
import { ref, watch } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

// 页面配置
definePage({
  style: {
    navigationBarTitleText: '接收项目详情',
  }
})

// 页面数据
const projectId = ref('')
const projectName = ref('')
const projectInfo = ref({
  name: 'MP4封装',
  publishDate: '2024.7.24',
  techRequirements: {
    os: 'linux',
    language: 'C/C++',
    direction: 'linux方向'
  },
  functionality: '使用libmp4v2或者ffmpeg实现音视频封装成mp4文件',
  attachments: {
    images: [
      { id: 1, url: '/static/images/demo1.jpg', type: 'image' },
      { id: 2, url: '/static/images/demo2.jpg', type: 'image' }
    ]
  }
})

// 页面加载
onLoad((options: any) => {
  if (options.id) {
    projectId.value = options.id
  }
  if (options.name) {
    projectName.value = decodeURIComponent(options.name)
    projectInfo.value.name = projectName.value
    uni.setNavigationBarTitle({ title: projectName.value }) // 动态设置标题
  }
})

// 监听项目名称变化（如有异步赋值场景）
watch(() => projectInfo.value.name, (newName) => {
  if (newName) {
    uni.setNavigationBarTitle({ title: newName })
  }
})

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

// 接收项目
const receiveProject = () => {
  uni.showModal({
    title: '提示',
    content: '确定要接收这个项目吗？',
    success: (res) => {
      if (res.confirm) {
        uni.showToast({
          title: '项目接收成功',
          icon: 'success'
        })
      }
    }
  })
}



// 预览附件
const previewAttachment = (image: any, index: number) => {
  const urls = projectInfo.value.attachments.images
    .filter(img => img.type === 'image')
    .map(img => img.url)

  uni.previewImage({
    urls,
    current: index
  })
}
</script>

<template>
  <view class="min-h-screen bg-gray-50">
    <!-- 内容区域 -->
    <scroll-view scroll-y class="flex-1 px-4 py-4">
      <!-- 技术要求 -->
      <view class="bg-white rounded-lg p-4 mb-4 shadow-sm">
        <view class="text-base font-medium mb-3">技术要求：</view>
        <view class="flex flex-wrap gap-4">
          <view class="flex items-center">
            <view class="text-gray-600 mr-2">操作系统：</view>
            <view>{{ projectInfo.techRequirements.os }}</view>
          </view>
          <view class="flex items-center">
            <view class="text-gray-600 mr-2">开发语言：</view>
            <view>{{ projectInfo.techRequirements.language }}</view>
          </view>
        </view>
        <view class="flex items-center mt-2">
          <view class="text-gray-600 mr-2">开发方向：</view>
          <view>{{ projectInfo.techRequirements.direction }}</view>
        </view>
      </view>

      <!-- 功能需求 -->
      <view class="bg-white rounded-lg p-4 mb-4 shadow-sm">
        <view class="text-base font-medium mb-3">功能需求：</view>
        <view class="text-gray-700 leading-relaxed">
          {{ projectInfo.functionality }}
        </view>
      </view>

      <!-- 附件 -->
      <view class="bg-white rounded-lg p-4 mb-4 shadow-sm">
        <view class="text-base font-medium mb-3">附件：</view>
        <view class="grid grid-cols-3 gap-3">
          <!-- 展示图片 -->
          <view
            v-for="(image, index) in projectInfo.attachments.images"
            :key="image.id"
            class="aspect-square bg-gray-100 rounded-lg overflow-hidden relative"
            @tap="previewAttachment(image, index)"
          >
            <image
              :src="image.url"
              class="w-full h-full object-cover"
              mode="aspectFill"
            />
          </view>
        </view>
      </view>

      <!-- 接收项目按钮 -->
      <view class="px-4 pb-8">
        <button
          @tap="receiveProject"
          class="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 active:bg-blue-700"
        >
          接收项目
        </button>
      </view>
    </scroll-view>
  </view>
</template>