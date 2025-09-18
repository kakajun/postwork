<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/store'
import { useTokenStore } from '@/store/token'

definePage({
  style: {
    navigationBarTitleText: '登录管理',
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTextStyle: 'black'
  },
})

const userStore = useUserStore()
const tokenStore = useTokenStore()

// 当前绑定的手机号
const currentPhone = ref('15800000099')

// 切换手机号
function handleSwitchPhone() {
  uni.showToast({
    title: '切换手机功能开发中',
    icon: 'none'
  })
}

// 退出登录
function handleLogout() {
  uni.showModal({
    title: '提示',
    content: '确定要退出登录吗？',
    success: (res) => {
      if (res.confirm) {
        // 清空用户信息和token
        tokenStore.logout()
        uni.showToast({
          title: '退出登录成功',
          icon: 'success'
        })
        // 返回上一页或跳转到登录页
        setTimeout(() => {
          uni.navigateBack()
        }, 1500)
      }
    }
  })
}
</script>

<template>
  <view class="login-management-page">
    <!-- 手机号显示区域 -->
    <view class="phone-section">
      <view class="phone-icon">
        <view class="icon-container">
          <view class="phone-outline">
            <view class="phone-screen"></view>
          </view>
        </view>
      </view>
      
      <view class="phone-info">
        <text class="phone-label">已登录手机号</text>
        <text class="phone-number">{{ currentPhone }}</text>
      </view>
    </view>

    <!-- 操作按钮区域 -->
    <view class="action-section">
      <!-- 切换手机按钮 -->
      <button class="action-btn primary-btn" @click="handleSwitchPhone">
        切换手机
      </button>
      
      <!-- 退出登录按钮 -->
      <button class="action-btn secondary-btn" @click="handleLogout">
        退出登录
      </button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.login-management-page {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 60rpx 40rpx;
}

/* 手机号显示区域 */
.phone-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80rpx 40rpx;
  margin-bottom: 100rpx;
}

.phone-icon {
  margin-bottom: 40rpx;
}

.icon-container {
  width: 160rpx;
  height: 160rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f0f0;
  border-radius: 20rpx;
  border: 4rpx dashed #ccc;
}

.phone-outline {
  width: 60rpx;
  height: 100rpx;
  border: 4rpx solid #999;
  border-radius: 12rpx;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.phone-screen {
  width: 40rpx;
  height: 70rpx;
  background-color: #ddd;
  border-radius: 4rpx;
}

.phone-info {
  text-align: center;
}

.phone-label {
  display: block;
  font-size: 28rpx;
  color: #999;
  margin-bottom: 20rpx;
}

.phone-number {
  display: block;
  font-size: 36rpx;
  color: #333;
  font-weight: 500;
}

/* 操作按钮区域 */
.action-section {
  display: flex;
  flex-direction: column;
  gap: 30rpx;
}

.action-btn {
  width: 100%;
  height: 88rpx;
  border-radius: 44rpx;
  font-size: 32rpx;
  font-weight: 500;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.primary-btn {
  background: linear-gradient(135deg, #ff8a50 0%, #ff6b35 100%);
  color: white;
  box-shadow: 0 8rpx 20rpx rgba(255, 107, 53, 0.3);
}

.primary-btn:active {
  transform: translateY(2rpx);
  box-shadow: 0 4rpx 15rpx rgba(255, 107, 53, 0.3);
}

.secondary-btn {
  background: #f0f0f0;
  color: #666;
}

.secondary-btn:active {
  background: #e0e0e0;
}
</style>