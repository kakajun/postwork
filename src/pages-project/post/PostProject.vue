<script setup lang="ts">
import { ref } from 'vue'
import TechSupplementDrawer from '@/pages-register/accept-oneParty/components/TechSupplementDrawer.vue'

definePage({
    style: {
  navigationBarTitleText: '项目发布',
    }
})

// 表单数据
const projectForm = ref({
  title: '',
  description: '',
  category: '',
  requirements: '',
  selectedTechs: [] as string[],
  attachments: [] as string[] // 附件图片路径数组
})

// 技术要求弹窗状态
const techDrawerVisible = ref(false)

// 图片上传相关状态
const uploadingImages = ref<string[]>([]) // 正在上传的图片临时路径

// 项目分类选项
const categories = [
  { value: 'development', label: '软件开发' },
  { value: 'design', label: 'UI设计' },
  { value: 'marketing', label: '市场推广' },
  { value: 'writing', label: '文案写作' },
  { value: 'other', label: '其他' }
]

// 表单提交
function submitForm() {
  if (!projectForm.value.title) {
    uni.showToast({
      title: '请输入项目标题',
      icon: 'none'
    })
    return
  }

  if (!projectForm.value.description) {
    uni.showToast({
      title: '请输入项目描述',
      icon: 'none'
    })
    return
  }

  // 模拟提交
  uni.showLoading({
    title: '发布中...'
  })

  setTimeout(() => {
    uni.hideLoading()
    uni.showToast({
      title: '项目发布成功',
      icon: 'success'
    })

    // 返回上一页
    setTimeout(() => {
      uni.navigateBack()
    }, 1500)
  }, 2000)
}

// 打开技术要求选择弹窗
function openTechDrawer() {
  techDrawerVisible.value = true
}

// 处理技术要求选择确认
function handleTechConfirm(selectedTechs: string[]) {
  projectForm.value.selectedTechs = selectedTechs
}

// 选择图片
function chooseImage() {
  uni.chooseImage({
    count: 9 - projectForm.value.attachments.length, // 最多9张
    sizeType: ['compressed'], // 压缩图
    sourceType: ['album', 'camera'], // 相册和相机
    success: (res) => {
      const tempFilePaths = res.tempFilePaths

      // 添加到上传队列
      uploadingImages.value.push(...tempFilePaths)

      // 模拟上传过程
      tempFilePaths.forEach((path, index) => {
        setTimeout(() => {
          // 移除上传队列
          const uploadIndex = uploadingImages.value.indexOf(path)
          if (uploadIndex > -1) {
            uploadingImages.value.splice(uploadIndex, 1)
          }

          // 添加到已上传列表（这里模拟上传成功）
          projectForm.value.attachments.push(path)
        }, 1000 * (index + 1))
      })
    }
  })
}

// 删除图片
function deleteImage(index: number) {
  uni.showModal({
    title: '提示',
    content: '确定要删除这张图片吗？',
    success: (res) => {
      if (res.confirm) {
        projectForm.value.attachments.splice(index, 1)
      }
    }
  })
}

// 预览图片
function previewImage(index: number) {
  uni.previewImage({
    urls: projectForm.value.attachments,
    current: projectForm.value.attachments[index]
  })
}
</script>

