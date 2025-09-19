<script setup lang="ts">
import { ref } from 'vue'

// 页面配置 - 使用系统自带头部导航栏
definePage({
  navigationBarTitleText: '发布项目',
  // navigationStyle: 'default', // 使用系统默认头部
})

// 表单数据
const projectForm = ref({
  title: '',
  description: '',
  category: '',
  budget: '',
  deadline: '',
  contact: '',
  requirements: ''
})

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

// 重置表单
function resetForm() {
  projectForm.value = {
    title: '',
    description: '',
    category: '',
    budget: '',
    deadline: '',
    contact: '',
    requirements: ''
  }
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

          <!-- 预算 -->
          <view class="mb-4">
            <text class="block text-gray-600 text-sm mb-2">项目预算</text>
            <input
              v-model="projectForm.budget"
              class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
              placeholder="请输入项目预算（如：5000元）"
              type="number"
            />
          </view>

          <!-- 截止日期 -->
          <view class="mb-4">
            <text class="block text-gray-600 text-sm mb-2">截止日期</text>
            <picker
              mode="date"
              :value="projectForm.deadline"
              @change="(e) => projectForm.deadline = e.detail.value"
            >
              <view class="flex items-center justify-between px-3 py-2 border border-gray-200 rounded-lg">
                <text :class="projectForm.deadline ? 'text-gray-800' : 'text-gray-400'">
                  {{ projectForm.deadline || '请选择截止日期' }}
                </text>
                <text class="text-gray-400">📅</text>
              </view>
            </picker>
          </view>

          <!-- 特殊要求 -->
          <view class="mb-4">
            <text class="block text-gray-600 text-sm mb-2">特殊要求</text>
            <textarea
              v-model="projectForm.requirements"
              class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none h-16"
              placeholder="技能要求、交付标准等特殊要求（选填）"
              maxlength="300"
            />
            <text class="block text-right text-gray-400 text-xs mt-1">{{ projectForm.requirements.length }}/300</text>
          </view>
        </view>

        <!-- 联系方式 -->
        <view class="bg-white rounded-lg p-4 mb-6 shadow-sm">
          <text class="block text-gray-800 text-lg font-medium mb-4">联系方式</text>

          <view class="mb-4">
            <text class="block text-gray-600 text-sm mb-2">联系信息</text>
            <input
              v-model="projectForm.contact"
              class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
              placeholder="微信号、手机号或其他联系方式"
              maxlength="100"
            />
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

          <button
            @tap="resetForm"
            class="w-full bg-gray-200 text-gray-600 py-3 rounded-lg font-medium hover:bg-gray-300 active:bg-gray-400"
          >
            重置表单
          </button>
        </view>
      </view>
    </scroll-view>
  </view>
</template>