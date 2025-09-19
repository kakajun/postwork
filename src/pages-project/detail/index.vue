<script setup lang="ts">
import { ref, watch } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { safeAreaInsets } from '@/utils/systemInfo'

// 页面配置
definePage({
  style: {
    navigationBarTitleText: '项目详情',
  }
})

// 页面数据
const projectId = ref('')
const projectName = ref('')
const projectInfo = ref({
  name: 'MP4封装',
  publishDate: '2024.7.24',
  isRecommended: true,
  techRequirements: {
    os: 'linux',
    language: 'C/C++',
    direction: 'linux方向'
  },
  functionality: '使用libmp4v2或者ffmpeg实现音视频封装成mp4文件',
  attachments: {
    description: '建议尺寸900*400，最多6张，单个图片不超过20M',
    images: [
      { id: 1, url: '/static/images/demo1.jpg', type: 'image' },
      { id: 2, url: '/static/images/demo2.jpg', type: 'image' },
      { id: 3, url: '/static/images/demo3.jpg', type: 'video' }
    ]
  },
  developers: [
    { id: 1, name: '张三', joinDate: '2024.7.24', status: '详情资料', hasNotification: true },
    { id: 2, name: '张三', joinDate: '2024.7.24', status: '详情资料', hasNotification: false },
    { id: 3, name: '张三', joinDate: '2024.7.24', status: '详情资料', hasNotification: false }
  ]
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

// 查看开发人员详情
const viewDeveloperDetail = (developer: any) => {
  console.log('查看开发人员详情:', developer)
  uni.showToast({
    title: '开发人员详情功能开发中',
    icon: 'none'
  })
}

// 预览图片
const previewImage = (image: any, index: number) => {
  const urls = projectInfo.value.attachments.images
    .filter(img => img.type === 'image')
    .map(img => img.url)

  uni.previewImage({
    urls,
    current: index
  })
}

// 上传图片
const uploadImage = () => {
  // 这里调用你的上传工具方法
  // 例如：uploadUtil.uploadImage().then(url => { ... })
  uni.showToast({
    title: '上传功能开发中',
    icon: 'none'
  })
}
</script>

<template>
  <view class="min-h-screen bg-gray-50">

     <!-- 右侧菜单按钮 -->
      <view class="w-6 h-6 flex flex-col items-center justify-center">
        <view class="w-1 h-1 bg-white rounded-full mb-1"></view>
        <view class="w-1 h-1 bg-white rounded-full mb-1"></view>
        <view class="w-1 h-1 bg-white rounded-full"></view>
      </view>
    <!-- 内容区域 -->
    <scroll-view
      scroll-y
      class="flex-1 px-4 py-4"
      style="height: calc(100vh - 80px);"
    >
      <!-- 推送开启 -->
      <view class="bg-white rounded-lg p-4 mb-4 shadow-sm">
        <view class="flex items-center justify-between">
          <view class="text-base">推送开启</view>
          <wd-switch v-model="projectInfo.isRecommended" />
        </view>
      </view>

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
        <view class="text-sm text-gray-500 mb-3">{{ projectInfo.attachments.description }}</view>

        <view class="grid grid-cols-3 gap-3">
          <!-- 展示图片 -->
          <view
            v-for="(image, index) in projectInfo.attachments.images"
            :key="image.id"
            class="aspect-square bg-gray-100 rounded-lg overflow-hidden relative"
            @tap="previewImage(image, index)"
          >
            <image
              :src="image.url"
              class="w-full h-full object-cover"
              mode="aspectFill"
            />
          </view>
          <!-- 上传按钮 -->
          <view
            v-if="projectInfo.attachments.images.filter(img => img.type === 'image').length < 6"
            class="aspect-square bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-3xl cursor-pointer"
            @tap="uploadImage"
          >
            +
          </view>
        </view>
      </view>

      <!-- 开发人员 -->
      <view class="bg-white rounded-lg p-4 shadow-sm">
        <view class="text-base font-medium mb-3">开发人员</view>

        <wd-cell-group border>
          <wd-cell
            v-for="developer in projectInfo.developers"
            :key="developer.id"
            :title="developer.name"
            :label="`接单日期：${developer.joinDate}`"
            clickable
            @click="viewDeveloperDetail(developer)"
          >
            <template #default>
              <view class="flex items-center">
                <view
                  v-if="developer.hasNotification"
                  class="w-2 h-2 bg-red-500 rounded-full mr-2"
                ></view>
                <view class="text-sm text-gray-600 mr-2">{{ developer.status }}</view>
                <view class="w-2 h-2 border-r-2 border-b-2 border-gray-400 transform rotate-[-45deg]"></view>
              </view>
            </template>
          </wd-cell>
        </wd-cell-group>
      </view>
    </scroll-view>
  </view>
</template>