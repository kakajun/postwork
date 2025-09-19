<script lang="ts" setup>
import type { IUploadSuccessInfo } from '@/api/types/login'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { LOGIN_PAGE } from '@/router/config'
import { useUserStore } from '@/store'
import { useTokenStore } from '@/store/token'
import { useUpload } from '@/utils/uploadFile'

definePage({
  style: {
    navigationBarTitleText: '我的',
  },
})

const userStore = useUserStore()
const tokenStore = useTokenStore()
// 使用storeToRefs解构userInfo
const { userInfo } = storeToRefs(userStore)

// 角色切换弹框状态
const showRoleModal = ref(false)
const currentRole = ref('项目方') // 当前角色

// 角色列表
const roles = ref([
  { id: 1, name: '项目方', desc: '发布项目，寻找合作伙伴' },
  { id: 2, name: '接单方', desc: '接收项目，提供服务' }
])

// #ifndef MP-WEIXIN
// 上传头像
const { run: uploadAvatar } = useUpload<IUploadSuccessInfo>(
  '/upload',
  {},
  {
    onSuccess: (res) => {
      console.log('h5头像上传成功', res)
      useUserStore().setUserAvatar(res.url)
    },
  },
)
// #endif


// #ifdef MP-WEIXIN

// 微信小程序下选择头像事件
function onChooseAvatar(e: any) {
  console.log('选择头像', e.detail)
  const { avatarUrl } = e.detail
  const { run } = useUpload<IUploadSuccessInfo>(
    '/upload',
    {},
    {
      onSuccess: (res) => {
        console.log('wx头像上传成功', res)
        useUserStore().setUserAvatar(res.url)
      },
    },
    avatarUrl,
  )
  run()
}
// #endif
// #ifdef MP-WEIXIN
// 微信小程序下设置用户名
function getUserInfo(e: any) {
  console.log(e.detail)
}
// #endif

// 退出登录
function handleLogout() {
  uni.showModal({
    title: '提示',
    content: '确定要退出登录吗？',
    success: (res) => {
      if (res.confirm) {
        // 清空用户信息
        useTokenStore().logout()
        // 执行退出登录逻辑
        uni.showToast({
          title: '退出登录成功',
          icon: 'success',
        })
        // #ifdef MP-WEIXIN
        // 微信小程序，去首页
        // uni.reLaunch({ url: '/pages/index/index' })
        // #endif
        // #ifndef MP-WEIXIN
        // 非微信小程序，去登录页
        // uni.navigateTo({ url: LOGIN_PAGE })
        // #endif
      }
    },
  })
}

// 角色切换相关函数
function handleRoleSwitch() {
  showRoleModal.value = true
}

function closeRoleModal() {
  showRoleModal.value = false
}

function selectRole(role: { id: number; name: string; desc: string }) {
  currentRole.value = role.name
  showRoleModal.value = false
  uni.showToast({
    title: `已切换为${role.name}`,
    icon: 'success'
  })
}

// 页面跳转函数
function navigateToMyData() {
  uni.navigateTo({
    url: '/pages-me/Mydata'
  })
}

function navigateToVipService() {
  uni.navigateTo({
    url: '/pages-me/VipService'
  })
}

function navigateToLoginManagement() {
  uni.navigateTo({
    url: '/pages-me/LoginManagement'
  })
}

function navigateToPrivacyPolicy() {
  uni.navigateTo({
    url: '/pages-me/PrivacyPolicy'
  })
}

function navigateToCollectChecklist() {
  uni.navigateTo({
    url: '/pages-me/CollectChecklist'
  })
}
</script>