<template>
  <view class="min-h-screen bg-gray-50">
    <!-- 系统自带头部导航栏 - 由 pages.json 配置 -->

    <!-- 表单内容 -->
    <scroll-view scroll-y class="flex-1">
      <view class="px-4 py-4">
        <!-- 项目基本信息 -->
        <view class="bg-white rounded-lg p-4 mb-4 shadow-sm">
          <text class="block text-gray-800 text-lg font-medium mb-4">项目基本信息</text>

          <!-- 项目标题 -->
          <view class="mb-4">
            <text class="block text-gray-600 text-sm mb-2">项目标题 *</text>
            <input
              v-model="projectForm.title"
              class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
              placeholder="请输入项目标题"
              maxlength="50"
            />
          </view>

          <!-- 项目描述 -->
          <view class="mb-4">
            <text class="block text-gray-600 text-sm mb-2">项目描述 *</text>
            <textarea
              v-model="projectForm.description"
              class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none h-20"
              placeholder="请详细描述项目需求、目标等"
              maxlength="500"
            />
            <text class="block text-right text-gray-400 text-xs mt-1">{{ projectForm.description.length }}/500</text>
          </view>

          <!-- 项目分类 -->
          <view class="mb-4">
            <text class="block text-gray-600 text-sm mb-2">项目分类</text>
            <picker
              :value="projectForm.category"
              :range="categories"
              range-key="label"
              @change="(e) => projectForm.category = categories[e.detail.value].value"
            >
              <view class="flex items-center justify-between px-3 py-2 border border-gray-200 rounded-lg">
                <text :class="projectForm.category ? 'text-gray-800' : 'text-gray-400'">
                  {{ projectForm.category ? categories.find(c => c.value === projectForm.category)?.label : '请选择项目分类' }}
                </text>
                <text class="text-gray-400">▼</text>
              </view>
            </picker>
          </view>
        </view>

        <!-- 项目要求 -->
        <view class="bg-white rounded-lg p-4 mb-4 shadow-sm">
          <text class="block text-gray-800 text-lg font-medium mb-4">项目要求</text>

          <!-- 附件上传 -->
          <view class="mb-4">
            <text class="block text-gray-600 text-sm mb-2">项目附件</text>
            <view class="flex flex-wrap gap-2">
              <!-- 已上传的图片 -->
              <view
                v-for="(image, index) in projectForm.attachments"
                :key="index"
                class="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200"
              >
                <image
                  :src="image"
                  mode="aspectFill"
                  class="w-full h-full"
                  @tap="previewImage(index)"
                />
                <view
                  class="absolute top-0 right-0 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
                  @tap="deleteImage(index)"
                >
                  <text class="text-white text-xs">×</text>
                </view>
              </view>

              <!-- 上传中的图片 -->
              <view
                v-for="(image, index) in uploadingImages"
                :key="'uploading-' + index"
                class="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200 bg-gray-100 flex items-center justify-center"
              >
                <image
                  :src="image"
                  mode="aspectFill"
                  class="w-full h-full opacity-60"
                />
                <view class="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <text class="text-white text-xs">上传中...</text>
                </view>
              </view>

              <!-- 添加图片按钮 -->
              <view
                v-if="projectForm.attachments.length + uploadingImages.length < 9"
                class="w-20 h-20 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center bg-gray-50"
                @tap="chooseImage"
              >
                <text class="text-gray-400 text-2xl">+</text>
                <text class="text-gray-400 text-xs mt-1">{{ projectForm.attachments.length }}/9</text>
              </view>
            </view>
          </view>

          <!-- 技术要求 -->
          <view class="mb-4">
            <text class="block text-gray-600 text-sm mb-2">技术要求</text>
            <view
              class="flex items-center justify-between px-3 py-2 border border-gray-200 rounded-lg bg-white"
              @tap="openTechDrawer"
            >
              <text :class="projectForm.selectedTechs.length > 0 ? 'text-gray-800' : 'text-gray-400'">
                {{ projectForm.selectedTechs.length > 0 ? `已选择 ${projectForm.selectedTechs.length} 项技术` : '请选择技术要求' }}
              </text>
              <text class="text-gray-400">▼</text>
            </view>

            <!-- 已选择的技术标签展示 -->
            <view v-if="projectForm.selectedTechs.length > 0" class="mt-3">
              <view class="flex flex-wrap gap-2">
                <view
                  v-for="tech in projectForm.selectedTechs.slice(0, 6)"
                  :key="tech"
                  class="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full"
                >
                  {{ tech }}
                </view>
                <view
                  v-if="projectForm.selectedTechs.length > 6"
                  class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                >
                  +{{ projectForm.selectedTechs.length - 6 }}
                </view>
              </view>
            </view>
          </view>
        </view>

        <!-- 提交按钮 -->
        <view class="px-4 pb-8">
          <button
            @tap="submitForm"
            class="w-full bg-blue-500 text-white py-3 rounded-lg font-medium mb-3 hover:bg-blue-600 active:bg-blue-700"
          >
            发布项目
          </button>

        </view>
      </view>
    </scroll-view>

    <!-- 技术要求选择弹窗 -->
    <TechSupplementDrawer
      v-model:visible="techDrawerVisible"
      v-model:selectedTechs="projectForm.selectedTechs"
      @confirm="handleTechConfirm"
    />
  </view>
</template>