<script setup lang="ts">
import { useUserStore } from '@/store/user'
import { ref } from 'vue'

const userStore = useUserStore()
const currentRole = ref(userStore.userInfo.role || '未设置')

const switchRole = (role: 'post' | 'receive') => {
  console.log('Switching role to:', role)
  userStore.setUserInfo({
    ...userStore.userInfo,
    role
  })
  currentRole.value = role
  uni.showToast({
    title: `已切换为${role === 'post' ? '项目发布者' : '项目接收者'}`,
    icon: 'success'
  })
}
</script>

<template>
  <view class="min-h-screen bg-gray-50 p-4">
    <view class="bg-white rounded-lg p-6 mb-4">
      <view class="text-lg font-medium mb-4">当前角色：{{ currentRole }}</view>
      
      <view class="flex gap-4">
        <button 
          @tap="switchRole('post')"
          class="flex-1 bg-blue-500 text-white py-3 rounded-lg"
          :class="{ 'bg-blue-700': currentRole === 'post' }"
        >
          项目发布者
        </button>
        
        <button 
          @tap="switchRole('receive')"
          class="flex-1 bg-green-500 text-white py-3 rounded-lg"
          :class="{ 'bg-green-700': currentRole === 'receive' }"
        >
          项目接收者
        </button>
      </view>
    </view>
    
    <view class="bg-white rounded-lg p-6">
      <view class="text-sm text-gray-600 mb-2">提示：</view>
      <view class="text-sm text-gray-600">• 项目发布者：显示"项目大厅"和"我的"</view>
      <view class="text-sm text-gray-600">• 项目接收者：显示"接收项目"和"我的"</view>
    </view>
  </view>
</template>