<template>
  <view class="profile-container">
    <!-- 顶部用户信息区域 -->
    <view class="header-section">
      <view class="user-info">
        <!-- #ifdef MP-WEIXIN -->
        <button class="avatar-button" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
          <image :src="userInfo.avatar" mode="scaleToFill" class="avatar-image" />
        </button>
        <!-- #endif -->
        <!-- #ifndef MP-WEIXIN -->
        <view class="avatar-wrapper" @click="uploadAvatar">
          <image :src="userInfo.avatar" mode="scaleToFill" class="avatar-image" />
        </view>
        <!-- #endif -->
        <view class="user-details">
          <view class="phone-number">15800000098</view>
          <view class="user-id">ID:123456</view>
        </view>
        <view class="edit-icon">
          <text class="iconfont icon-edit">✏️</text>
        </view>
      </view>
    </view>

    <!-- 功能菜单区域 -->
    <view class="menu-section">
      <!-- 开启接单 -->
      <view class="menu-item">
        <view class="menu-icon">
          <text class="icon">📋</text>
        </view>
        <view class="menu-text">开启接单</view>
        <view class="menu-switch">
          <switch checked color="#ff6b35" />
        </view>
      </view>

      <!-- 我的资料 -->
      <view class="menu-item" @click="navigateToMyData">
        <view class="menu-icon">
          <text class="icon">📄</text>
        </view>
        <view class="menu-text">我的资料</view>
        <view class="menu-arrow">
          <text class="arrow">></text>
        </view>
      </view>

      <!-- 终生VIP服务 -->
      <view class="menu-item" @click="navigateToVipService">
        <view class="menu-icon">
          <text class="icon">👑</text>
        </view>
        <view class="menu-text">终生VIP服务</view>
        <view class="menu-arrow">
          <text class="arrow">></text>
        </view>
      </view>

      <!-- 角色切换 -->
      <view class="menu-item" @click="handleRoleSwitch">
        <view class="menu-icon">
          <text class="icon">🔄</text>
        </view>
        <view class="menu-text">角色切换</view>
        <view class="menu-arrow">
          <text>{{ currentRole }}</text>
          <text style="margin-left: 10rpx;">></text>
        </view>
      </view>

      <!-- 账号登录管理 -->
      <view class="menu-item" @click="navigateToLoginManagement">
        <view class="menu-icon">
          <text class="icon">🔐</text>
        </view>
        <view class="menu-text">账号登录管理</view>
        <view class="menu-arrow">
          <text class="arrow">></text>
        </view>
      </view>

      <!-- privacyPolicy -->
      <view class="menu-item" @click="navigateToPrivacyPolicy">
        <view class="menu-icon">
          <text class="icon">🛡️</text>
        </view>
        <view class="menu-text">隐私政策</view>
        <view class="menu-arrow">
          <text class="arrow">></text>
        </view>
      </view>

      <!-- 个人信息收集清单 -->
      <view class="menu-item" @click="navigateToCollectChecklist">
        <view class="menu-icon">
          <text class="icon">📊</text>
        </view>
        <view class="menu-text">个人信息收集清单</view>
        <view class="menu-arrow">
          <text class="arrow">></text>
        </view>
      </view>

    </view>


  </view>

  <!-- 角色切换弹框 -->
  <view v-if="showRoleModal" class="modal-overlay" @click="closeRoleModal">
    <view class="modal-content" @click.stop>
      <view class="modal-header">
        <text class="modal-title">切换角色</text>
        <text class="modal-subtitle">是否切换为项目方</text>
      </view>

      <view class="modal-actions">
        <button class="modal-btn cancel-btn" @click="closeRoleModal">取消</button>
        <button class="modal-btn confirm-btn" @click="selectRole(roles[0])">确认</button>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
/* 基础样式 */
.profile-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif;
}

/* 顶部用户信息区域 */
.header-section {
  background: linear-gradient(135deg, #ff8a50 0%, #ff6b35 100%);
  padding: 60rpx 40rpx 40rpx;
  position: relative;
}

.user-info {
  display: flex;
  align-items: center;
  color: white;
}

.avatar-wrapper,
.avatar-button {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 30rpx;
  border: 4rpx solid rgba(255, 255, 255, 0.3);
}

.avatar-button {
  padding: 0;
  background: none;
  border: 4rpx solid rgba(255, 255, 255, 0.3);
}

.avatar-image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.user-details {
  flex: 1;
}

.phone-number {
  font-size: 36rpx;
  font-weight: 600;
  margin-bottom: 8rpx;
  color: white;
}

.user-id {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.8);
}

.edit-icon {
  font-size: 32rpx;
  color: white;
}

/* 功能菜单区域 */
.menu-section {
  margin: 30rpx 30rpx 0;
  background: white;
  border-radius: 20rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 30rpx 40rpx;
  border-bottom: 1rpx solid #f0f0f0;
  transition: background-color 0.2s;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-item:active {
  background-color: #f8f8f8;
}

.menu-icon {
  width: 60rpx;
  height: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 30rpx;
}

.icon {
  font-size: 36rpx;
}

.menu-text {
  flex: 1;
  font-size: 32rpx;
  color: #333;
}

.menu-arrow {
  color: #ccc;
  font-size: 28rpx;
}

.menu-switch {
  transform: scale(0.8);
}

/* 登录按钮区域 */
.login-section {
  margin: 60rpx 30rpx 30rpx;
}

.login-btn {
  width: 100%;
  height: 88rpx;
  background: linear-gradient(135deg, #ff8a50 0%, #ff6b35 100%);
  border: none;
  border-radius: 44rpx;
  color: white;
  font-size: 32rpx;
  font-weight: 600;
}

/* 角色切换弹框样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-content {
  width: 560rpx;
  background: white;
  border-radius: 20rpx;
  padding: 60rpx 40rpx 40rpx;
  margin: 0 40rpx;
}

.modal-header {
  text-align: center;
  margin-bottom: 60rpx;
}

.modal-title {
  font-size: 36rpx;
  font-weight: 600;
  color: #333;
  display: block;
  margin-bottom: 20rpx;
}

.modal-subtitle {
  font-size: 28rpx;
  color: #666;
  display: block;
}

.modal-actions {
  display: flex;
  gap: 20rpx;
}

.modal-btn {
  flex: 1;
  height: 80rpx;
  border-radius: 40rpx;
  font-size: 32rpx;
  border: none;
}

.cancel-btn {
  background: #f5f5f5;
  color: #666;
}

.confirm-btn {
  background: linear-gradient(135deg, #ff8a50 0%, #ff6b35 100%);
  color: white;
}
</style>
